import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLearnTopics, getAllSlugs, getContentBySlug } from "@/lib/content";
import {
    generateTechArticleJsonLd,
    generateBreadcrumbJsonLd,
    extractTableOfContents,
} from "@/lib/seo";
import { buildSidebarTree } from "@/lib/sidebar";
import ContentLayout from "@/components/content/ContentLayout";
import MdxRenderer from "@/components/content/MdxRenderer";
import TableOfContents from "@/components/content/TableOfContents";
import { BASE_URL } from "@/lib/config";

const LOCALES = ["en", "th", "zh"];

export async function generateStaticParams() {
    const topics = getLearnTopics();
    const allSlugs = getAllSlugs("learn");
    const contentParams: { topic: string; slug: string[] }[] = [];
    for (const t of topics) {
        const slugs = allSlugs.filter((s) => s[0] === t.slug && s.length > 1);
        for (const slug of slugs) {
            contentParams.push({ topic: t.slug, slug: slug.slice(1) });
        }
    }
    return LOCALES.flatMap((lang) =>
        contentParams.map((p) => ({ lang, ...p })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ topic: string; slug: string[] }>;
}): Promise<Metadata> {
    const { topic, slug } = await params;
    const item = getContentBySlug("learn", [topic, ...slug]);
    const title =
        (item?.frontmatter?.title as string) || slug[slug.length - 1] || topic;
    const canonical = `${BASE_URL}/learn/${topic}/${slug.join("/")}`;
    return {
        title,
        openGraph: { title, url: canonical, type: "article" },
        alternates: { canonical },
    };
}

export default async function LearnPage({
    params,
}: {
    params: Promise<{ topic: string; slug: string[] }>;
}) {
    const { topic, slug } = await params;
    const item = getContentBySlug("learn", [topic, ...slug]);
    if (!item) notFound();

    const fm = item.frontmatter as { title?: string };
    const title = fm.title || slug[slug.length - 1] || topic;
    const sidebarItems = buildSidebarTree("learn", topic);
    const toc = extractTableOfContents(item.source);
    const currentPath = `/learn/${topic}/${slug.join("/")}`;

    const techJsonLd = generateTechArticleJsonLd({ path: currentPath, title });
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Learn", href: "/learn" },
        {
            name: topic.charAt(0).toUpperCase() + topic.slice(1),
            href: `/learn/${topic}`,
        },
        { name: title, href: currentPath },
    ]);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(techJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />
            <ContentLayout sidebarItems={sidebarItems} sidebarTitle={topic}>
                <div className="flex gap-8">
                    <article className="min-w-0 flex-1">
                        <MdxRenderer source={item.source} />
                    </article>
                    {toc.length >= 2 && (
                        <aside className="hidden w-48 shrink-0 xl:block">
                            <div className="sticky top-24">
                                <TableOfContents items={toc} />
                            </div>
                        </aside>
                    )}
                </div>
            </ContentLayout>
        </>
    );
}
