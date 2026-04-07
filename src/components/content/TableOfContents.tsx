"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import type { TocItem } from "@/lib/seo";

interface TableOfContentsProps {
    items: TocItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
    const t = useTranslations("common");
    const [activeId, setActiveId] = useState<string>("");
    const observerRef = useRef<IntersectionObserver | null>(null);

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

    if (items.length < 2) return null;

    return (
        <nav aria-label="Table of contents">
            <p className="mb-3 font-sans text-xs font-semibold tracking-widest text-muted uppercase">
                {t("content.on_this_page")}
            </p>
            <ul className="space-y-1">
                {items.map((item) => {
                    const isActive = activeId === item.id;
                    return (
                        <li
                            key={item.id}
                            style={{ paddingLeft: item.level === 3 ? 12 : 0 }}
                        >
                            <a
                                href={`#${item.id}`}
                                className={`block py-0.5 text-sm transition-colors duration-150 ${
                                    isActive
                                        ? "font-medium text-accent"
                                        : "hover:text-cream text-muted"
                                }`}
                            >
                                {item.text}
                            </a>
                            {isActive && (
                                <div
                                    className="mt-0.5 h-px bg-accent/25"
                                    aria-hidden="true"
                                />
                            )}
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
