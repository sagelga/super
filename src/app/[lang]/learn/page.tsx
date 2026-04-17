import { getLearnTopics } from "@/lib/content";
import { generateCollectionPageJsonLd } from "@/lib/seo";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

const LOCALES = ["en", "th", "zh"] as const;

const TOPIC_ICONS: Record<string, string> = {
    python: "devicon-python-plain",
    git: "devicon-git-plain",
    sql: "devicon-mysql-plain",
    spss: "devicon-r-plain",
};

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "common" });
    const canonical =
        lang === "th" ? `${BASE_URL}/learn` : `${BASE_URL}/${lang}/learn`;
    const title = t("nav.learn");
    const description = t("learn.subtitle");

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
                    l === "th" ? `${BASE_URL}/learn` : `${BASE_URL}/${l}/learn`,
                ]),
            ),
        },
    };
}

export default async function LearnPage() {
    const topics = await getLearnTopics();
    const t = await getTranslations("common");

    const jsonLd = generateCollectionPageJsonLd({
        url: "/learn",
        title: "Learn | Kunanon Srisuntiroj",
        items: topics.map((t) => ({ url: `/learn/${t.slug}`, name: t.title })),
    });

    const sorted = [...topics].sort((a, b) => b.pageCount - a.pageCount);
    const [featured, ...rest] = sorted;

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="container mx-auto px-8 py-16 lg:px-16">
                <header className="mb-12">
                    <p className="mb-2 font-sans text-xs font-semibold tracking-widest text-accent uppercase">
                        {t("learn.eyebrow")}
                    </p>
                    <h1 className="text-cream font-serif text-4xl font-semibold">
                        {t("learn.title")}
                    </h1>
                    <p className="mt-3 text-muted">{t("learn.subtitle")}</p>
                </header>
                {featured && (
                    <div className="space-y-4">
                        {/* Featured: largest topic */}
                        <Link
                            href={`/learn/${featured.slug}`}
                            className="group flex items-center gap-6 border border-rim bg-surface p-8 transition-colors duration-200 hover:border-accent/50"
                        >
                            {TOPIC_ICONS[featured.slug] && (
                                <i
                                    className={`${TOPIC_ICONS[featured.slug]} text-5xl text-muted transition-colors group-hover:text-accent`}
                                />
                            )}
                            <div>
                                <h2 className="text-cream mb-1 font-serif text-3xl font-semibold transition-colors group-hover:text-accent">
                                    {featured.title}
                                </h2>
                                <p className="mt-2 font-sans text-sm text-muted/60">
                                    {t("learn.pages_count", {
                                        count: featured.pageCount,
                                    })}
                                </p>
                            </div>
                            <span className="ml-auto text-muted/40 transition-colors group-hover:text-accent">
                                →
                            </span>
                        </Link>
                        {/* Rest in 3-column grid */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                            {rest.map((topic) => (
                                <Link
                                    key={topic.slug}
                                    href={`/learn/${topic.slug}`}
                                    className="group flex items-start gap-3 border border-rim bg-surface p-5 transition-colors duration-200 hover:border-accent/50"
                                >
                                    {TOPIC_ICONS[topic.slug] && (
                                        <i
                                            className={`${TOPIC_ICONS[topic.slug]} text-2xl text-muted transition-colors group-hover:text-accent`}
                                        />
                                    )}
                                    <div>
                                        <h2 className="text-cream mb-1 font-serif text-lg font-semibold transition-colors group-hover:text-accent">
                                            {topic.title}
                                        </h2>
                                        <p className="mt-1 font-sans text-xs text-muted/60">
                                            {t("learn.pages_count", {
                                                count: topic.pageCount,
                                            })}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
