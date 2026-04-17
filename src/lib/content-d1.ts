import type { BlogPost, AuthorInfo, ContentItem } from "./content";
import type { SidebarItem } from "./sidebar";

export async function getBlogPostsD1(db: D1Database): Promise<BlogPost[]> {
    const { results } = await db
        .prepare(
            "SELECT slug, title, description, date, authors, tags, image, reading_time, source FROM blog_posts ORDER BY date DESC",
        )
        .all();
    return (results as Record<string, unknown>[]).map((row) => ({
        slug: row.slug as string,
        title: row.title as string,
        description: row.description as string,
        date: row.date as string,
        authors: JSON.parse(row.authors as string) as string[],
        tags: JSON.parse(row.tags as string) as string[],
        image: (row.image as string) || undefined,
        readingTime: row.reading_time as string,
        source: row.source as string,
    }));
}

export async function getContentBySlugD1(
    db: D1Database,
    section: string,
    slugSegments: string[],
): Promise<ContentItem | null> {
    // Blog posts live in their own table
    if (section === "blog") {
        const slug = slugSegments.join("/");
        const row = await db
            .prepare(
                "SELECT title, description, source FROM blog_posts WHERE slug = ?",
            )
            .bind(slug)
            .first<Record<string, unknown>>();
        if (!row) return null;
        const frontmatter: Record<string, unknown> = {};
        if (row.title) frontmatter.title = row.title;
        if (row.description) frontmatter.description = row.description;
        return { frontmatter, source: row.source as string };
    }

    // Docs/learn: try exact slug_key, then fall back to slug_key/README
    // (mirrors the fs fallback that appends README.mdx for directory indexes)
    const slugKey = slugSegments.join("/");
    const readmeKey = slugKey ? `${slugKey}/README` : "README";
    const row = await db
        .prepare(
            "SELECT * FROM content_pages WHERE section = ? AND (slug_key = ? OR slug_key = ?) LIMIT 1",
        )
        .bind(section, slugKey, readmeKey)
        .first<Record<string, unknown>>();
    if (!row) return null;
    const frontmatter: Record<string, unknown> = {};
    if (row.title) frontmatter.title = row.title;
    if (row.sidebar_label) frontmatter.sidebar_label = row.sidebar_label;
    if (row.description) frontmatter.description = row.description;
    return { frontmatter, source: row.source as string };
}

export async function getAllSlugsD1(
    db: D1Database,
    section: "blog" | "docs" | "learn",
): Promise<string[][]> {
    const { results } = await db
        .prepare("SELECT slug_path FROM content_pages WHERE section = ?")
        .bind(section)
        .all();
    return (results as Record<string, unknown>[]).map(
        (row) => JSON.parse(row.slug_path as string) as string[],
    );
}

export async function getBlogPostsListD1(
    db: D1Database,
): Promise<
    Pick<
        BlogPost,
        | "slug"
        | "title"
        | "description"
        | "date"
        | "authors"
        | "tags"
        | "image"
        | "readingTime"
    >[]
> {
    const { results } = await db
        .prepare(
            "SELECT slug, title, description, date, authors, tags, image, reading_time FROM blog_posts ORDER BY date DESC",
        )
        .all();
    return (results as Record<string, unknown>[]).map((row) => ({
        slug: row.slug as string,
        title: row.title as string,
        description: row.description as string,
        date: row.date as string,
        authors: JSON.parse(row.authors as string) as string[],
        tags: JSON.parse(row.tags as string) as string[],
        image: (row.image as string) || undefined,
        readingTime: row.reading_time as string,
    }));
}

export async function getDocProjectsD1(
    db: D1Database,
): Promise<
    { slug: string; title: string; description: string; pageCount: number }[]
> {
    const { results } = await db
        .prepare(
            "SELECT slug, title, description, page_count FROM doc_projects ORDER BY title ASC",
        )
        .all();
    return (results as Record<string, unknown>[]).map((row) => ({
        slug: row.slug as string,
        title: row.title as string,
        description: row.description as string,
        pageCount: row.page_count as number,
    }));
}

export async function getLearnTopicsD1(
    db: D1Database,
): Promise<{ slug: string; title: string; pageCount: number }[]> {
    const { results } = await db
        .prepare(
            "SELECT slug, title, page_count FROM learn_topics ORDER BY slug ASC",
        )
        .all();
    return (results as Record<string, unknown>[]).map((row) => ({
        slug: row.slug as string,
        title: row.title as string,
        pageCount: row.page_count as number,
    }));
}

export async function getAdjacentBlogPostsD1(
    db: D1Database,
    slug: string,
): Promise<{
    prev: { slug: string; title: string } | null;
    next: { slug: string; title: string } | null;
}> {
    const posts = await getBlogPostsD1(db);
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

export async function getAuthorsD1(
    db: D1Database,
): Promise<Record<string, AuthorInfo>> {
    const { results } = await db
        .prepare("SELECT key, name, title, url, image_url FROM authors")
        .all();
    const result: Record<string, AuthorInfo> = {};
    for (const row of results as Record<string, unknown>[]) {
        result[row.key as string] = {
            name: row.name as string,
            title: (row.title as string) || undefined,
            url: (row.url as string) || undefined,
            image_url: (row.image_url as string) || undefined,
        };
    }
    return result;
}

export async function buildSidebarTreeD1(
    db: D1Database,
    section: string,
    subPath?: string,
): Promise<SidebarItem[]> {
    const key = subPath ?? "";
    const row = await db
        .prepare(
            "SELECT tree_json FROM sidebar_trees WHERE section = ? AND sub_path = ?",
        )
        .bind(section, key)
        .first<Record<string, unknown>>();
    if (!row) return [];
    return JSON.parse(row.tree_json as string) as SidebarItem[];
}
