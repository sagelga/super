import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDocProjects, getContentBySlug } from "@/lib/content";
import { generateTechArticleJsonLd, generateBreadcrumbJsonLd } from "@/lib/seo";
import { buildSidebarTree } from "@/lib/sidebar";
import ContentLayout from "@/components/content/ContentLayout";
import MdxRenderer from "@/components/content/MdxRenderer";

const BASE_URL = "https://sagelga.com";
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
    const sidebarItems = buildSidebarTree("docs", project);
    const techJsonLd = generateTechArticleJsonLd({
        path: `/docs/${project}`,
        title: fm.title || project,
        description: fm.description,
    });
    const breadcrumbJsonLd = generateBreadcrumbJsonLd([
        { name: "Home", href: "/" },
        { name: "Docs", href: "/docs" },
        { name: fm.title || project, href: `/docs/${project}` },
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
            <ContentLayout
                sidebarItems={sidebarItems}
                sidebarTitle={fm.title || project}
            >
                <MdxRenderer source={item.source} />
            </ContentLayout>
        </>
    );
}
