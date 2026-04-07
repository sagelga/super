import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getLearnTopics, getContentBySlug } from "@/lib/content";
import { generateTechArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { buildSidebarTree } from "@/lib/sidebar";
import ContentLayout from "@/components/content/ContentLayout";
import MdxRenderer from "@/components/content/MdxRenderer";
import { BASE_URL } from "@/lib/config";
const LOCALES = ["en", "th", "zh"];

export async function generateStaticParams() {
    const topics = getLearnTopics();
    return LOCALES.flatMap((lang) =>
        topics.map((t) => ({ lang, topic: t.slug })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ topic: string }>;
}): Promise<Metadata> {
    const { topic } = await params;
    const item = getContentBySlug("learn", [topic]);
    const title = (item?.frontmatter?.title as string) || topic;
    return {
        title,
        openGraph: {
            title,
            url: `${BASE_URL}/learn/${topic}`,
            type: "article",
        },
        alternates: { canonical: `${BASE_URL}/learn/${topic}` },
    };
}

export default async function LearnTopicPage({
    params,
}: {
    params: Promise<{ topic: string }>;
}) {
    const { topic } = await params;
    const item = getContentBySlug("learn", [topic]);
    if (!item) notFound();

    const fm = item.frontmatter as { title?: string };
    const title = fm.title || topic.charAt(0).toUpperCase() + topic.slice(1);
    const sidebarItems = buildSidebarTree("learn", topic);
    const techJsonLd = generateTechArticleJsonLd({
        path: `/learn/${topic}`,
        title,
    });
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Learn", href: "/learn" },
        { name: title, href: `/learn/${topic}` },
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
            <ContentLayout sidebarItems={sidebarItems} sidebarTitle={title}>
                <MdxRenderer source={item.source} />
            </ContentLayout>
        </>
    );
}
