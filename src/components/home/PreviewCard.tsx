"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";

export interface PreviewCardProps {
    readonly variant: "featured" | "compact";
    readonly href: string;
    readonly title: string;
    readonly media?:
        | { readonly kind: "image"; readonly src: string; readonly alt: string }
        | { readonly kind: "icon"; readonly className: string };
    readonly description?: string;
    readonly eyebrow?: ReactNode;
    readonly meta?: ReactNode;
    readonly tags?: string[];
    readonly className?: string;
}

const PreviewCard: React.FC<PreviewCardProps> = ({
    variant,
    href,
    title,
    media,
    description,
    eyebrow,
    meta,
    tags,
    className,
}) => {
    const isFeatured = variant === "featured";
    const isIconFeatured = isFeatured && media?.kind === "icon";

    const baseClasses =
        "group card-lift press-down bg-canvas flex overflow-hidden border border-rim";
    const sizeClasses = isIconFeatured
        ? "min-h-[200px] flex-col md:col-span-3"
        : isFeatured
          ? "min-h-[280px] flex-col md:col-span-2 md:row-span-2"
          : "min-h-[136px] flex-col";

    return (
        <Link
            href={href}
            className={`${baseClasses} ${sizeClasses} ${className || ""}`}
        >
            {/* Media (image for non-icon featured) */}
            {media && media.kind === "image" && (
                <div
                    className={`relative shrink-0 overflow-hidden ${
                        isFeatured ? "h-52 w-full" : "h-28 w-full"
                    }`}
                >
                    <Image
                        src={media.src}
                        alt={media.alt}
                        fill
                        sizes={
                            isFeatured
                                ? "(max-width: 768px) 100vw, 66vw"
                                : "33vw"
                        }
                        className={
                            isFeatured
                                ? "ken-burns object-cover"
                                : "object-cover transition-transform duration-500 group-hover:scale-105"
                        }
                    />
                </div>
            )}

            {/* Content wrapper */}
            <div
                className={`flex flex-1 flex-col justify-between ${
                    isFeatured ? "p-8" : "p-6"
                }`}
            >
                <div>
                    {/* Eyebrow metadata (featured image variant) */}
                    {isFeatured && !isIconFeatured && eyebrow && (
                        <div className="mb-5 flex flex-wrap items-center gap-3 font-sans text-xs text-muted">
                            {eyebrow}
                        </div>
                    )}

                    {/* Icon for compact variant */}
                    {!isFeatured && media && media.kind === "icon" && (
                        <i
                            className={`${media.className} mb-4 text-3xl text-muted/40 transition-colors duration-200 group-hover:text-accent`}
                        />
                    )}

                    {/* Icon featured variant (inline layout) */}
                    {isIconFeatured && (
                        <div className="flex items-start gap-6">
                            <i
                                className={`${media.className} mt-1 shrink-0 text-5xl text-muted/60 transition-colors duration-200 group-hover:text-accent`}
                            />
                            <div className="min-w-0">
                                <h3 className="text-cream font-serif text-3xl transition-colors duration-200 group-hover:text-accent">
                                    {title}
                                </h3>
                                {eyebrow && (
                                    <span className="mt-2 block font-sans text-sm text-muted/60">
                                        {eyebrow}
                                    </span>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Title and description (image variant) */}
                    {!isIconFeatured && (
                        <>
                            <h3
                                className={`text-cream font-serif transition-colors duration-200 group-hover:text-accent ${
                                    isFeatured
                                        ? "text-2xl leading-snug md:text-3xl"
                                        : "text-base leading-snug"
                                }`}
                            >
                                {title}
                            </h3>
                            {description && (
                                <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted">
                                    {description}
                                </p>
                            )}
                        </>
                    )}

                    {/* Compact metadata */}
                    {!isFeatured && meta && (
                        <p className="mt-4 font-sans text-xs text-muted/50">
                            {meta}
                        </p>
                    )}
                </div>

                {/* Tags (featured image variant only) */}
                {isFeatured && !isIconFeatured && tags && tags.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                        {tags.map((tag) => (
                            <span
                                key={tag}
                                className="border border-rim px-2 py-0.5 font-sans text-xs text-muted/60"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* Compact tags */}
                {!isFeatured && tags && tags.length > 0 && (
                    <p className="mt-3 font-sans text-xs text-muted/50">
                        {tags.slice(0, 2).join(" · ")}
                    </p>
                )}
            </div>

            {/* Icon featured footer (Learn variant only) */}
            {isIconFeatured && meta && (
                <div className="flex items-center gap-3 px-8 pb-8 text-muted/40 transition-all duration-300 group-hover:text-accent">
                    <span className="font-sans text-xs tracking-widest uppercase">
                        {meta}
                    </span>
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </div>
            )}
        </Link>
    );
};

export default PreviewCard;
