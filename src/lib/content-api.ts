/**
 * Typed fetch wrappers for the Superbrain API (superbrain-v2 Cloudflare Worker).
 *
 * Superbrain is a blog API backed by a KV store. Endpoints:
 *   GET /api/posts                  — paginated post list
 *   GET /api/posts?category=X       — filter by category
 *   GET /api/posts?featured=true    — featured posts only
 *   GET /api/posts?top=true         — top posts only
 *   GET /api/posts/:slug            — single post + SEO meta
 *   GET /api/tags                   — all tags/categories
 *   GET /api/status                 — sync status + post count
 *
 * All functions return null on failure so callers fall through to D1 / filesystem.
 */

import type { BlogPost, AuthorInfo, ContentItem } from "./content";

// ─── Superbrain wire types ────────────────────────────────────────────────────

interface SuperbrainPost {
    slug: string;
    title: string;
    excerpt?: string;
    content?: string;
    datePublished?: string;
    lastEditedTime?: string;
    coverImage?: string;
    writtenBy?: string[];
    category?: string[];
    featured?: boolean;
    topPost?: boolean;
}

interface SuperbrainPostsResponse {
    posts: SuperbrainPost[];
    total: number;
    page: number;
    totalPages: number;
}

interface SuperbrainSinglePostResponse {
    post: SuperbrainPost;
    seo: unknown;
}

interface SuperbrainTagsResponse {
    tags: string[];
}

// ─── Fetcher abstraction ──────────────────────────────────────────────────────

export type SuperbrainEnv = {
    SUPERBRAIN?: Fetcher;
    SUPERBRAIN_URL?: string;
};

/**
 * Issue a GET request through either the service binding (SUPERBRAIN Fetcher)
 * or a plain fetch against SUPERBRAIN_URL. Returns null if neither is set.
 */
async function superbrainFetch(
    path: string,
    env: SuperbrainEnv,
): Promise<Response | null> {
    if (env.SUPERBRAIN) {
        return env.SUPERBRAIN.fetch(`https://superbrain-v2.internal${path}`);
    }
    if (env.SUPERBRAIN_URL) {
        return fetch(`${env.SUPERBRAIN_URL}${path}`);
    }
    return null;
}

// ─── Conversion helpers ───────────────────────────────────────────────────────

function computeReadingTime(text: string): string {
    const words = text.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

function superbrainPostToBlogPost(post: SuperbrainPost): BlogPost {
    const source = post.content ?? post.excerpt ?? "";
    return {
        slug: post.slug,
        title: post.title,
        description: post.excerpt ?? "",
        date: post.datePublished ?? "",
        authors: post.writtenBy ?? [],
        tags: post.category ?? [],
        image: post.coverImage ?? undefined,
        readingTime: computeReadingTime(source),
        source,
    };
}

// ─── Public API functions ─────────────────────────────────────────────────────

/**
 * Fetch all blog posts from Superbrain.
 * Returns null on any error so the caller falls back to D1 / filesystem.
 */
export async function getBlogPostsApi(
    env: SuperbrainEnv,
): Promise<BlogPost[] | null> {
    try {
        const response = await superbrainFetch("/api/posts?limit=50", env);
        if (!response || !response.ok) return null;

        const data = (await response.json()) as SuperbrainPostsResponse;
        return data.posts
            .map(superbrainPostToBlogPost)
            .filter((p) => Boolean(p.title));
    } catch (err) {
        console.error("[content-api] getBlogPostsApi failed:", err);
        return null;
    }
}

/**
 * Fetch a single blog post by slug from Superbrain.
 * Returns null on any error so the caller falls back to D1 / filesystem.
 */
export async function getBlogPostBySlugApi(
    slug: string,
    env: SuperbrainEnv,
): Promise<ContentItem | null> {
    try {
        const response = await superbrainFetch(
            `/api/posts/${encodeURIComponent(slug)}`,
            env,
        );
        if (!response) return null;
        if (response.status === 404) return null;
        if (!response.ok) return null;

        const data = (await response.json()) as SuperbrainSinglePostResponse;
        const { post } = data;
        return {
            frontmatter: {
                slug: post.slug,
                title: post.title,
                description: post.excerpt ?? "",
                date: post.datePublished ?? "",
                authors: post.writtenBy ?? [],
                tags: post.category ?? [],
                image: post.coverImage ?? undefined,
            },
            source: post.content ?? post.excerpt ?? "",
        };
    } catch (err) {
        console.error("[content-api] getBlogPostBySlugApi failed:", err);
        return null;
    }
}

/**
 * Fetch all blog tags from Superbrain.
 * Returns null on any error so the caller falls back to D1 / filesystem.
 */
export async function getBlogTagsApi(
    env: SuperbrainEnv,
): Promise<string[] | null> {
    try {
        const response = await superbrainFetch("/api/tags", env);
        if (!response || !response.ok) return null;

        const data = (await response.json()) as SuperbrainTagsResponse;
        return data.tags;
    } catch (err) {
        console.error("[content-api] getBlogTagsApi failed:", err);
        return null;
    }
}

/**
 * Fetch adjacent blog posts (prev/next) from Superbrain.
 * Returns null on any error so the caller falls back to D1 / filesystem.
 */
export async function getAdjacentBlogPostsApi(
    slug: string,
    env: SuperbrainEnv,
): Promise<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
} | null> {
    try {
        const response = await superbrainFetch("/api/posts?limit=50", env);
        if (!response || !response.ok) return null;

        const data = (await response.json()) as SuperbrainPostsResponse;
        const posts = data.posts.filter((p) => Boolean(p.title));
        const idx = posts.findIndex((p) => p.slug === slug);
        if (idx === -1) return null;

        return {
            prev:
                idx > 0
                    ? { slug: posts[idx - 1].slug, title: posts[idx - 1].title }
                    : null,
            next:
                idx < posts.length - 1
                    ? { slug: posts[idx + 1].slug, title: posts[idx + 1].title }
                    : null,
        };
    } catch (err) {
        console.error("[content-api] getAdjacentBlogPostsApi failed:", err);
        return null;
    }
}

/**
 * Fetch author info from Superbrain posts (synthesised from post metadata).
 * Returns null on any error so the caller falls back to D1 / filesystem.
 */
export async function getAuthorsApi(
    env: SuperbrainEnv,
): Promise<Record<string, AuthorInfo> | null> {
    try {
        const response = await superbrainFetch("/api/posts?limit=50", env);
        if (!response || !response.ok) return null;

        const data = (await response.json()) as SuperbrainPostsResponse;
        const result: Record<string, AuthorInfo> = {};
        for (const post of data.posts) {
            for (const name of post.writtenBy ?? []) {
                if (!result[name]) {
                    result[name] = { name };
                }
            }
        }
        return result;
    } catch (err) {
        console.error("[content-api] getAuthorsApi failed:", err);
        return null;
    }
}
