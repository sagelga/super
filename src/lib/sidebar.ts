import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface SidebarItem {
    label: string;
    href?: string;
    children?: SidebarItem[];
    isActive?: boolean;
}

// Helper to get D1 database from Cloudflare context.
// Returns null during Next.js build — avoids SQLite lock contention.
async function getContentDb(): Promise<D1Database | null> {
    if (process.env.NEXT_PHASE === "phase-production-build") return null;
    try {
        const { getCloudflareContext } = await import("@opennextjs/cloudflare");
        const ctx = await getCloudflareContext({ async: true });
        return (ctx.env as { CONTENT_DB?: D1Database }).CONTENT_DB ?? null;
    } catch {
        return null;
    }
}

// Helper to get KV namespace from Cloudflare context.
// Returns null during Next.js build or when unavailable.
async function getKvCache(): Promise<KVNamespace | null> {
    if (process.env.NEXT_PHASE === "phase-production-build") return null;
    try {
        const { getCloudflareContext } = await import("@opennextjs/cloudflare");
        const ctx = await getCloudflareContext({ async: true });
        return (ctx.env as { SUPER_CACHE?: KVNamespace }).SUPER_CACHE ?? null;
    } catch {
        return null;
    }
}

function titleFromSlug(slug: string): string {
    return slug
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
}

function buildTreeFs(dirPath: string, urlBase: string): SidebarItem[] {
    if (!fs.existsSync(dirPath)) return [];

    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    const items: SidebarItem[] = [];

    for (const entry of entries) {
        if (entry.name.startsWith(".") || entry.name === "authors.yml")
            continue;

        const fullPath = path.join(dirPath, entry.name);
        const urlPath = `${urlBase}/${entry.name}`;

        if (entry.isDirectory()) {
            // Check if there's a README inside
            const readmeNames = [
                "README.md",
                "README.mdx",
                "readme.md",
                "index.md",
                "index.mdx",
            ];
            let label = titleFromSlug(entry.name);

            for (const readme of readmeNames) {
                const rp = path.join(fullPath, readme);
                if (fs.existsSync(rp)) {
                    const { data } = matter(fs.readFileSync(rp, "utf-8"));
                    label =
                        (data.sidebar_label as string) ||
                        (data.title as string) ||
                        label;
                    break;
                }
            }

            const children = buildTreeFs(fullPath, urlPath);
            items.push({
                label,
                href: urlPath,
                children: children.length > 0 ? children : undefined,
            });
        } else if (
            (entry.name.endsWith(".md") || entry.name.endsWith(".mdx")) &&
            !entry.name.toLowerCase().startsWith("readme") &&
            !entry.name.toLowerCase().startsWith("index")
        ) {
            const raw = fs.readFileSync(fullPath, "utf-8");
            const { data } = matter(raw);
            const slug = entry.name.replace(/\.(md|mdx)$/, "");
            const label =
                (data.sidebar_label as string) ||
                (data.title as string) ||
                titleFromSlug(slug);
            const href = `${urlBase}/${slug}`;
            items.push({ label, href });
        }
    }

    return items.sort((a, b) => a.label.localeCompare(b.label));
}

function flattenTree(items: SidebarItem[]): { label: string; href: string }[] {
    const result: { label: string; href: string }[] = [];
    for (const item of items) {
        if (item.href) result.push({ label: item.label, href: item.href });
        if (item.children) result.push(...flattenTree(item.children));
    }
    return result;
}

export function getAdjacentDocPages(
    currentHref: string,
    items: SidebarItem[],
): {
    prev: { label: string; href: string } | null;
    next: { label: string; href: string } | null;
} {
    const flat = flattenTree(items);
    const idx = flat.findIndex((p) => p.href === currentHref);
    return {
        prev: idx > 0 ? flat[idx - 1] : null,
        next: idx < flat.length - 1 ? flat[idx + 1] : null,
    };
}

export async function buildSidebarTree(
    section: string,
    subPath?: string,
): Promise<SidebarItem[]> {
    const cacheKey = subPath
        ? `sidebar:${section}:${subPath}`
        : `sidebar:${section}`;
    const kv = await getKvCache();

    if (kv) {
        try {
            const cached = await kv.get(cacheKey);
            if (cached !== null) {
                return JSON.parse(cached) as SidebarItem[];
            }
        } catch {
            // KV read failure — fall through to compute
        }
    }

    const db = await getContentDb();
    let result: SidebarItem[];
    if (db) {
        const { buildSidebarTreeD1 } = await import("./content-d1");
        result = await buildSidebarTreeD1(db, section, subPath);
    } else {
        const contentRoot = path.join(process.cwd(), "content", section);
        const basePath = subPath
            ? path.join(contentRoot, subPath)
            : contentRoot;
        const urlBase = subPath ? `/${section}/${subPath}` : `/${section}`;
        result = buildTreeFs(basePath, urlBase);
    }

    if (kv) {
        try {
            await kv.put(cacheKey, JSON.stringify(result), {
                expirationTtl: 86400,
            });
        } catch {
            // KV write failure — non-fatal, continue with computed result
        }
    }

    return result;
}
