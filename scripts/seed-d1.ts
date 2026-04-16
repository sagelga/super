#!/usr/bin/env node
/**
 * Seed Cloudflare D1 `super-content` database from local MDX files.
 * Usage:
 *   npx tsx scripts/seed-d1.ts           # seeds local D1
 *   npx tsx scripts/seed-d1.ts --remote  # seeds remote D1
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawnSync } from "child_process";
import matter from "gray-matter";
import { preprocessAdmonitions } from "../src/lib/remark-admonitions";
import {
    preprocessResolveImages,
    preprocessBlogImages,
} from "../src/lib/remark-resolve-images";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isRemote = process.argv.includes("--remote");
const DB_NAME = "super-content";
const CONTENT_ROOT = path.join(__dirname, "..", "content");
const TMP_SQL = path.join(__dirname, "..", ".tmp-seed.sql");

// Escape a string value for SQLite
function esc(val: string): string {
    return val.replace(/'/g, "''");
}

const lines: string[] = [];

function sql(statement: string): void {
    lines.push(statement);
}

// --- 1. Authors ---
function seedAuthors(): void {
    const authorsPath = path.join(CONTENT_ROOT, "blog", "authors.yml");
    if (!fs.existsSync(authorsPath)) return;
    const raw = fs.readFileSync(authorsPath, "utf-8");
    let currentKey = "";
    const authors: Record<
        string,
        { name: string; title?: string; url?: string; image_url?: string }
    > = {};
    for (const line of raw.split("\n")) {
        const keyMatch = line.match(/^(\w+):$/);
        if (keyMatch) {
            currentKey = keyMatch[1];
            authors[currentKey] = { name: currentKey };
            continue;
        }
        if (currentKey) {
            const fieldMatch = line.match(/^\s+(\w+):\s+(.+)$/);
            if (fieldMatch) {
                const [, field, value] = fieldMatch;
                const cleaned = value.replace(/^['"]|['"]$/g, "").trim();
                if (field === "name") authors[currentKey].name = cleaned;
                if (field === "title") authors[currentKey].title = cleaned;
                if (field === "url") authors[currentKey].url = cleaned;
                if (field === "image_url")
                    authors[currentKey].image_url = cleaned;
            }
        }
    }
    for (const [key, a] of Object.entries(authors)) {
        sql(
            `INSERT OR REPLACE INTO authors (key, name, title, url, image_url) VALUES ('${esc(key)}', '${esc(a.name)}', ${a.title ? `'${esc(a.title)}'` : "NULL"}, ${a.url ? `'${esc(a.url)}'` : "NULL"}, ${a.image_url ? `'${esc(a.image_url)}'` : "NULL"});`,
        );
    }
    console.log(`Seeded ${Object.keys(authors).length} authors`);
}

// --- 2. Blog posts ---
function seedBlogPosts(): void {
    const blogDir = path.join(CONTENT_ROOT, "blog");
    if (!fs.existsSync(blogDir)) return;
    const files = fs
        .readdirSync(blogDir)
        .filter((f) => f.endsWith(".md") || f.endsWith(".mdx"));
    let count = 0;
    for (const file of files) {
        const raw = fs.readFileSync(path.join(blogDir, file), "utf-8");
        const { data, content } = matter(raw);
        if (!data.title) continue;
        const slug = (data.slug as string) || file.replace(/\.(md|mdx)$/, "");
        const source = preprocessBlogImages(preprocessAdmonitions(content));
        const wordCount = content.split(/\s+/).length;
        const readingMinutes = Math.max(1, Math.round(wordCount / 200));
        const readingTime = `${readingMinutes} min read`;
        sql(
            `INSERT OR REPLACE INTO blog_posts (slug, title, description, date, authors, tags, image, reading_time, source, word_count) VALUES ('${esc(slug)}', '${esc(String(data.title || ""))}', '${esc(String(data.description || ""))}', '${esc(String(data.date || ""))}', '${esc(JSON.stringify(data.authors || []))}', '${esc(JSON.stringify(data.tags || []))}', ${data.image ? `'${esc(String(data.image))}'` : "NULL"}, '${esc(readingTime)}', '${esc(source)}', ${wordCount});`,
        );
        count++;
    }
    console.log(`Seeded ${count} blog posts`);
}

// --- 3. Content pages (docs + learn) ---
function getAllMarkdownFiles(dir: string, base: string = dir): string[][] {
    if (!fs.existsSync(dir)) return [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const results: string[][] = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory())
            results.push(...getAllMarkdownFiles(fullPath, base));
        else if (
            entry.isFile() &&
            (entry.name.endsWith(".md") || entry.name.endsWith(".mdx"))
        ) {
            const rel = path
                .relative(base, fullPath)
                .replace(/\.(md|mdx)$/, "")
                .split(path.sep);
            results.push(rel);
        }
    }
    return results;
}

function seedContentPages(section: "docs" | "learn"): void {
    const sectionDir = path.join(CONTENT_ROOT, section);
    if (!fs.existsSync(sectionDir)) return;
    const allFiles = getAllMarkdownFiles(sectionDir);
    let count = 0;
    for (const segments of allFiles) {
        // Try .mdx then .md
        let filePath = "";
        for (const ext of [".mdx", ".md"]) {
            const candidate = path.join(sectionDir, ...segments) + ext;
            if (fs.existsSync(candidate)) {
                filePath = candidate;
                break;
            }
        }
        // Also check README variants
        if (!filePath) {
            for (const readme of ["README.md", "README.mdx"]) {
                const candidate = path.join(sectionDir, ...segments, readme);
                if (fs.existsSync(candidate)) {
                    filePath = candidate;
                    break;
                }
            }
        }
        if (!filePath) continue;

        const raw = fs.readFileSync(filePath, "utf-8");
        const { data, content } = matter(raw);
        let source = preprocessAdmonitions(content);
        source = preprocessResolveImages(source, {
            section,
            slugPath: segments,
        });

        const slugKey = segments.join("/");
        const isReadme = filePath.toLowerCase().includes("readme") ? 1 : 0;
        sql(
            `INSERT OR REPLACE INTO content_pages (section, slug_key, slug_path, title, sidebar_label, description, source, is_readme) VALUES ('${esc(section)}', '${esc(slugKey)}', '${esc(JSON.stringify(segments))}', '${esc(String(data.title || ""))}', ${data.sidebar_label ? `'${esc(String(data.sidebar_label))}'` : "NULL"}, ${data.description ? `'${esc(String(data.description))}'` : "NULL"}, '${esc(source)}', ${isReadme});`,
        );
        count++;
    }
    console.log(`Seeded ${count} ${section} pages`);
}

// --- 4. Doc projects + Learn topics summaries ---
function seedDocProjects(): void {
    const docsDir = path.join(CONTENT_ROOT, "docs");
    if (!fs.existsSync(docsDir)) return;
    const dirs = fs
        .readdirSync(docsDir, { withFileTypes: true })
        .filter((d) => d.isDirectory());
    for (const d of dirs) {
        const projectDir = path.join(docsDir, d.name);
        let title = d.name,
            description = "";
        for (const readme of ["README.md", "README.mdx", "readme.md"]) {
            const fp = path.join(projectDir, readme);
            if (fs.existsSync(fp)) {
                const { data } = matter(fs.readFileSync(fp, "utf-8"));
                title = (data.title as string) || d.name;
                description = (data.description as string) || "";
                break;
            }
        }
        const pageCount = getAllMarkdownFiles(projectDir).length;
        sql(
            `INSERT OR REPLACE INTO doc_projects (slug, title, description, page_count) VALUES ('${esc(d.name)}', '${esc(title)}', '${esc(description)}', ${pageCount});`,
        );
    }
    console.log(`Seeded ${dirs.length} doc projects`);
}

function seedLearnTopics(): void {
    const learnDir = path.join(CONTENT_ROOT, "learn");
    if (!fs.existsSync(learnDir)) return;
    const dirs = fs
        .readdirSync(learnDir, { withFileTypes: true })
        .filter((d) => d.isDirectory());
    for (const d of dirs) {
        const topicDir = path.join(learnDir, d.name);
        let title = d.name.charAt(0).toUpperCase() + d.name.slice(1);
        for (const readme of ["README.md", "README.mdx", "readme.md"]) {
            const fp = path.join(topicDir, readme);
            if (fs.existsSync(fp)) {
                const { data } = matter(fs.readFileSync(fp, "utf-8"));
                title = (data.title as string) || title;
                break;
            }
        }
        const pageCount = getAllMarkdownFiles(topicDir).length;
        sql(
            `INSERT OR REPLACE INTO learn_topics (slug, title, page_count) VALUES ('${esc(d.name)}', '${esc(title)}', ${pageCount});`,
        );
    }
    console.log(`Seeded ${dirs.length} learn topics`);
}

// --- 5. Gallery items ---
function seedGalleryItems(): void {
    const items = [
        {
            id: 1,
            seed: "trashmelody",
            category: "projects",
            title: "TrashMelody",
            width: 1200,
            height: 800,
        },
        {
            id: 2,
            seed: "kumamoto1",
            category: "photography",
            title: "Kumamoto Castle",
            width: 800,
            height: 1100,
        },
        {
            id: 3,
            seed: "mahjong",
            category: "projects",
            title: "Mahjong Hands",
            width: 1200,
            height: 750,
        },
        {
            id: 4,
            seed: "kyoto2",
            category: "photography",
            title: "Kyoto Streets",
            width: 900,
            height: 1200,
        },
        {
            id: 5,
            seed: "portfolio1",
            category: "design",
            title: "Portfolio v3",
            width: 1400,
            height: 900,
        },
        {
            id: 6,
            seed: "osaka3",
            category: "photography",
            title: "Osaka at Night",
            width: 1200,
            height: 800,
        },
        {
            id: 7,
            seed: "telegram",
            category: "projects",
            title: "Telegram Thai Bot",
            width: 1000,
            height: 700,
        },
        {
            id: 8,
            seed: "typography1",
            category: "design",
            title: "Type Study",
            width: 800,
            height: 1050,
        },
        {
            id: 9,
            seed: "nara4",
            category: "photography",
            title: "Nara Deer Park",
            width: 1100,
            height: 780,
        },
        {
            id: 10,
            seed: "salesforce1",
            category: "projects",
            title: "Salesforce Dashboard",
            width: 1400,
            height: 880,
        },
        {
            id: 11,
            seed: "palette2",
            category: "design",
            title: "Color Systems",
            width: 900,
            height: 1200,
        },
        {
            id: 12,
            seed: "hiroshima5",
            category: "photography",
            title: "Hiroshima Peace Park",
            width: 1200,
            height: 800,
        },
        {
            id: 13,
            seed: "statuspage",
            category: "projects",
            title: "Status Page",
            width: 1100,
            height: 720,
        },
        {
            id: 14,
            seed: "icons3",
            category: "design",
            title: "Icon Set",
            width: 1000,
            height: 1000,
        },
        {
            id: 15,
            seed: "fukuoka6",
            category: "photography",
            title: "Fukuoka Morning",
            width: 800,
            height: 1100,
        },
    ];
    for (const item of items) {
        sql(
            `INSERT OR REPLACE INTO gallery_items (id, seed, category, title, width, height) VALUES (${item.id}, '${esc(item.seed)}', '${esc(item.category)}', '${esc(item.title)}', ${item.width}, ${item.height});`,
        );
    }
    console.log(`Seeded ${items.length} gallery items`);
}

// --- 6. Sidebar trees ---
interface SidebarItem {
    label: string;
    href?: string;
    children?: SidebarItem[];
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
            let label = titleFromSlug(entry.name);
            for (const readme of [
                "README.md",
                "README.mdx",
                "readme.md",
                "index.md",
                "index.mdx",
            ]) {
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
            items.push({ label, href: `${urlBase}/${slug}` });
        }
    }
    return items.sort((a, b) => a.label.localeCompare(b.label));
}

function seedSidebarTrees(): void {
    let count = 0;
    for (const section of ["docs", "learn"] as const) {
        const sectionDir = path.join(CONTENT_ROOT, section);
        if (!fs.existsSync(sectionDir)) continue;
        // Top-level tree
        const topTree = buildTreeFs(sectionDir, `/${section}`);
        sql(
            `INSERT OR REPLACE INTO sidebar_trees (section, sub_path, tree_json) VALUES ('${esc(section)}', '', '${esc(JSON.stringify(topTree))}');`,
        );
        count++;
        // Per-project / per-topic subtrees
        const dirs = fs
            .readdirSync(sectionDir, { withFileTypes: true })
            .filter((d) => d.isDirectory());
        for (const d of dirs) {
            const subTree = buildTreeFs(
                path.join(sectionDir, d.name),
                `/${section}/${d.name}`,
            );
            sql(
                `INSERT OR REPLACE INTO sidebar_trees (section, sub_path, tree_json) VALUES ('${esc(section)}', '${esc(d.name)}', '${esc(JSON.stringify(subTree))}');`,
            );
            count++;
        }
    }
    console.log(`Seeded ${count} sidebar trees`);
}

// --- Execute ---
async function main(): Promise<void> {
    console.log(
        `Seeding D1 database '${DB_NAME}' (${isRemote ? "remote" : "local"})...`,
    );

    function wrangler(args: string[]): void {
        const result = spawnSync("npx", ["wrangler", ...args], {
            stdio: "inherit",
            shell: false,
        });
        if (result.status !== 0) {
            console.error(
                `wrangler command failed: wrangler ${args.join(" ")}`,
            );
            process.exit(1);
        }
    }

    // Apply schema first
    const schemaPath = path.join(
        __dirname,
        "..",
        "migrations",
        "001_content.sql",
    );
    wrangler([
        "d1",
        "execute",
        DB_NAME,
        "--file",
        schemaPath,
        isRemote ? "--remote" : "--local",
    ]);

    seedAuthors();
    seedBlogPosts();
    seedContentPages("docs");
    seedContentPages("learn");
    seedDocProjects();
    seedLearnTopics();
    seedGalleryItems();
    seedSidebarTrees();

    // Write SQL to temp file and execute
    fs.writeFileSync(TMP_SQL, lines.join("\n"));
    console.log(`Executing ${lines.length} SQL statements...`);
    wrangler([
        "d1",
        "execute",
        DB_NAME,
        "--file",
        TMP_SQL,
        isRemote ? "--remote" : "--local",
    ]);
    fs.unlinkSync(TMP_SQL);
    console.log("Seed complete.");
}

main().catch(console.error);
