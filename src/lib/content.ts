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

// Recursively find all .md and .mdx files under a directory, return relative paths
function getAllMarkdownFiles(dir: string, base: string = dir): string[][] {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const results: string[][] = [];
    for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            results.push(...getAllMarkdownFiles(fullPath, base));
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

export function getAllSlugs(section: "blog" | "docs" | "learn"): string[][] {
    const sectionPath = path.join(CONTENT_ROOT, section);
    if (!fs.existsSync(sectionPath)) return [];
    return getAllMarkdownFiles(sectionPath);
}

export function getContentBySlug(
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

export function getBlogPosts(): BlogPost[] {
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

export function getDocProjects(): {
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
            const allFiles = getAllMarkdownFiles(projectPath);
            return {
                slug: d.name,
                title,
                description,
                pageCount: allFiles.length,
            };
        })
        .sort((a, b) => a.title.localeCompare(b.title));
}

export function getLearnTopics(): {
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
            const allFiles = getAllMarkdownFiles(topicPath);
            return { slug: d.name, title, pageCount: allFiles.length };
        })
        .sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getAuthors(): Record<string, AuthorInfo> {
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
