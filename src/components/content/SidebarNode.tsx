"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import type { SidebarItem } from "@/lib/sidebar";

export function SidebarNode({
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
                        className="p-0.5 text-muted transition-colors hover:text-accent"
                        aria-label={
                            open ? t("content.collapse") : t("content.expand")
                        }
                        aria-expanded={open}
                    >
                        <svg
                            className={`h-3 w-3 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "rotate-90" : ""}`}
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
                        className={`link-underline relative block truncate py-1 text-sm transition-colors duration-200 ${
                            isActive
                                ? "font-medium text-accent"
                                : "text-muted hover:text-accent"
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
            {hasChildren && (
                <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-80"}`}
                >
                    <ul className="mt-0.5 min-h-0 overflow-hidden">
                        {item.children!.map((child, i) => (
                            <SidebarNode
                                key={i}
                                item={child}
                                depth={depth + 1}
                            />
                        ))}
                    </ul>
                </div>
            )}
        </li>
    );
}
