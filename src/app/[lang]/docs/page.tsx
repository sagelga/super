import { getDocProjects } from "@/lib/content";
import { generateCollectionPageJsonLd } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

const LOCALES = ["en", "th", "zh"] as const;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "common" });
    const canonical =
        lang === "th" ? `${BASE_URL}/docs` : `${BASE_URL}/${lang}/docs`;
    const title = t("nav.docs");
    const description = t("docs.sidebar_title");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonical,
            type: "website",
        },
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((l) => [
                    l,
                    l === "th" ? `${BASE_URL}/docs` : `${BASE_URL}/${l}/docs`,
                ]),
            ),
        },
    };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default async function DocsPage() {
    const projects = await getDocProjects();
    const t = await getTranslations("common");

    const jsonLd = generateCollectionPageJsonLd({
        url: "/docs",
        title: "Documentation | Kunanon Srisuntiroj",
        items: projects.map((p) => ({ url: `/docs/${p.slug}`, name: p.title })),
    });

    const sorted = [...projects].sort((a, b) => b.pageCount - a.pageCount);
    const featured = sorted.slice(0, 5);
    const rest = sorted.slice(5);

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
                    <h1 className="text-text font-serif text-4xl font-semibold">
                        {t("docs.all_projects_title")}
                    </h1>
                    <p className="mt-3 max-w-lg text-muted">
                        {t("docs.subtitle", { count: projects.length })}
                    </p>
                </header>

                {/* Bento featured section — top 5 by page count */}
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    {featured.map((project, i) => {
                        const isHero = i === 0;
                        return (
                            <Link
                                key={project.slug}
                                href={`/docs/${project.slug}`}
                                className={[
                                    "group relative overflow-hidden border border-rim bg-surface",
                                    "flex flex-col transition-all duration-300",
                                    "hover:border-accent/50 hover:shadow-[0_4px_32px_-8px_rgba(201,148,58,0.12)]",
                                    isHero
                                        ? "min-h-[220px] p-8 md:col-span-2"
                                        : "min-h-[160px] p-6",
                                ].join(" ")}
                            >
                                {/* Decorative large ordinal */}
                                <span
                                    className={[
                                        "text-cream/[0.03] pointer-events-none absolute font-serif leading-none select-none",
                                        isHero
                                            ? "-right-4 -bottom-6 text-[140px]"
                                            : "-right-3 -bottom-4 text-[90px]",
                                    ].join(" ")}
                                    aria-hidden="true"
                                >
                                    {pad(i + 1)}
                                </span>

                                {/* Hero-only decorative arrow — brightens on hover */}
                                {isHero && (
                                    <span
                                        className="pointer-events-none absolute right-8 bottom-6 font-serif text-[72px] leading-none text-accent/[0.06] transition-colors duration-300 select-none group-hover:text-accent/[0.15]"
                                        aria-hidden="true"
                                    >
                                        →
                                    </span>
                                )}

                                <p className="mb-2 font-sans text-[10px] font-semibold tracking-widest text-accent/70 uppercase">
                                    {t("docs.pages_count", {
                                        count: project.pageCount,
                                    })}
                                </p>
                                <h2
                                    className={[
                                        "text-text font-serif font-semibold transition-colors duration-200 group-hover:text-accent",
                                        isHero
                                            ? "mb-3 text-2xl md:text-3xl"
                                            : "mb-2 text-lg",
                                    ].join(" ")}
                                >
                                    {project.title}
                                </h2>
                                {project.description && (
                                    <p
                                        className={[
                                            "flex-1 text-sm text-muted",
                                            isHero
                                                ? "line-clamp-4"
                                                : "line-clamp-2",
                                        ].join(" ")}
                                    >
                                        {project.description}
                                    </p>
                                )}
                                {isHero ? (
                                    <div className="mt-6 flex -translate-x-1 items-center gap-1.5 font-sans text-xs text-accent/0 transition-all duration-200 group-hover:translate-x-0 group-hover:text-accent/80">
                                        Read the docs <span>→</span>
                                    </div>
                                ) : (
                                    <span className="mt-3 font-sans text-xs text-accent/0 transition-colors duration-200 group-hover:text-accent/70">
                                        →
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Compact numbered list — remaining projects */}
                {rest.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {rest.map((project, i) => (
                            <Link
                                key={project.slug}
                                href={`/docs/${project.slug}`}
                                className="group flex min-h-[64px] items-center gap-3 border border-rim bg-surface px-4 py-3 transition-all duration-200 hover:border-accent/50"
                            >
                                <span className="w-6 shrink-0 font-sans text-xs text-accent/40 tabular-nums transition-colors duration-200 group-hover:text-accent/70">
                                    {pad(featured.length + i + 1)}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-text truncate font-serif text-sm font-semibold transition-colors duration-200 group-hover:text-accent">
                                        {project.title}
                                    </p>
                                    <p className="font-sans text-xs text-muted/70">
                                        {t("docs.pages_count", {
                                            count: project.pageCount,
                                        })}
                                    </p>
                                </div>
                                <span className="shrink-0 font-sans text-xs text-muted/0 transition-colors duration-200 group-hover:text-accent/60">
                                    →
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
