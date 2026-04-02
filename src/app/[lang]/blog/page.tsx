import { getBlogPosts } from "@/lib/content";
import { generateCollectionPageJsonLd } from "@/lib/seo";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";

const BASE_URL = "https://sagelga.com";
const POSTS_PER_PAGE = 8;

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Thoughts on technology, software development, and life by Kunanon Srisuntiroj.",
    openGraph: {
        title: "Blog | Kunanon Srisuntiroj",
        description: "Thoughts on technology, software development, and life.",
        url: `${BASE_URL}/blog`,
        type: "website",
    },
    alternates: {
        canonical: `${BASE_URL}/blog`,
    },
};

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const t = await getTranslations("common");
    const locale = await getLocale();
    const { page: pageParam } = await searchParams;
    const allPosts = getBlogPosts();

    const currentPage = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);
    const totalPages = Math.ceil(allPosts.length / POSTS_PER_PAGE);
    const clampedPage = Math.min(currentPage, totalPages);
    const start = (clampedPage - 1) * POSTS_PER_PAGE;
    const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

    const jsonLd = generateCollectionPageJsonLd({
        url: "/blog",
        title: "Blog | Kunanon Srisuntiroj",
        items: allPosts.map((p) => ({ url: `/blog/${p.slug}`, name: p.title })),
    });

    const langPrefix = locale === "th" ? "" : `/${locale}`;
    const pageHref = (n: number) =>
        `${langPrefix}/blog${n > 1 ? `?page=${n}` : ""}`;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-8 py-16 lg:px-16">
                <header className="mb-12">
                    <p className="mb-2 font-sans text-xs font-semibold tracking-widest text-accent uppercase">
                        {t("blog.eyebrow")}
                    </p>
                    <h1 className="font-serif text-4xl font-semibold text-cream">
                        {t("nav.blog")}
                    </h1>
                    <p className="mt-3 text-muted">
                        {t("blog.posts_count", { count: allPosts.length })}
                    </p>
                </header>
                <div>
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} locale={locale} />
                    ))}
                </div>
                {totalPages > 1 && (
                    <nav
                        className="mt-12 flex items-center justify-between gap-4"
                        aria-label="Blog pagination"
                    >
                        {clampedPage > 1 ? (
                            <Link
                                href={pageHref(clampedPage - 1)}
                                className="flex items-center gap-2 border border-rim bg-surface px-5 py-2.5 text-sm tracking-wide text-cream transition-colors duration-200 hover:border-accent hover:text-accent"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="15 18 9 12 15 6" />
                                </svg>
                                {t("blog.previous_button")}
                            </Link>
                        ) : (
                            <span />
                        )}
                        <span className="text-xs tracking-widest text-muted uppercase">
                            {t("blog.page_of", {
                                currentPage: clampedPage,
                                totalPages,
                            })}
                        </span>
                        {clampedPage < totalPages ? (
                            <Link
                                href={pageHref(clampedPage + 1)}
                                className="flex items-center gap-2 border border-rim bg-surface px-5 py-2.5 text-sm tracking-wide text-cream transition-colors duration-200 hover:border-accent hover:text-accent"
                            >
                                {t("blog.next_button")}
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </Link>
                        ) : (
                            <span />
                        )}
                    </nav>
                )}
            </div>
        </>
    );
}
