import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { toHtml } from "hast-util-to-html";
import { visit } from "unist-util-visit";
import type { Root as HastRoot, Element } from "hast";
import type { Plugin } from "unified";

interface MdxRendererProps {
    source: string;
}

// Match Admonition.tsx config
const ADMONITION_CONFIG: Record<
    string,
    { label: string; border: string; icon: string; bg: string }
> = {
    tip:     { label: "Tip",     border: "border-brand",       icon: "text-brand",       bg: "bg-brand/5" },
    info:    { label: "Info",    border: "border-brand",       icon: "text-brand",       bg: "bg-brand/5" },
    note:    { label: "Note",    border: "border-brand",       icon: "text-brand",       bg: "bg-brand/5" },
    warning: { label: "Warning", border: "border-accent",      icon: "text-accent",      bg: "bg-accent/5" },
    caution: { label: "Caution", border: "border-accent",      icon: "text-accent",      bg: "bg-accent/5" },
    danger:  { label: "Danger",  border: "border-red-500/70",  icon: "text-red-400",     bg: "bg-red-500/5" },
};

/**
 * Convert <Admonition type="..." title="...">...</Admonition> JSX in stored
 * MDX source to plain HTML divs that the rehype pipeline can pass through.
 */
function convertAdmonitionJsx(source: string): string {
    return source
        .replace(
            /<Admonition\s+type="(\w+)"(?:\s+title="([^"]*)")?>/g,
            (_, type: string, title?: string) => {
                const cfg = ADMONITION_CONFIG[type] ?? ADMONITION_CONFIG.info;
                const label = title || cfg.label;
                return (
                    `<div class="my-6 rounded-r-md border-l-4 px-4 py-3 not-prose ${cfg.border} ${cfg.bg}">` +
                    `<div class="mb-1 font-sans text-xs font-semibold uppercase tracking-widest ${cfg.icon}">${label}</div>` +
                    `<div class="text-sm text-muted [&>p]:mb-1 [&>p:last-child]:mb-0">`
                );
            }
        )
        .replace(/<\/Admonition>/g, "</div></div>");
}

// rehype plugin: open external links in new tab
const rehypeExternalLinks: Plugin<[], HastRoot> = () => (tree) => {
    visit(tree, "element", (node: Element) => {
        if (
            node.tagName === "a" &&
            typeof node.properties?.href === "string" &&
            node.properties.href.startsWith("http")
        ) {
            node.properties.target = "_blank";
            node.properties.rel = ["noopener", "noreferrer"];
        }
    });
};

// rehype plugin: add lazy loading to images
const rehypeLazyImages: Plugin<[], HastRoot> = () => (tree) => {
    visit(tree, "element", (node: Element) => {
        if (node.tagName === "img") {
            node.properties = node.properties ?? {};
            node.properties.loading = "lazy";
            node.properties.decoding = "async";
            const existing = (node.properties.className as string[]) ?? [];
            node.properties.className = [
                ...existing,
                "mx-auto",
                "my-6",
                "block",
                "h-auto",
                "max-w-full",
                "rounded-md",
            ];
        }
    });
};

// rehype plugin: wrap tables for horizontal scroll on mobile
const rehypeTableWrapper: Plugin<[], HastRoot> = () => (tree) => {
    visit(tree, "element", (node: Element, index, parent) => {
        if (
            node.tagName === "table" &&
            parent &&
            "children" in parent &&
            typeof index === "number"
        ) {
            const wrapper: Element = {
                type: "element",
                tagName: "div",
                properties: { className: ["my-6", "overflow-x-auto"] },
                children: [node],
            };
            (parent as HastRoot).children[index] = wrapper;
        }
    });
};

export default async function MdxRenderer({ source }: MdxRendererProps) {
    const processedSource = convertAdmonitionJsx(source);

    const processor = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: true })
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, {
            behavior: "append",
            properties: {
                className: ["anchor"],
                ariaLabel: "Link to section",
            },
        })
        .use(rehypeExternalLinks)
        .use(rehypeLazyImages)
        .use(rehypeTableWrapper);

    const mdast = processor.parse(processedSource);
    const hast = (await processor.run(mdast)) as HastRoot;
    const html = toHtml(hast, { allowDangerousHtml: true });

    return (
        <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
        />
    );
}
