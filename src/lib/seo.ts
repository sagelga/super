import { BASE_URL, SITE_NAME } from "@/lib/config";

const AUTHOR_NAME = SITE_NAME;
const AUTHOR_URL = BASE_URL;
const ORG_ID = `${BASE_URL}/#organization`;
const PERSON_ID = `${BASE_URL}/#person`;

export interface BreadcrumbItem {
    name: string;
    href: string;
}

export function generateBlogPostingJsonLd(opts: {
    slug: string;
    title: string;
    description: string;
    date: string;
    tags?: string[];
    image?: string;
    wordCount?: number;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": `${BASE_URL}/blog/${opts.slug}`,
        headline: opts.title,
        description: opts.description,
        datePublished: opts.date,
        dateModified: opts.date,
        author: {
            "@type": "Person",
            "@id": PERSON_ID,
            name: AUTHOR_NAME,
            url: AUTHOR_URL,
        },
        publisher: {
            "@type": "Organization",
            "@id": ORG_ID,
            name: `${AUTHOR_NAME} Portfolio`,
        },
        ...(opts.image && {
            image: { "@type": "ImageObject", url: opts.image },
        }),
        ...(opts.wordCount && { wordCount: opts.wordCount }),
        ...(opts.tags?.length && { articleSection: opts.tags }),
        url: `${BASE_URL}/blog/${opts.slug}`,
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${BASE_URL}/blog/${opts.slug}`,
        },
    };
}

export function generateTechArticleJsonLd(opts: {
    path: string;
    title: string;
    description?: string;
}) {
    const url = `${BASE_URL}${opts.path}`;
    return {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        "@id": url,
        headline: opts.title,
        ...(opts.description && { description: opts.description }),
        author: {
            "@type": "Person",
            "@id": PERSON_ID,
            name: AUTHOR_NAME,
        },
        publisher: {
            "@type": "Organization",
            "@id": ORG_ID,
        },
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
    };
}

export function generateBreadcrumbJsonLd(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: item.name,
            item: `${BASE_URL}${item.href}`,
        })),
    };
}

export function generateCollectionPageJsonLd(opts: {
    url: string;
    title: string;
    description?: string;
    items: { url: string; name: string }[];
}) {
    return {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        "@id": `${BASE_URL}${opts.url}`,
        name: opts.title,
        ...(opts.description && { description: opts.description }),
        url: `${BASE_URL}${opts.url}`,
        mainEntity: {
            "@type": "ItemList",
            itemListElement: opts.items.map((item, i) => ({
                "@type": "ListItem",
                position: i + 1,
                name: item.name,
                url: `${BASE_URL}${item.url}`,
            })),
        },
    };
}

export function countWords(content: string): number {
    return content
        .replace(/```[\s\S]*?```/g, "")
        .split(/\s+/)
        .filter(Boolean).length;
}

export function estimateReadingTime(content: string): string {
    const words = countWords(content);
    const minutes = Math.max(1, Math.round(words / 200));
    return `${minutes} min read`;
}

export interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

export function extractTableOfContents(content: string): TocItem[] {
    const items: TocItem[] = [];
    const lines = content.split("\n");
    for (const line of lines) {
        const h2 = line.match(/^## (.+)$/);
        if (h2) {
            const text = h2[1].trim();
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            items.push({ id, text, level: 2 });
            continue;
        }
        const h3 = line.match(/^### (.+)$/);
        if (h3) {
            const text = h3[1].trim();
            const id = text
                .toLowerCase()
                .replace(/[^\w\s-]/g, "")
                .replace(/\s+/g, "-");
            items.push({ id, text, level: 3 });
        }
    }
    return items;
}
