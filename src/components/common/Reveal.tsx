"use client";

import React from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type RevealVariant = "default" | "scale";
type RevealTag = "div" | "section" | "article" | "header" | "footer" | "ul" | "ol";

interface RevealProps {
    readonly children: React.ReactNode;
    readonly as?: RevealTag;
    readonly variant?: RevealVariant;
    readonly className?: string;
    readonly threshold?: number;
    readonly rootMargin?: string;
    readonly delayMs?: number;
}

export const Reveal: React.FC<RevealProps> = ({
    children,
    as = "div",
    variant = "default",
    className = "",
    threshold,
    rootMargin,
    delayMs,
}) => {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>(
        threshold,
        rootMargin,
    );

    const baseClass = variant === "scale" ? "reveal-scale" : "reveal";
    const stateClass = isVisible ? "is-revealed" : "";
    const combined = `${baseClass} ${stateClass} ${className}`.trim();
    const style = delayMs ? { transitionDelay: `${delayMs}ms` } : undefined;

    const Tag = as as React.ElementType;
    return (
        <Tag ref={ref} className={combined} style={style}>
            {children}
        </Tag>
    );
};

interface StaggerGroupProps {
    readonly children: React.ReactNode;
    readonly as?: RevealTag;
    readonly variant?: RevealVariant;
    readonly className?: string;
    readonly threshold?: number;
    readonly rootMargin?: string;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
    children,
    as = "div",
    variant = "default",
    className = "",
    threshold,
    rootMargin,
}) => {
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>(
        threshold,
        rootMargin,
    );

    const variantClass = variant === "scale" ? "reveal-scale" : "";
    const stateClass = isVisible ? "is-revealed" : "";
    const combined =
        `reveal-stagger ${variantClass} ${stateClass} ${className}`.trim();

    const Tag = as as React.ElementType;
    return (
        <Tag ref={ref} className={combined}>
            {children}
        </Tag>
    );
};
