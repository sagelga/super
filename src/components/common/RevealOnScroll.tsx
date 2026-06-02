"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealOnScrollProps {
    children: ReactNode;
    className?: string;
    /** Add `reveal-stagger` class for staggered children reveal */
    stagger?: boolean;
    /** Threshold for IntersectionObserver */
    threshold?: number;
}

/**
 * Single shared IntersectionObserver for the home page. Replaces 10+ per-section
 * observers in useScrollReveal — one observer watches every registered target
 * via a ref pool, then unobserves once revealed.
 */
const observerByRootMargin = new Map<string, IntersectionObserver>();

function getObserver(rootMargin: string): IntersectionObserver {
    let observer = observerByRootMargin.get(rootMargin);
    if (!observer) {
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        el.classList.add("is-revealed");
                        observer!.unobserve(el);
                    }
                }
            },
            { threshold: 0.08, rootMargin },
        );
        observerByRootMargin.set(rootMargin, observer);
    }
    return observer;
}

export default function RevealOnScroll({
    children,
    className = "",
    stagger = false,
    threshold = 0.08,
}: RevealOnScrollProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = getObserver("0px 0px -40px 0px");
        if (threshold !== 0.08) {
            const customObserver = new IntersectionObserver(
                (entries) => {
                    for (const entry of entries) {
                        if (entry.isIntersecting) {
                            const target = entry.target as HTMLElement;
                            target.classList.add("is-revealed");
                            customObserver.unobserve(target);
                        }
                    }
                },
                { threshold, rootMargin: "0px 0px -40px 0px" },
            );
            customObserver.observe(el);
            return () => customObserver.disconnect();
        }
        observer.observe(el);
        return () => observer.unobserve(el);
    }, [threshold]);

    const baseClass = stagger ? "reveal-stagger" : "reveal";
    return (
        <div ref={ref} className={`${baseClass} ${className}`.trim()}>
            {children}
        </div>
    );
}
