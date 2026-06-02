import React from "react";

interface SectionSkeletonProps {
    variant?: "compact" | "normal" | "generous";
}

const spacingClasses = {
    compact: "py-14",
    normal: "py-20",
    generous: "py-28",
};

export default function SectionSkeleton({
    variant = "normal",
}: SectionSkeletonProps) {
    return (
        <section
            className={`${spacingClasses[variant]} bg-surface`}
            aria-hidden="true"
        >
            <div className="container mx-auto px-8 lg:px-16">
                <div className="mb-10">
                    <div className="mb-3 h-3 w-16 animate-pulse rounded bg-rim" />
                    <div className="h-8 w-48 animate-pulse rounded bg-rim" />
                </div>
                <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded bg-rim" />
                    <div className="h-4 w-5/6 animate-pulse rounded bg-rim" />
                    <div className="h-4 w-4/6 animate-pulse rounded bg-rim" />
                </div>
            </div>
        </section>
    );
}
