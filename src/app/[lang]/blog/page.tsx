import { getBlogPosts } from "@/lib/content";
import { generateCollectionPageJsonLd } from "@/lib/seo";
import BlogCard from "@/components/blog/BlogCard";
import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";

const BASE_URL = "https://sagelga.com";

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

export default async function BlogPage() {
    const t = await getTranslations("common");
    const locale = await getLocale();
    const posts = getBlogPosts();

    const jsonLd = generateCollectionPageJsonLd({
        url: "/blog",
        title: "Blog | Kunanon Srisuntiroj",
        items: posts.map((p) => ({ url: `/blog/${p.slug}`, name: p.title })),
    });

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
                        {t("blog.posts_count", { count: posts.length })}
                    </p>
                </header>
                <div>
                    {posts.map((post) => (
                        <BlogCard key={post.slug} post={post} locale={locale} />
                    ))}
                </div>
            </div>
        </>
    );
}
