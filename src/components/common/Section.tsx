import React from "react";
import type { SectionProps } from "@/types";

const spacingClasses = {
    compact: "py-14",
    normal: "py-20",
    generous: "py-28",
    spacious: "py-36",
};

const Section: React.FC<SectionProps> = ({
    title,
    subtitle,
    headingVariant = "default",
    children,
    className = "",
    id,
    variant = "surface",
    spacing = "normal",
}) => {
    return (
        <section
            id={id}
            className={`${spacingClasses[spacing]} ${variant === "canvas" ? "bg-canvas" : "bg-surface"} ${className}`}
        >
            <div className="container mx-auto px-8 lg:px-16">
                {title && headingVariant === "default" && (
                    <div className="mb-14">
                        <div className="mb-3 flex items-baseline gap-4">
                            <p className="font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase">
                                {title}
                            </p>
                            {subtitle && (
                                <span className="font-sans text-xs text-muted">
                                    {subtitle}
                                </span>
                            )}
                        </div>
                        <div className="h-px w-12 bg-accent opacity-60" />
                    </div>
                )}
                {title && headingVariant === "minimal" && (
                    <div className="mb-10">
                        <p className="font-sans text-xs font-bold tracking-[0.2em] text-muted/70 uppercase">
                            {title}
                        </p>
                        <div className="mt-3 h-px w-6 bg-rim" />
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
