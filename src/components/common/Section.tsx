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
                    <header className="mb-14">
                        <h2 className="font-display text-3xl leading-[1.1] tracking-tight text-text md:text-4xl lg:text-5xl">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="mt-4 font-sans text-xs font-semibold tracking-[0.2em] text-accent/80 uppercase">
                                {subtitle}
                            </p>
                        )}
                        <div className="mt-6 h-px w-16 bg-accent opacity-70" />
                    </header>
                )}
                {title && headingVariant === "minimal" && (
                    <header className="mb-10">
                        <h2 className="font-display text-2xl leading-tight text-text md:text-3xl">
                            {title}
                        </h2>
                        {subtitle && (
                            <p className="mt-2 font-sans text-xs font-semibold tracking-[0.18em] text-muted uppercase">
                                {subtitle}
                            </p>
                        )}
                        <div className="mt-5 h-px w-10 bg-accent/60" />
                    </header>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
