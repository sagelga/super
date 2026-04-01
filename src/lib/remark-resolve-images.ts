/**
 * Remark plugin that rewrites relative image paths in docs/learn content
 * to absolute public paths so Next.js can serve them from /public/images/.
 *
 * Note: unist-util-visit is not available in this project. Use
 * preprocessResolveImages() on the raw content string before rendering,
 * or call remarkResolveImages() as a no-op placeholder in a remark chain.
 *
 * Relative image syntax rewritten:
 *   ![alt](./path/to/image.png)  →  ![alt](/images/docs/project/path/to/image.png)
 *   ![alt](path/to/image.png)    →  ![alt](/images/docs/project/path/to/image.png)
 *
 * Absolute URLs, data URIs, and root-relative paths (/...) are left unchanged.
 */

interface ResolveImagesOptions {
    /** Content section: 'docs' or 'learn' */
    section: "docs" | "learn";
    /**
     * Slug path segments for the current page.
     * e.g. ['approval-workflow', 'docs', 'develop', 'config']
     */
    slugPath: string[];
}

/**
 * Preprocesses a markdown string, rewriting relative image paths to absolute
 * public paths based on the content section and slug location.
 */
export function preprocessResolveImages(
    content: string,
    options: ResolveImagesOptions,
): string {
    const { section, slugPath } = options;
    const basePub = `/images/${section}/${slugPath.join("/")}`;

    // Match markdown image syntax: ![alt](url) or ![alt](url "title")
    // Only rewrite relative paths (not http/https, data:, or leading /)
    return content.replace(
        /!\[([^\]]*)\]\(([^)]+)\)/g,
        (match, alt, urlAndTitle) => {
            // Separate the URL from an optional title
            const titleMatch = urlAndTitle.match(/^(.+?)\s+"([^"]*)"$/);
            const rawUrl = titleMatch
                ? titleMatch[1].trim()
                : urlAndTitle.trim();
            const titlePart = titleMatch ? ` "${titleMatch[2]}"` : "";

            // Leave absolute URLs, data URIs, and root-relative paths alone
            if (
                rawUrl.startsWith("http://") ||
                rawUrl.startsWith("https://") ||
                rawUrl.startsWith("data:") ||
                rawUrl.startsWith("/")
            ) {
                return match;
            }

            // Strip leading ./
            const relPath = rawUrl.replace(/^\.\//, "");
            const publicPath = `${basePub}/${relPath}`;
            return `![${alt}](${publicPath}${titlePart})`;
        },
    );
}

/**
 * Preprocesses a blog markdown string, rewriting relative image paths to full
 * Cloudinary URLs. Blog images are hosted on Cloudinary and stored in content
 * files as bare public IDs (without the base URL).
 *
 * Relative image syntax rewritten:
 *   ![alt](public_id.png)  →  ![alt](https://res.cloudinary.com/bytesideone/image/upload/public_id.png)
 *
 * Absolute URLs, data URIs, root-relative paths, and empty srcs are left unchanged.
 */
const CLOUDINARY_BASE =
    "https://res.cloudinary.com/bytesideone/image/upload/blog/";

export function preprocessBlogImages(content: string): string {
    return content.replace(
        /!\[([^\]]*)\]\(([^)]*)\)/g,
        (match, alt, urlAndTitle) => {
            if (!urlAndTitle.trim()) return match; // empty src

            const titleMatch = urlAndTitle.match(/^(.+?)\s+"([^"]*)"$/);
            const rawUrl = titleMatch
                ? titleMatch[1].trim()
                : urlAndTitle.trim();
            const titlePart = titleMatch ? ` "${titleMatch[2]}"` : "";

            if (
                rawUrl.startsWith("http://") ||
                rawUrl.startsWith("https://") ||
                rawUrl.startsWith("data:") ||
                rawUrl.startsWith("/")
            ) {
                return match;
            }

            const relPath = rawUrl.replace(/^\.\//, "");
            return `![${alt}](${CLOUDINARY_BASE}${relPath}${titlePart})`;
        },
    );
}

/**
 * Unified/remark plugin stub. The actual image path transformation is done
 * via preprocessResolveImages() on the raw string before parsing. Kept here
 * so the import path is consistent with the rest of the remark plugin chain.
 *
 * Usage:
 *   const processedSource = preprocessResolveImages(rawSource, { section, slugPath })
 *   // then compile processedSource as MDX/Markdown
 */
export function remarkResolveImages(options: ResolveImagesOptions) {
    void options;
    return () => {};
}
