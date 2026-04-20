"use client";

import React from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import PreviewCard from "./PreviewCard";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { BlogPost } from "@/lib/content";

interface BlogPreviewSectionProps {
    readonly posts: BlogPost[];
}

const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ posts }) => {
    const t = useTranslations("common");
    const lang = useLocale();
    const langPrefix = lang === "th" ? "" : `/${lang}`;
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    const [featured, ...rest] = posts;

    return (
        <Section
            spacing="generous"
            title={t("blog.eyebrow")}
            headingVariant="display"
            sectionNumber="07"
        >
            {/* Bento grid */}
            <div
                ref={ref}
                className={`reveal-stagger grid grid-cols-1 gap-3 md:grid-cols-3 ${isVisible ? "is-revealed" : ""}`}
            >
                {/* Featured post */}
                {featured && (
                    <PreviewCard
                        variant="featured"
                        href={`${langPrefix}/blog/${featured.slug}`}
                        title={featured.title}
                        media={
                            featured.image &&
                            (featured.image.startsWith("http") ||
                                featured.image.startsWith("/"))
                                ? {
                                      kind: "image" as const,
                                      src: featured.image,
                                      alt: featured.title,
                                  }
                                : undefined
                        }
                        description={featured.description}
                        eyebrow={
                            featured.date || featured.readingTime ? (
                                <>
                                    {featured.date && (
                                        <span>
                                            {new Date(
                                                featured.date,
                                            ).toLocaleDateString(lang, {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                            })}
                                        </span>
                                    )}
                                    {featured.readingTime && (
                                        <>
                                            <span className="text-rim">·</span>
                                            <span>{featured.readingTime}</span>
                                        </>
                                    )}
                                </>
                            ) : undefined
                        }
                        tags={featured.tags}
                    />
                )}

                {/* Smaller posts */}
                {rest.map((post) => (
                    <PreviewCard
                        key={post.slug}
                        variant="compact"
                        href={`${langPrefix}/blog/${post.slug}`}
                        title={post.title}
                        media={
                            post.image &&
                            (post.image.startsWith("http") ||
                                post.image.startsWith("/"))
                                ? {
                                      kind: "image" as const,
                                      src: post.image,
                                      alt: post.title,
                                  }
                                : undefined
                        }
                        eyebrow={
                            post.date ? (
                                <p className="mb-3 font-sans text-xs text-muted">
                                    {new Date(post.date).toLocaleDateString(
                                        lang,
                                        {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                        },
                                    )}
                                </p>
                            ) : undefined
                        }
                        tags={post.tags}
                    />
                ))}
            </div>

            {/* CTA banner */}
            <Link
                href={`${langPrefix}/blog`}
                className="group card-lift bg-canvas relative mt-3 flex items-center justify-between overflow-hidden border border-rim px-8 py-6"
            >
                {/* Amber trail — expands from left on hover */}
                <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 left-0 w-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <div className="relative">
                    <p className="font-sans text-xs tracking-[0.25em] text-muted uppercase transition-colors duration-300 group-hover:text-accent/80">
                        {t("blog.posts_count", { count: posts.length })}
                    </p>
                    <p className="text-cream mt-1 font-serif text-2xl transition-colors duration-200 group-hover:text-accent">
                        {t("nav.blog")}
                    </p>
                </div>
                <span className="relative flex items-center text-2xl text-muted/40 transition-all duration-300 group-hover:translate-x-2 group-hover:text-accent">
                    →
                </span>
            </Link>
        </Section>
    );
};

export default BlogPreviewSection;
