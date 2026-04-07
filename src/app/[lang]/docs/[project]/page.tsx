import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDocProjects, getContentBySlug } from "@/lib/content";
import {
    generateTechArticleJsonLd,
    generateBreadcrumbJsonLd,
    extractTableOfContents,
    estimateReadingTime,
} from "@/lib/seo";
import { buildSidebarTree, getAdjacentDocPages } from "@/lib/sidebar";
import ContentLayout from "@/components/content/ContentLayout";
import MdxRenderer from "@/components/content/MdxRenderer";
import TableOfContents from "@/components/content/TableOfContents";
import DocHeader from "@/components/content/DocHeader";
import ArticleFooterNav from "@/components/content/ArticleFooterNav";
import { BASE_URL } from "@/lib/config";
const LOCALES = ["en", "th", "zh"];

export async function generateStaticParams() {
    const projects = getDocProjects();
    return LOCALES.flatMap((lang) =>
        projects.map((p) => ({ lang, project: p.slug })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ project: string }>;
}): Promise<Metadata> {
    const { project } = await params;
    const item = getContentBySlug("docs", [project]);
    const title = (item?.frontmatter?.title as string) || project;
    return {
        title,
        openGraph: {
            title,
            url: `${BASE_URL}/docs/${project}`,
            type: "article",
        },
        alternates: { canonical: `${BASE_URL}/docs/${project}` },
    };
}

export default async function DocProjectPage({
    params,
}: {
    params: Promise<{ project: string }>;
}) {
    const { project } = await params;
    const item = getContentBySlug("docs", [project]);
    if (!item) notFound();

    const fm = item.frontmatter as { title?: string; description?: string };
    const title = fm.title || project;
    const sidebarItems = buildSidebarTree("docs", project);
    const toc = extractTableOfContents(item.source);
    const readingTime = estimateReadingTime(item.source);
    const currentHref = `/docs/${project}`;
    const { prev, next } = getAdjacentDocPages(currentHref, sidebarItems);

    const techJsonLd = generateTechArticleJsonLd({
        path: `/docs/${project}`,
        title,
        description: fm.description,
    });
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Docs", href: "/docs" },
        { name: title, href: `/docs/${project}` },
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
                <div className="flex gap-12">
                    <article className="min-w-0 flex-1">
                        <DocHeader
                            title={title}
                            description={fm.description}
                            readingTime={readingTime}
                            breadcrumbs={[
                                { label: "Docs", href: "/docs" },
                                { label: title, href: `/docs/${project}` },
                            ]}
                        />
                        <MdxRenderer source={item.source} />
                        <ArticleFooterNav prev={prev} next={next} />
                    </article>
                    {toc.length >= 2 && (
                        <aside className="hidden w-56 shrink-0 xl:block">
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
