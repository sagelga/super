import React from "react";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import Section from "../common/Section";
import RevealOnScroll from "../common/RevealOnScroll";
import "@/styles/devicons.css";

const TOPIC_ICONS: Record<string, string> = {
    python: "devicon-python-plain",
    git: "devicon-git-plain",
    sql: "devicon-mysql-plain",
    spss: "devicon-r-plain",
    "data-structures": "devicon-c-plain",
};

interface LearnTopic {
    slug: string;
    title: string;
    pageCount: number;
}

interface LearnPreviewSectionProps {
    topics: LearnTopic[];
}

const LearnPreviewSection: React.FC<LearnPreviewSectionProps> = async ({
    topics,
}) => {
    const t = await getTranslations("common");
    const lang = await getLocale();
    const langPrefix = lang === "th" ? "" : `/${lang}`;

    const sorted = [...topics].sort((a, b) => b.pageCount - a.pageCount);
    if (sorted.length === 0) return null;

    const totalPages = sorted.reduce((sum, topic) => sum + topic.pageCount, 0);

    return (
        <Section spacing="generous" title={t("learn.eyebrow")}>
            <RevealOnScroll stagger>
                <ol className="border-t border-rim/60">
                    {sorted.map((topic, index) => (
                        <li key={topic.slug} className="border-b border-rim/60">
                            <Link
                                href={`${langPrefix}/learn/${topic.slug}`}
                                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-6 py-7 md:gap-10 md:py-9"
                            >
                                <span
                                    aria-hidden
                                    className="absolute inset-y-0 left-0 w-0 bg-accent/[0.06] transition-all duration-500 ease-out group-hover:w-full"
                                />

                                <span className="relative font-sans text-xs tracking-[0.3em] text-accent/70 tabular-nums">
                                    {String(index + 1).padStart(2, "0")}
                                </span>

                                <div className="relative flex items-baseline gap-4">
                                    <h3 className="font-serif text-2xl leading-none text-cream transition-colors duration-200 group-hover:text-accent md:text-3xl lg:text-4xl">
                                        {topic.title}
                                    </h3>
                                    <span className="hidden flex-1 translate-y-[-0.3em] border-b border-dotted border-rim transition-colors duration-300 group-hover:border-accent/50 md:block" />
                                    <span className="hidden font-sans text-xs tracking-[0.18em] text-muted-readable uppercase md:inline">
                                        {t("learn.pages_count", {
                                            count: topic.pageCount,
                                        })}
                                    </span>
                                </div>

                                <div className="relative flex items-center gap-4">
                                    {TOPIC_ICONS[topic.slug] && (
                                        <i
                                            aria-hidden="true"
                                            className={`${TOPIC_ICONS[topic.slug]} text-2xl text-muted/60 transition-colors duration-200 group-hover:text-accent md:text-3xl`}
                                        />
                                    )}
                                    <span aria-hidden="true" className="font-sans text-base text-muted/40 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent">
                                        →
                                    </span>
                                </div>

                                <span className="relative col-start-2 -mt-5 font-sans text-xs tracking-[0.18em] text-muted-readable uppercase md:hidden">
                                    {t("learn.pages_count", {
                                        count: topic.pageCount,
                                    })}
                                </span>
                            </Link>
                        </li>
                    ))}
                </ol>

                <Link
                    href={`${langPrefix}/learn`}
                    className="group mt-10 inline-flex items-center gap-3 font-sans text-xs tracking-[0.25em] text-muted-readable uppercase transition-colors duration-200 hover:text-accent"
                >
                    <span className="h-px w-8 bg-accent/60 transition-all duration-300 group-hover:w-12 group-hover:bg-accent" />
                    <span>
                        {t("learn.pages_count", { count: totalPages })} ·{" "}
                        {t("learn.title")}
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </Link>
            </RevealOnScroll>
        </Section>
    );
};

export default LearnPreviewSection;
