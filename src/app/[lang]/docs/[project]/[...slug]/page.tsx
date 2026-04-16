import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDocProjects, getAllSlugs, getContentBySlug } from "@/lib/content";
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
    const projects = await getDocProjects();
    const allSlugs = await getAllSlugs("docs");
    const contentParams: { project: string; slug: string[] }[] = [];
    for (const p of projects) {
        const slugs = allSlugs.filter((s) => s[0] === p.slug && s.length > 1);
        for (const slug of slugs) {
            contentParams.push({ project: p.slug, slug: slug.slice(1) });
        }
    }
    return LOCALES.flatMap((lang) =>
        contentParams.map((p) => ({ lang, ...p })),
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ project: string; slug: string[] }>;
}): Promise<Metadata> {
    const { project, slug } = await params;
    const item = await getContentBySlug("docs", [project, ...slug]);
    const title =
        (item?.frontmatter?.title as string) ||
        slug[slug.length - 1] ||
        project;
    const canonical = `${BASE_URL}/docs/${project}/${slug.join("/")}`;
    return {
        title,
        openGraph: { title, url: canonical, type: "article" },
        alternates: { canonical },
    };
}

export default async function DocPage({
    params,
}: {
    params: Promise<{ project: string; slug: string[] }>;
}) {
    const { project, slug } = await params;
    const item = await getContentBySlug("docs", [project, ...slug]);
    if (!item) notFound();

    const fm = item.frontmatter as { title?: string; description?: string };
    const title = fm.title || slug[slug.length - 1] || project;
    const sidebarItems = await buildSidebarTree("docs", project);
    const toc = extractTableOfContents(item.source);
    const readingTime = estimateReadingTime(item.source);
    const currentPath = `/docs/${project}/${slug.join("/")}`;
    const { prev, next } = getAdjacentDocPages(currentPath, sidebarItems);

    const techJsonLd = generateTechArticleJsonLd({
        path: currentPath,
        title,
        description: fm.description,
    });
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Docs", href: "/docs" },
        { name: project, href: `/docs/${project}` },
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
            <ContentLayout sidebarItems={sidebarItems} sidebarTitle={project}>
                <div className="flex gap-12">
                    <article className="min-w-0 flex-1">
                        <DocHeader
                            title={title}
                            description={fm.description}
                            readingTime={readingTime}
                            breadcrumbs={[
                                { label: "Docs", href: "/docs" },
                                { label: project, href: `/docs/${project}` },
                                { label: title, href: currentPath },
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
