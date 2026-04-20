"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import PreviewCard from "./PreviewCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const TOPIC_ICONS: Record<string, string> = {
    python: "devicon-python-plain",
    git: "devicon-git-plain",
    sql: "devicon-mysql-plain",
    spss: "devicon-r-plain",
};

interface LearnTopic {
    readonly slug: string;
    readonly title: string;
    readonly pageCount: number;
}

interface LearnPreviewSectionProps {
    readonly topics: LearnTopic[];
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
        <Section
            spacing="generous"
            title={t("learn.eyebrow")}
            headingVariant="display"
            sectionNumber="09"
        >
            {/* Bento grid */}
            <div
                ref={ref}
                className={`reveal-stagger grid grid-cols-1 gap-3 md:grid-cols-3 ${isVisible ? "is-revealed" : ""}`}
            >
                {/* Featured topic */}
                <PreviewCard
                    variant="featured"
                    href={`${langPrefix}/learn/${featured.slug}`}
                    title={featured.title}
                    media={
                        TOPIC_ICONS[featured.slug]
                            ? {
                                  kind: "icon" as const,
                                  className: TOPIC_ICONS[featured.slug],
                              }
                            : undefined
                    }
                    meta={t("learn.title")}
                    className="md:col-span-3"
                    eyebrow={
                        <span className="mt-2 font-sans text-sm text-muted/60">
                            {t("learn.pages_count", {
                                count: featured.pageCount,
                            })}
                        </span>
                    }
                />

                {/* Remaining topics */}
                {rest.map((topic) => (
                    <PreviewCard
                        key={topic.slug}
                        variant="compact"
                        href={`${langPrefix}/learn/${topic.slug}`}
                        title={topic.title}
                        media={
                            TOPIC_ICONS[topic.slug]
                                ? {
                                      kind: "icon" as const,
                                      className: TOPIC_ICONS[topic.slug],
                                  }
                                : undefined
                        }
                        meta={t("learn.pages_count", {
                            count: topic.pageCount,
                        })}
                    />
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
