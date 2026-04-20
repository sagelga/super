"use client";

import React from "react";
import type { SectionProps } from "@/types";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    sectionNumber,
    children,
    className = "",
    id,
    variant = "surface",
    spacing = "normal",
}) => {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
    const revealed = isVisible ? "is-revealed" : "";

    return (
        <section
            id={id}
            className={`${spacingClasses[spacing]} ${variant === "canvas" ? "bg-canvas" : "bg-surface"} ${className}`}
        >
            <div className="container mx-auto px-8 lg:px-16">
                {title && headingVariant === "default" && (
                    <div ref={ref} className={`reveal-stagger mb-14 ${revealed}`}>
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
                        <div
                            className={`h-px w-12 origin-left bg-accent opacity-60 transition-transform duration-500 ease-out ${
                                isVisible ? "scale-x-100" : "scale-x-0"
                            }`}
                            style={{ transitionDelay: isVisible ? "220ms" : "0ms" }}
                        />
                    </div>
                )}
                {title && headingVariant === "display" && (
                    <div ref={ref} className={`reveal-stagger mb-16 ${revealed}`}>
                        <div className="flex items-center gap-3">
                            <div
                                className={`h-px w-8 flex-shrink-0 origin-left bg-accent transition-transform duration-500 ease-out ${
                                    isVisible ? "scale-x-100" : "scale-x-0"
                                }`}
                            />
                            <span className="text-xs leading-none text-accent">
                                ✦
                            </span>
                            <div className="flex items-baseline gap-3">
                                <h2 className="text-cream font-serif text-5xl font-bold">
                                    {title}
                                </h2>
                                {sectionNumber && (
                                    <span className="font-sans text-sm text-muted">
                                        {sectionNumber}
                                    </span>
                                )}
                            </div>
                        </div>
                        {subtitle && (
                            <p className="mt-3 ml-16 font-serif text-muted italic">
                                {subtitle}
                            </p>
                        )}
                    </div>
                )}
                {title && headingVariant === "minimal" && (
                    <div ref={ref} className={`reveal-stagger mb-10 ${revealed}`}>
                        <p className="font-sans text-xs font-bold tracking-[0.2em] text-muted/70 uppercase">
                            {title}
                        </p>
                        <div
                            className={`mt-3 h-px w-6 origin-left bg-rim transition-transform duration-500 ease-out ${
                                isVisible ? "scale-x-100" : "scale-x-0"
                            }`}
                            style={{ transitionDelay: isVisible ? "180ms" : "0ms" }}
                        />
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
