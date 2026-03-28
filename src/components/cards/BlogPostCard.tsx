"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Post } from "@/types";

// Define the props interface for the BlogPostCard component
interface BlogPostCardProps extends Post {
    date: string;
    imageUrl: string;
    isLarge?: boolean; // Optional prop to render a larger card layout
    isCompact?: boolean; // Optional prop to render a compact card layout
    isFeatured?: boolean; // Optional prop to indicate if the post is featured
}

// BlogPostCard functional component
const BlogPostCard: React.FC<BlogPostCardProps> = ({
    title,
    excerpt,
    date,
    primary_tag,
    slug,
    imageUrl,
    isLarge = false,
    isCompact = false,
    isFeatured = false,
}) => {
    const t = useTranslations("common");
    // State to handle image loading errors
    const [imageError, setImageError] = useState(false);

    // Conditional rendering for the compact layout
    if (isCompact) {
        return (
            <Link
                href={`/blog/${slug}`}
                className="group flex items-center space-x-4 border-l-2 border-accent p-4 transition-colors duration-200 hover:border-accent"
            >
                <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
                    {/* Render image or a placeholder if image fails to load */}
                    {imageUrl && !imageError ? (
                        <Image
                            src={imageUrl}
                            alt={title}
                            layout="fill"
                            objectFit="cover"
                            className="opacity-90 transition-opacity duration-200 group-hover:opacity-100"
                            onError={() => setImageError(true)}
                        />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center bg-surface text-xs text-muted">
                            {t("no_image_available")}
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    {/* Display date and category */}
                    <p className="mb-1 text-xs text-muted">
                        {date} &bull; {primary_tag?.name}
                    </p>
                    {/* Display post title */}
                    <h3 className="line-clamp-2 text-base font-bold text-cream transition-colors duration-200 group-hover:text-accent">
                        {title}
                    </h3>
                    {/* Display post excerpt */}
                    <p className="line-clamp-3 text-sm text-muted">{excerpt}</p>
                </div>
            </Link>
        );
    }

    // Determine image height, title size, and excerpt line clamp based on isLarge prop
    const imageHeightClass = isLarge ? "h-96" : "h-56";
    const titleSizeClass = isLarge ? "text-4xl" : "text-2xl";
    const excerptLineClampClass = isLarge ? "line-clamp-5" : "line-clamp-3";

    return (
        <Link
            href={`/blog/${slug}`}
            className={`group block overflow-hidden rounded-xl border border-rim bg-surface transition-colors duration-300 hover:border-accent ${isFeatured ? "border-accent" : ""}`}
        >
            <div
                className={`relative w-full overflow-hidden ${imageHeightClass}`}
            >
                {/* Render image or a placeholder if image fails to load */}
                {imageUrl && !imageError ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="opacity-90 transition-opacity duration-300 group-hover:opacity-100"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-surface text-muted">
                        {t("no_image_available")}
                    </div>
                )}
                {/* Featured badge overlay */}
                {isFeatured && (
                    <div className="absolute top-4 left-4 bg-accent px-3 py-1 font-mono text-xs text-canvas">
                        Featured
                    </div>
                )}
            </div>
            <div className="p-6">
                {/* Display date and category */}
                <p className="mb-2 text-sm text-muted">
                    {date} &bull; {primary_tag?.name}
                </p>
                {/* Display post title */}
                <h2
                    className={`mb-3 leading-tight font-bold text-cream transition-colors duration-200 group-hover:text-accent ${titleSizeClass}`}
                >
                    {title}
                </h2>
                {/* Display post excerpt */}
                <p
                    className={`${excerptLineClampClass} text-base leading-relaxed text-muted`}
                >
                    {excerpt}
                </p>
            </div>
        </Link>
    );
};

export default BlogPostCard;
