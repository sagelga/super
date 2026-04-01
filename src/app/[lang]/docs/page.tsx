import { getDocProjects } from "@/lib/content";
import { generateCollectionPageJsonLd } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";

const BASE_URL = "https://sagelga.com";

export const metadata: Metadata = {
    title: "Documentation",
    description: "Technical documentation for projects by Kunanon Srisuntiroj.",
    openGraph: {
        title: "Documentation | Kunanon Srisuntiroj",
        url: `${BASE_URL}/docs`,
        type: "website",
    },
    alternates: { canonical: `${BASE_URL}/docs` },
};

export default async function DocsPage() {
    const projects = getDocProjects();
    const t = await getTranslations("common");

    const jsonLd = generateCollectionPageJsonLd({
        url: "/docs",
        title: "Documentation | Kunanon Srisuntiroj",
        items: projects.map((p) => ({ url: `/docs/${p.slug}`, name: p.title })),
    });

    const sorted = [...projects].sort((a, b) => b.pageCount - a.pageCount);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-8 py-16 lg:px-16">
                <header className="mb-12">
                    <p className="mb-2 font-sans text-xs font-semibold tracking-widest text-accent uppercase">
                        {t("nav.docs")}
                    </p>
                    <h1 className="font-serif text-4xl font-semibold text-cream">
                        {t("docs.all_projects_title")}
                    </h1>
                    <p className="mt-3 text-muted">
                        {t("docs.documented_projects", {
                            count: projects.length,
                        })}
                    </p>
                </header>
                <div className="space-y-4">
                    {/* Featured top 3 */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                        {sorted.slice(0, 3).map((project) => (
                            <Link
                                key={project.slug}
                                href={`/docs/${project.slug}`}
                                className="group block border border-rim bg-surface p-6 transition-colors duration-200 hover:border-accent/50"
                            >
                                <h2 className="mb-2 font-serif text-xl font-semibold text-cream transition-colors group-hover:text-accent">
                                    {project.title}
                                </h2>
                                {project.description && (
                                    <p className="mb-3 line-clamp-3 text-sm text-muted">
                                        {project.description}
                                    </p>
                                )}
                                <p className="font-sans text-xs text-accent/70">
                                    {t("docs.pages_count", {
                                        count: project.pageCount,
                                    })}
                                </p>
                            </Link>
                        ))}
                    </div>
                    {/* Remaining in compact 4-column grid */}
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {sorted.slice(3).map((project) => (
                            <Link
                                key={project.slug}
                                href={`/docs/${project.slug}`}
                                className="group block border border-rim bg-surface px-4 py-3 transition-colors duration-200 hover:border-accent/50"
                            >
                                <h2 className="font-serif text-sm font-semibold text-cream transition-colors group-hover:text-accent">
                                    {project.title}
                                </h2>
                                <p className="mt-1 font-sans text-xs text-muted/50">
                                    {t("docs.pages_count", {
                                        count: project.pageCount,
                                    })}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
