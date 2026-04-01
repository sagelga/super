import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogPosts, getContentBySlug, getAuthors } from "@/lib/content";
import {
    generateBlogPostingJsonLd,
    generateBreadcrumbJsonLd,
    extractTableOfContents,
    estimateReadingTime,
} from "@/lib/seo";
import MdxRenderer from "@/components/content/MdxRenderer";
import PostHeader from "@/components/blog/PostHeader";
import TableOfContents from "@/components/content/TableOfContents";

const BASE_URL = "https://sagelga.com";
const LOCALES = ["en", "th", "zh"];

export async function generateStaticParams() {
    const posts = getBlogPosts();
    return LOCALES.flatMap((lang) =>
        posts.map((post) => ({ lang, slug: post.slug })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string; lang?: string }>;
}): Promise<Metadata> {
    const { slug, lang } = await params;
    const item = getContentBySlug("blog", [slug]);
    if (!item) return { title: "Post Not Found" };

    const fm = item.frontmatter as {
        title?: string;
        description?: string;
        image?: string;
        date?: string;
        tags?: string[];
        authors?: string[];
    };
    const title = fm.title || "Blog Post";
    const description = fm.description || "";
    const image = fm.image || `${BASE_URL}/og-image.png`;
    const locale = lang ?? "th";
    const langPrefix = (l: string) => (l === "th" ? "" : `/${l}`);
    const canonical = `${BASE_URL}/blog/${slug}`;

    return {
        title,
        description,
        authors: [{ name: "Kunanon Srisuntiroj" }],
        openGraph: {
            title,
            description,
            url: canonical,
            type: "article",
            publishedTime: fm.date,
            authors: ["Kunanon Srisuntiroj"],
            tags: fm.tags,
            images: [{ url: image, width: 1200, height: 630, alt: title }],
            locale:
                locale === "th" ? "th_TH" : locale === "zh" ? "zh_CN" : "en_US",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [image],
        },
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((l) => [
                    l,
                    `${BASE_URL}${langPrefix(l)}/blog/${slug}`,
                ]),
            ),
        },
    };
}

export default async function PostPage({
    params,
}: {
    params: Promise<{ slug: string; lang?: string }>;
}) {
    const { slug, lang } = await params;
    const item = getContentBySlug("blog", [slug]);
    if (!item) notFound();

    const fm = item.frontmatter as {
        title?: string;
        description?: string;
        image?: string;
        date?: string;
        tags?: string[];
        authors?: string[];
    };
    const authorData = getAuthors();
    const toc = extractTableOfContents(item.source);
    const readingTime = estimateReadingTime(item.source);
    const wordCount = item.source.split(/\s+/).length;

    const blogJsonLd = generateBlogPostingJsonLd({
        slug,
        title: fm.title || "",
        description: fm.description || "",
        date: fm.date || "",
        tags: fm.tags,
        image: fm.image,
        wordCount,
    });
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: fm.title || slug, href: `/blog/${slug}` },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />

            <div className="container mx-auto px-8 py-12 lg:px-16">
                <div className="flex gap-12">
                    <article className="max-w-3xl min-w-0 flex-1">
                        <PostHeader
                            title={fm.title || slug}
                            date={fm.date || ""}
                            tags={fm.tags}
                            image={fm.image}
                            readingTime={readingTime}
                            authors={fm.authors}
                            authorData={authorData}
                            locale={lang ?? "en"}
                        />
                        <MdxRenderer source={item.source} />
                    </article>
                    {toc.length >= 2 && (
                        <aside className="hidden w-56 shrink-0 xl:block">
                            <div className="sticky top-24">
                                <TableOfContents items={toc} />
                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </>
    );
}
