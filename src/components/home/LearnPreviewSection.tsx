"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TOPIC_ICONS: Record<string, string> = {
    python: "devicon-python-plain",
    git: "devicon-git-plain",
    sql: "devicon-mysql-plain",
    spss: "devicon-r-plain",
};

interface LearnTopic {
    slug: string;
    title: string;
    pageCount: number;
}

interface LearnPreviewSectionProps {
    topics: LearnTopic[];
}

const LearnPreviewSection: React.FC<LearnPreviewSectionProps> = ({
    topics,
}) => {
    const t = useTranslations("common");
    const lang = useLocale();
    const langPrefix = lang === "th" ? "" : `/${lang}`;
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    const sorted = [...topics].sort((a, b) => b.pageCount - a.pageCount);
    const [featured, ...rest] = sorted;

    if (!featured) return null;

    return (
        <Section spacing="generous">
            {/* Eyebrow */}
            <div className="mb-8">
                <p className="font-sans text-xs tracking-[0.25em] text-accent uppercase">
                    {t("learn.eyebrow")}
                </p>
                <div className="mt-3 h-px w-12 bg-accent opacity-60" />
            </div>

            {/* Bento grid */}
            <div
                ref={ref}
                className={`reveal-stagger grid grid-cols-1 gap-3 md:grid-cols-3 ${isVisible ? "is-revealed" : ""}`}
            >
                {/* Featured topic — full width */}
                <Link
                    href={`${langPrefix}/learn/${featured.slug}`}
                    className="group bg-canvas flex min-h-[200px] flex-col justify-between border border-rim p-8 transition-colors duration-200 hover:border-accent/50 md:col-span-3"
                >
                    <div className="flex items-start gap-6">
                        {TOPIC_ICONS[featured.slug] && (
                            <i
                                className={`${TOPIC_ICONS[featured.slug]} mt-1 text-5xl text-muted/60 transition-colors duration-200 group-hover:text-accent`}
                            />
                        )}
                        <div>
                            <h3 className="text-cream font-serif text-3xl transition-colors duration-200 group-hover:text-accent">
                                {featured.title}
                            </h3>
                            <p className="mt-2 font-sans text-sm text-muted/60">
                                {t("learn.pages_count", {
                                    count: featured.pageCount,
                                })}
                            </p>
                        </div>
                    </div>
                    <div className="mt-6 flex items-center gap-3 self-end text-muted/40 transition-all duration-300 group-hover:text-accent">
                        <span className="font-sans text-xs tracking-widest uppercase">
                            {t("learn.title")}
                        </span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            →
                        </span>
                    </div>
                </Link>

                {/* Remaining topics — vertical cards */}
                {rest.map((topic) => (
                    <Link
                        key={topic.slug}
                        href={`${langPrefix}/learn/${topic.slug}`}
                        className="group bg-canvas flex min-h-[160px] flex-col justify-between border border-rim p-6 transition-colors duration-200 hover:border-accent/50"
                    >
                        <div>
                            {TOPIC_ICONS[topic.slug] && (
                                <i
                                    className={`${TOPIC_ICONS[topic.slug]} mb-4 text-3xl text-muted/40 transition-colors duration-200 group-hover:text-accent`}
                                />
                            )}
                            <h3 className="text-cream font-serif text-xl transition-colors duration-200 group-hover:text-accent">
                                {topic.title}
                            </h3>
                        </div>
                        <p className="mt-4 font-sans text-xs text-muted/50">
                            {t("learn.pages_count", { count: topic.pageCount })}
                        </p>
                    </Link>
                ))}
            </div>

            {/* CTA banner */}
            <Link
                href={`${langPrefix}/learn`}
                className="group bg-canvas mt-3 flex items-center justify-between border border-rim px-8 py-6 transition-all duration-300 hover:border-accent"
            >
                <div>
                    <p className="font-sans text-xs tracking-[0.25em] text-muted uppercase">
                        {t("learn.pages_count", {
                            count: topics.reduce((s, t) => s + t.pageCount, 0),
                        })}
                    </p>
                    <p className="text-cream mt-1 font-serif text-2xl transition-colors duration-200 group-hover:text-accent">
                        {t("learn.title")}
                    </p>
                </div>
                <span className="text-2xl text-muted/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
                    →
                </span>
            </Link>
        </Section>
    );
};

export default LearnPreviewSection;
