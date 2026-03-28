"use client";

import React from "react";
import Link from "next/link";

// BaseCard Props
interface BaseCardProps {
    children: React.ReactNode;
    href?: string;
    className?: string;
    variant?: "default" | "featured" | "compact";
    onClick?: () => void;
    imageUrl?: string;
    imageAlt?: string;
    imageHeight?: "sm" | "md" | "lg" | "xl";
    showImagePlaceholder?: boolean;
}

// Image placeholder for when image fails or is not provided
const ImagePlaceholder: React.FC<{ text?: string }> = ({
    text = "No image",
}) => (
    <div className="flex h-full w-full items-center justify-center bg-surface text-sm text-muted">
        {text}
    </div>
);

// BaseCard Component - A reusable card wrapper with consistent styling
export const BaseCard: React.FC<BaseCardProps> = ({
    children,
    href,
    className = "",
    variant = "default",
    onClick,
}) => {
    const baseClasses =
        "group block transform overflow-hidden rounded-xl bg-surface shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl";

    const variantClasses = {
        default: "",
        featured: "bg-brand-900",
        compact: "p-4",
    };

    const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

    if (href) {
        return (
            <Link href={href} className={combinedClasses}>
                {children}
            </Link>
        );
    }

    if (onClick) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${combinedClasses} w-full cursor-pointer text-left`}
            >
                {children}
            </button>
        );
    }

    return <div className={combinedClasses}>{children}</div>;
};

// CardImage Component - Consistent image styling with fallback
interface CardImageProps {
    src?: string;
    alt: string;
    height?: "sm" | "md" | "lg" | "xl";
    className?: string;
    onError?: () => void;
    error?: boolean;
}

export const CardImage: React.FC<CardImageProps> = ({
    src,
    alt,
    height = "md",
    className = "",
    onError,
    error = false,
}) => {
    const heightClasses = {
        sm: "h-20",
        md: "h-48",
        lg: "h-56",
        xl: "h-96",
    };

    return (
        <div
            className={`relative w-full overflow-hidden ${heightClasses[height]}`}
        >
            {src && !error ? (
                <img
                    src={src}
                    alt={alt}
                    className={`h-full w-full object-cover transition-transform duration-300 group-hover:scale-105 ${className}`}
                    onError={onError}
                />
            ) : (
                <ImagePlaceholder />
            )}
        </div>
    );
};

// CardContent Component - Consistent content padding
interface CardContentProps {
    children: React.ReactNode;
    className?: string;
    padding?: "none" | "sm" | "md" | "lg";
}

export const CardContent: React.FC<CardContentProps> = ({
    children,
    className = "",
    padding = "md",
}) => {
    const paddingClasses = {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
    };

    return (
        <div className={`${paddingClasses[padding]} ${className}`}>
            {children}
        </div>
    );
};

// CardFooter Component - For CTAs and metadata
interface CardFooterProps {
    children: React.ReactNode;
    className?: string;
}

export const CardFooter: React.FC<CardFooterProps> = ({
    children,
    className = "",
}) => (
    <div
        className={`text-brand-400 mt-4 flex items-center p-6 pt-0 font-semibold group-hover:underline ${className}`}
    >
        {children}
    </div>
);

// CardMeta Component - For dates, categories, tags
interface CardMetaProps {
    children: React.ReactNode;
    className?: string;
}

export const CardMeta: React.FC<CardMetaProps> = ({
    children,
    className = "",
}) => <p className={`mb-2 text-sm text-muted ${className}`}>{children}</p>;

export default BaseCard;
