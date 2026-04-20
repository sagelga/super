"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { SidebarItem } from "@/lib/sidebar";

interface SidebarProps {
    items: SidebarItem[];
    title?: string;
}

function SidebarNode({
    item,
    depth = 0,
}: {
    item: SidebarItem;
    depth?: number;
}) {
    const t = useTranslations("common");
    const pathname = usePathname();
    const isActive =
        pathname === item.href || pathname.startsWith(item.href + "/");
    const hasChildren = item.children && item.children.length > 0;
    const [open, setOpen] = useState(isActive || depth < 1);

    return (
        <li>
            <div
                className="flex items-center gap-1"
                style={{ paddingLeft: depth * 12 }}
            >
                {hasChildren && (
                    <button
                        onClick={() => setOpen((o) => !o)}
                        className="p-0.5 text-muted transition-colors hover:text-text"
                        aria-label={
                            open ? t("content.collapse") : t("content.expand")
                        }
                    >
                        <svg
                            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                )}
                {!hasChildren && <span className="w-4" />}
                {item.href ? (
                    <Link
                        href={item.href}
                        className={`block truncate py-1 text-sm transition-colors duration-150 ${
                            isActive
                                ? "font-medium text-accent"
                                : "text-muted hover:text-text"
                        }`}
                    >
                        {item.label}
                    </Link>
                ) : (
                    <span
                        className="block cursor-default py-1 text-sm font-medium text-text/70"
                        onClick={() => setOpen((o) => !o)}
                    >
                        {item.label}
                    </span>
                )}
            </div>
            {hasChildren && open && (
                <ul className="mt-0.5">
                    {item.children!.map((child) => (
                        <SidebarNode
                            key={child.href ?? child.label}
                            item={child}
                            depth={depth + 1}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
}

export default function Sidebar({ items, title }: SidebarProps) {
    const t = useTranslations("common");
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <>
            {/* Mobile toggle */}
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

            {/* Sidebar */}
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
                    {items.map((item) => (
                        <SidebarNode
                            key={item.href ?? item.label}
                            item={item}
                        />
                    ))}
                </ul>
            </nav>
        </>
    );
}
