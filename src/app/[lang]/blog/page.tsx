import { getBlogPosts } from "@/lib/content";
import { generateCollectionPageJsonLd } from "@/lib/seo";
import { BASE_URL } from "@/lib/config";
import BlogCard from "@/components/blog/BlogCard";
import Link from "next/link";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";

const POSTS_PER_PAGE = 10;
const LOCALES = ["en", "th", "zh"] as const;

const OG_LOCALE: Record<string, string> = {
    th: "th_TH",
    en: "en_US",
    zh: "zh_CN",
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const [t, tMeta] = await Promise.all([
        getTranslations({ locale: lang, namespace: "common" }),
        getTranslations({ locale: lang, namespace: "metadata" }),
    ]);

    const canonical =
        lang === "th" ? `${BASE_URL}/blog` : `${BASE_URL}/${lang}/blog`;
    const title = t("nav.blog");
    const description = tMeta("description");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonical,
            type: "website",
            locale: OG_LOCALE[lang] ?? "en_US",
        },
        twitter: {
            card: "summary",
            title,
            description,
        },
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((l) => [
                    l,
                    l === "th" ? `${BASE_URL}/blog` : `${BASE_URL}/${l}/blog`,
                ]),
            ),
        },
    };
}

interface BlogPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
    const t = await getTranslations("common");
    const locale = await getLocale();
    const { page: pageParam } = await searchParams;
    const allPosts = await getBlogPosts();

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

    const paginationLinkClass =
        "text-text flex min-h-[44px] min-w-[44px] touch-manipulation items-center gap-2 border border-rim bg-surface px-5 py-2.5 text-sm tracking-wide transition-colors duration-200 hover:border-accent hover:text-accent";

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
                    <h1 className="text-text font-serif text-4xl font-semibold">
                        {t("nav.blog")}
                    </h1>
                    <p className="mt-3 text-muted">
                        {t("blog.posts_count", { count: allPosts.length })}
                    </p>
                </header>
                <div>
                    {posts.length === 0 ? (
                        <div className="py-24 text-center">
                            <p className="text-muted">
                                {t("blog.no_posts_found")}
                            </p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <BlogCard
                                key={post.slug}
                                post={post}
                                locale={locale}
                            />
                        ))
                    )}
                </div>
                {totalPages > 1 && (
                    <nav
                        className="mt-12 flex items-center justify-between gap-4"
                        aria-label="Blog pagination"
                    >
                        {clampedPage > 1 ? (
                            <Link
                                href={pageHref(clampedPage - 1)}
                                className={paginationLinkClass}
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
                                className={paginationLinkClass}
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
