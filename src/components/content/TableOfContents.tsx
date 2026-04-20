"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { TocItem } from "@/lib/seo";

interface TableOfContentsProps {
    items: TocItem[];
}

// Use layout effect on client, fall back to regular effect during SSR
const useIsoLayoutEffect =
    typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface IndicatorPosition {
    top: number;
    height: number;
    visible: boolean;
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const t = useTranslations("common");
    const [activeId, setActiveId] = useState<string>("");
    const [indicator, setIndicator] = useState<IndicatorPosition>({
        top: 0,
        height: 0,
        visible: false,
    });
    const observerRef = useRef<IntersectionObserver | null>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const itemRefs = useRef<Map<string, HTMLLIElement>>(new Map());

    // Scroll-spy: mark the heading nearest the top as active
    useEffect(() => {
        if (items.length === 0) return;

        const headingEls = items
            .map((item) => document.getElementById(item.id))
            .filter(Boolean) as HTMLElement[];

        observerRef.current = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                        break;
                    }
                }
            },
            { rootMargin: "0% 0% -80% 0%", threshold: 0 },
        );

        headingEls.forEach((el) => observerRef.current!.observe(el));
        return () => {
            headingEls.forEach((el) => observerRef.current?.unobserve(el));
            observerRef.current?.disconnect();
        };
    }, [items]);

    // Position the amber indicator next to the active item
    useIsoLayoutEffect(() => {
        if (!activeId || !listRef.current) {
            setIndicator((prev) => ({ ...prev, visible: false }));
            return;
        }
        const li = itemRefs.current.get(activeId);
        if (!li) return;
        setIndicator({
            top: li.offsetTop,
            height: li.offsetHeight,
            visible: true,
        });
    }, [activeId]);

    if (items.length < 2) return null;

    return (
        <nav aria-label="Table of contents">
            <p className="mb-3 font-sans text-xs font-semibold tracking-widest text-muted uppercase">
                {t("content.on_this_page")}
            </p>
            <div className="relative">
                {/* Track */}
                <span
                    aria-hidden="true"
                    className="pointer-events-none absolute top-0 bottom-0 left-0 w-px bg-rim/40"
                />
                {/* Sliding amber indicator */}
                <span
                    aria-hidden="true"
                    className="toc-indicator"
                    style={{
                        top: indicator.top,
                        height: indicator.height,
                        opacity: indicator.visible ? 1 : 0,
                    }}
                />
                <ul ref={listRef} className="space-y-1 pl-3">
                    {items.map((item) => {
                        const isActive = activeId === item.id;
                        return (
                            <li
                                key={item.id}
                                ref={(el) => {
                                    if (el) {
                                        itemRefs.current.set(item.id, el);
                                    } else {
                                        itemRefs.current.delete(item.id);
                                    }
                                }}
                                style={{
                                    paddingLeft: item.level === 3 ? 12 : 0,
                                }}
                            >
                                <a
                                    href={`#${item.id}`}
                                    className={`block py-0.5 text-sm transition-colors duration-200 ${
                                        isActive
                                            ? "font-medium text-accent"
                                            : "text-muted hover:text-accent"
                                    }`}
                                >
                                    {item.text}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </nav>
    );
}
