import React from "react";
import type { SectionProps } from "@/types";

const spacingClasses = {
    compact: "py-14",
    normal: "py-20",
    generous: "py-28",
};

const Section: React.FC<SectionProps> = ({
    title,
    children,
    className = "",
    id,
    darkBg = true,
    spacing = "normal",
}) => {
    return (
        <section
            id={id}
            className={`${spacingClasses[spacing]} ${darkBg ? "bg-surface" : "bg-canvas"} ${className}`}
        >
            <div className="container mx-auto px-8 lg:px-16">
                {title && (
                    <div className="mb-14">
                        <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-accent">
                            {title}
                        </p>
                        <div className="h-px w-12 bg-accent opacity-60" />
                    </div>
                )}
                {children}
            </div>
        </section>
    );
};

export default Section;
