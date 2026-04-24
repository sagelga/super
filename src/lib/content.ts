import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { preprocessAdmonitions } from "./remark-admonitions";
import {
    preprocessResolveImages,
    preprocessBlogImages,
} from "./remark-resolve-images";

const CONTENT_ROOT = path.join(process.cwd(), "content");

export interface BlogFrontmatter {
    slug: string;
    title: string;
    description: string;
    date: string;
    // Notion's last_edited_time — only populated from Superbrain.
    lastEditedTime?: string;
    // When SuperEye synced this post into Superbrain's KV cache.
    syncedAt?: string;
    authors: string[];
    tags: string[];
    image?: string;
}

export interface BlogPost extends BlogFrontmatter {
    readingTime: string;
    source: string;
}

export interface DocFrontmatter {
    title: string;
    sidebar_label?: string;
    slug?: string;
    description?: string;
}

export interface LearnFrontmatter {
    title?: string;
}

export interface AuthorInfo {
    name: string;
    title?: string;
    url?: string;
    image_url?: string;
}

export interface ContentItem {
    frontmatter: Record<string, unknown>;
    source: string;
}

// Module-level promise cache: ensures only ONE getCloudflareContext() call runs
// per Node.js module instance, preventing concurrent SQLite opens from hammering
// the local wrangler D1 emulator and causing SQLITE_BUSY_RECOVERY crashes.
let _cfContextPromise: Promise<{
    CONTENT_DB?: D1Database;
    SUPERBRAIN?: unknown;
    SUPERBRAIN_URL?: string;
} | null> | null = null;

async function getCfEnv(): Promise<{
    CONTENT_DB?: D1Database;
    SUPERBRAIN?: unknown;
    SUPERBRAIN_URL?: string;
} | null> {
    if (process.env.NEXT_PHASE === "phase-production-build") return null;
    if (!_cfContextPromise) {
        _cfContextPromise = (async () => {
            try {
                const { getCloudflareContext } =
                    await import("@opennextjs/cloudflare");
                const ctx = await getCloudflareContext({ async: true });
                return ctx.env as {
                    CONTENT_DB?: D1Database;
                    SUPERBRAIN?: unknown;
                    SUPERBRAIN_URL?: string;
                };
            } catch {
                return null;
            }
        })();
    }
    return _cfContextPromise;
}

// Helper to get D1 database from Cloudflare context.
async function getContentDb(): Promise<D1Database | null> {
    const env = await getCfEnv();
    return env?.CONTENT_DB ?? null;
}

// Helper to get the Superbrain API env (service binding or URL var).
// Returns null during Next.js build or when neither binding nor URL is set.
async function getSuperbrainEnv(): Promise<
    import("./content-api").SuperbrainEnv | null
> {
    const env = await getCfEnv();
    if (!env?.SUPERBRAIN && !env?.SUPERBRAIN_URL) return null;
    return {
        SUPERBRAIN:
            env.SUPERBRAIN as import("./content-api").SuperbrainEnv["SUPERBRAIN"],
        SUPERBRAIN_URL: env.SUPERBRAIN_URL,
    };
}

// Recursively find all .md and .mdx files under a directory, return relative paths
function getAllMarkdownFilesFs(dir: string, base: string = dir): string[][] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const results: string[][] = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...getAllMarkdownFilesFs(fullPath, base));
        } else if (
            entry.isFile() &&
            (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
        ) {
            const relativePath = path.relative(base, fullPath);
            // Convert path to slug segments, strip .md/.mdx extension
            const segments = relativePath
                .replace(/\.(md|mdx)$/, "")
                .split(path.sep);
            results.push(segments);
        }
    }
    return results;
}

// FS-based implementations (private)

function getAllSlugsFs(section: "blog" | "docs" | "learn"): string[][] {
    const sectionPath = path.join(CONTENT_ROOT, section);
    if (!fs.existsSync(sectionPath)) return [];
    return getAllMarkdownFilesFs(sectionPath);
}

function getContentBySlugFs(
    section: string,
    slugSegments: string[],
): ContentItem | null {
    const sectionPath = path.join(CONTENT_ROOT, section);

    // Try exact path with .md and .mdx
    for (const ext of [".mdx", ".md"]) {
        const filePath = path.join(sectionPath, ...slugSegments) + ext;
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(raw);
            let source = preprocessAdmonitions(content);
            if (section === "docs" || section === "learn") {
                source = preprocessResolveImages(source, {
                    section: section as "docs" | "learn",
                    slugPath: slugSegments,
                });
            } else if (section === "blog") {
                source = preprocessBlogImages(source);
            }
            return { frontmatter: data, source };
        }
    }

    // Try with README.md/README.mdx appended
    for (const readme of [
        "README.md",
        "README.mdx",
        "readme.md",
        "readme.mdx",
    ]) {
        const filePath = path.join(sectionPath, ...slugSegments, readme);
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, "utf-8");
            const { data, content } = matter(raw);
            let source = preprocessAdmonitions(content);
            if (section === "docs" || section === "learn") {
                source = preprocessResolveImages(source, {
                    section: section as "docs" | "learn",
                    slugPath: slugSegments,
                });
            } else if (section === "blog") {
                source = preprocessBlogImages(source);
            }
            return { frontmatter: data, source };
        }
    }

    return null;
}

function getBlogPostsFs(): BlogPost[] {
    const sectionPath = path.join(CONTENT_ROOT, "blog");
    if (!fs.existsSync(sectionPath)) return [];

    const files = fs
        .readdirSync(sectionPath)
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));

    return files
        .map((file) => {
            const raw = fs.readFileSync(path.join(sectionPath, file), "utf-8");
            const { data, content } = matter(raw);
            const slug =
                (data.slug as string) || file.replace(/\.(md|mdx)$/, "");
            const wordCount = content.split(/\s+/).length;
            const readingMinutes = Math.max(1, Math.round(wordCount / 200));
            return {
                slug,
                title: (data.title as string) || "",
                description: (data.description as string) || "",
                date: (data.date as string) || "",
                authors: (data.authors as string[]) || [],
                tags: (data.tags as string[]) || [],
                image: data.image as string | undefined,
                readingTime: `${readingMinutes} min read`,
                source: content,
            } satisfies BlogPost;
        })
        .filter((p) => p.title)
        .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
}

function getDocProjectsFs(): {
    slug: string;
    title: string;
    description: string;
    pageCount: number;
}[] {
    const sectionPath = path.join(CONTENT_ROOT, "docs");
    if (!fs.existsSync(sectionPath)) return [];

    return fs
        .readdirSync(sectionPath, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => {
            const projectPath = path.join(sectionPath, d.name);
            const readmePaths = ["README.md", "README.mdx", "readme.md"];
            let title = d.name;
            let description = "";
            for (const readme of readmePaths) {
                const fp = path.join(projectPath, readme);
                if (fs.existsSync(fp)) {
                    const { data } = matter(fs.readFileSync(fp, "utf-8"));
                    title = (data.title as string) || d.name;
                    description = (data.description as string) || "";
                    break;
                }
            }
            const allFiles = getAllMarkdownFilesFs(projectPath);
            return {
                slug: d.name,
                title,
                description,
                pageCount: allFiles.length,
            };
        })
        .sort((a, b) => a.title.localeCompare(b.title));
}

function getLearnTopicsFs(): {
    slug: string;
    title: string;
    pageCount: number;
}[] {
    const sectionPath = path.join(CONTENT_ROOT, "learn");
    if (!fs.existsSync(sectionPath)) return [];

    return fs
        .readdirSync(sectionPath, { withFileTypes: true })
        .filter((d) => d.isDirectory())
        .map((d) => {
            const topicPath = path.join(sectionPath, d.name);
            const readmePaths = ["README.md", "README.mdx", "readme.md"];
            let title = d.name.charAt(0).toUpperCase() + d.name.slice(1);
            for (const readme of readmePaths) {
                const fp = path.join(topicPath, readme);
                if (fs.existsSync(fp)) {
                    const { data } = matter(fs.readFileSync(fp, "utf-8"));
                    title = (data.title as string) || title;
                    break;
                }
            }
            const allFiles = getAllMarkdownFilesFs(topicPath);
            return { slug: d.name, title, pageCount: allFiles.length };
        })
        .sort((a, b) => a.slug.localeCompare(b.slug));
}

function getAdjacentBlogPostsFs(slug: string): {
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
} {
    const posts = getBlogPostsFs();
    const idx = posts.findIndex((p) => p.slug === slug);
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
}

function getAuthorsFs(): Record<string, AuthorInfo> {
    const authorsPath = path.join(CONTENT_ROOT, "blog", "authors.yml");
    if (!fs.existsSync(authorsPath)) return {};

    // Simple YAML parser for authors.yml
    const raw = fs.readFileSync(authorsPath, "utf-8");
    const result: Record<string, AuthorInfo> = {};

    let currentKey = "";
    for (const line of raw.split("\n")) {
        const keyMatch = line.match(/^(\w+):$/);
        if (keyMatch) {
            currentKey = keyMatch[1];
            result[currentKey] = { name: currentKey };
            continue;
        }
        if (currentKey) {
            const fieldMatch = line.match(/^\s+(\w+):\s+(.+)$/);
            if (fieldMatch) {
                const [, field, value] = fieldMatch;
                const cleaned = value.replace(/^['"]|['"]$/g, "").trim();
                if (field === "name") result[currentKey].name = cleaned;
                if (field === "title") result[currentKey].title = cleaned;
                if (field === "url") result[currentKey].url = cleaned;
                if (field === "image_url")
                    result[currentKey].image_url = cleaned;
            }
        }
    }
    return result;
}

// Public async APIs — priority: D1 → Superbrain API → filesystem
//
// D1 is the primary store: the supereye-v2 worker mirrors Notion into
// CONTENT_DB on its 15-min cron. Superbrain's KV-backed API remains a warm
// fallback if D1 is empty or unreachable. Filesystem is the last resort for
// local dev / disaster recovery.

export async function getAllSlugs(
    section: "blog" | "docs" | "learn",
): Promise<string[][]> {
    const db = await getContentDb();
    if (db) {
        const { getAllSlugsD1 } = await import("./content-d1");
        const slugs = await getAllSlugsD1(db, section);
        if (slugs.length > 0) return slugs;
    }
    // Superbrain only covers blog posts; docs/learn go to filesystem directly.
    if (section === "blog") {
        const superbrainEnv = await getSuperbrainEnv();
        if (superbrainEnv) {
            const { getBlogPostsApi } = await import("./content-api");
            const posts = await getBlogPostsApi(superbrainEnv);
            if (posts && posts.length > 0) return posts.map((p) => [p.slug]);
        }
    }
    return getAllSlugsFs(section);
}

export async function getContentBySlug(
    section: string,
    slugSegments: string[],
): Promise<ContentItem | null> {
    const db = await getContentDb();
    if (db) {
        const { getContentBySlugD1 } = await import("./content-d1");
        const item = await getContentBySlugD1(db, section, slugSegments);
        if (item) return item;
    }
    if (section === "blog") {
        const superbrainEnv = await getSuperbrainEnv();
        if (superbrainEnv) {
            const { getBlogPostBySlugApi } = await import("./content-api");
            const item = await getBlogPostBySlugApi(
                slugSegments.join("/"),
                superbrainEnv,
            );
            if (item) return item;
        }
    }
    if (section === "learn") {
        const superbrainEnv = await getSuperbrainEnv();
        if (superbrainEnv) {
            const { getLearnTopicApi } = await import("./content-api");
            const topicSlug = slugSegments[0];
            const topic = await getLearnTopicApi(topicSlug, superbrainEnv);
            if (topic) {
                if (slugSegments.length === 1) {
                    const firstPage = topic.pages[0];
                    return {
                        frontmatter: {
                            title: topic.title,
                            description: topic.description ?? "",
                        },
                        source: firstPage?.html ?? topic.description ?? "",
                    };
                }
                const pageSlug = slugSegments.slice(1).join("/");
                const page = topic.pages.find((p) => p.slug === pageSlug);
                if (page) {
                    return {
                        frontmatter: {
                            title: page.title,
                            description: page.excerpt ?? "",
                        },
                        source: page.html ?? page.excerpt ?? "",
                    };
                }
            }
        }
    }
    return getContentBySlugFs(section, slugSegments);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
    const db = await getContentDb();
    if (db) {
        const { getBlogPostsD1 } = await import("./content-d1");
        const posts = await getBlogPostsD1(db);
        if (posts.length > 0) return posts;
    }
    const superbrainEnv = await getSuperbrainEnv();
    if (superbrainEnv) {
        const { getBlogPostsApi } = await import("./content-api");
        const posts = await getBlogPostsApi(superbrainEnv);
        if (posts && posts.length > 0) return posts;
    }
    return getBlogPostsFs();
}

export async function getDocProjects(): Promise<
    {
        slug: string;
        title: string;
        description: string;
        pageCount: number;
    }[]
> {
    const db = await getContentDb();
    if (db) {
        const { getDocProjectsD1 } = await import("./content-d1");
        const projects = await getDocProjectsD1(db);
        if (projects.length > 0) return projects;
    }
    return getDocProjectsFs();
}

export async function getLearnTopics(): Promise<
    {
        slug: string;
        title: string;
        pageCount: number;
    }[]
> {
    const superbrainEnv = await getSuperbrainEnv();
    if (superbrainEnv) {
        const { getLearnTopicsApi } = await import("./content-api");
        const topics = await getLearnTopicsApi(superbrainEnv);
        if (topics && topics.length > 0) return topics;
    }
    return getLearnTopicsFs();
}

export async function getAdjacentBlogPosts(slug: string): Promise<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
}> {
    const db = await getContentDb();
    if (db) {
        const { getAdjacentBlogPostsD1 } = await import("./content-d1");
        const adjacent = await getAdjacentBlogPostsD1(db, slug);
        if (adjacent.prev || adjacent.next) return adjacent;
    }
    const superbrainEnv = await getSuperbrainEnv();
    if (superbrainEnv) {
        const { getAdjacentBlogPostsApi } = await import("./content-api");
        const adjacent = await getAdjacentBlogPostsApi(slug, superbrainEnv);
        if (adjacent) return adjacent;
    }
    return getAdjacentBlogPostsFs(slug);
}

export async function getAuthors(): Promise<Record<string, AuthorInfo>> {
    const db = await getContentDb();
    if (db) {
        const { getAuthorsD1 } = await import("./content-d1");
        const authors = await getAuthorsD1(db);
        if (Object.keys(authors).length > 0) return authors;
    }
    const superbrainEnv = await getSuperbrainEnv();
    if (superbrainEnv) {
        const { getAuthorsApi } = await import("./content-api");
        const authors = await getAuthorsApi(superbrainEnv);
        if (authors) return authors;
    }
    return getAuthorsFs();
}
