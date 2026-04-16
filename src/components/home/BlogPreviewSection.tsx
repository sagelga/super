"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import type { BlogPost } from "@/lib/content";

interface BlogPreviewSectionProps {
    posts: BlogPost[];
}

const BlogPreviewSection: React.FC<BlogPreviewSectionProps> = ({ posts }) => {
    const t = useTranslations("common");
    const lang = useLocale();
    const langPrefix = lang === "th" ? "" : `/${lang}`;
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    const [featured, ...rest] = posts;

    return (
        <Section spacing="generous">
            {/* Eyebrow */}
            <div className="mb-8">
                <p className="font-sans text-xs tracking-[0.25em] text-accent uppercase">
                    {t("blog.eyebrow")}
                </p>
                <div className="mt-3 h-px w-12 bg-accent opacity-60" />
            </div>

            {/* Bento grid */}
            <div
                ref={ref}
                className={`reveal-stagger grid grid-cols-1 gap-3 md:grid-cols-3 ${isVisible ? "is-revealed" : ""}`}
            >
                {/* Featured post — spans 2 cols + 2 rows */}
                {featured && (
                    <Link
                        href={`${langPrefix}/blog/${featured.slug}`}
                        className="group bg-canvas flex min-h-[280px] flex-col overflow-hidden border border-rim transition-colors duration-200 hover:border-accent/50 md:col-span-2 md:row-span-2"
                    >
                        {featured.image &&
                            (featured.image.startsWith("http") ||
                                featured.image.startsWith("/")) && (
                                <div className="relative h-52 w-full shrink-0 overflow-hidden">
                                    <Image
                                        src={featured.image}
                                        alt={featured.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 66vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                        <div className="flex flex-1 flex-col justify-between p-8">
                            <div>
                                <div className="mb-5 flex flex-wrap items-center gap-3 font-sans text-xs text-muted">
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
                                </div>
                                <h3 className="text-cream font-serif text-2xl leading-snug transition-colors duration-200 group-hover:text-accent md:text-3xl">
                                    {featured.title}
                                </h3>
                                {featured.description && (
                                    <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
                                        {featured.description}
                                    </p>
                                )}
                            </div>
                            {featured.tags && featured.tags.length > 0 && (
                                <div className="mt-6 flex flex-wrap gap-2">
                                    {featured.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="border border-rim px-2 py-0.5 font-sans text-xs text-muted/60"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                )}

                {/* Smaller posts — stack in the right column */}
                {rest.map((post) => (
                    <Link
                        key={post.slug}
                        href={`${langPrefix}/blog/${post.slug}`}
                        className="group bg-canvas flex min-h-[136px] flex-col overflow-hidden border border-rim transition-colors duration-200 hover:border-accent/50"
                    >
                        {post.image &&
                            (post.image.startsWith("http") ||
                                post.image.startsWith("/")) && (
                                <div className="relative h-28 w-full shrink-0 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="33vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                            )}
                        <div className="flex flex-1 flex-col justify-between p-6">
                            <div>
                                {post.date && (
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
                                )}
                                <h3 className="text-cream font-serif text-base leading-snug transition-colors duration-200 group-hover:text-accent">
                                    {post.title}
                                </h3>
                            </div>
                            {post.tags && post.tags.length > 0 && (
                                <p className="mt-3 font-sans text-xs text-muted/50">
                                    {post.tags.slice(0, 2).join(" · ")}
                                </p>
                            )}
                        </div>
                    </Link>
                ))}
            </div>

            {/* CTA banner */}
            <Link
                href={`${langPrefix}/blog`}
                className="group bg-canvas mt-3 flex items-center justify-between border border-rim px-8 py-6 transition-all duration-300 hover:border-accent"
            >
                <div>
                    <p className="font-sans text-xs tracking-[0.25em] text-muted uppercase">
                        {t("blog.posts_count", { count: posts.length })}
                    </p>
                    <p className="text-cream mt-1 font-serif text-2xl transition-colors duration-200 group-hover:text-accent">
                        {t("nav.blog")}
                    </p>
                </div>
                <span className="text-2xl text-muted/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent">
                    →
                </span>
            </Link>
        </Section>
    );
};

export default BlogPreviewSection;
