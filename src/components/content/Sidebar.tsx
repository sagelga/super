"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import type { SidebarItem } from "@/lib/sidebar";
import { SidebarNode } from "./SidebarNode";

interface SidebarProps {
    items: SidebarItem[];
    title?: string;
}

export default function Sidebar({ items, title }: SidebarProps) {
    const t = useTranslations("common");
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            <button
                className="mb-4 flex w-full items-center justify-between border border-rim bg-surface px-4 py-2 text-sm text-text lg:hidden"
                onClick={() => setMobileOpen((o) => !o)}
            >
                <span>{title ?? t("content.contents")}</span>
                <svg
                    className={`h-4 w-4 transition-transform ${mobileOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
            </button>

            <nav
                className={`${mobileOpen ? "block" : "hidden"} lg:block`}
                aria-label="Sidebar navigation"
            >
                {title && (
                    <p className="mb-3 font-sans text-xs font-semibold tracking-widest text-muted uppercase">
                        {title}
                    </p>
                )}
                <ul className="space-y-0.5">
                    {items.map((item, i) => (
                        <SidebarNode key={i} item={item} />
                    ))}
                </ul>
            </nav>
        </>
    );
}
