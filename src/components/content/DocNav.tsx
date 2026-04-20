"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import type { SidebarItem } from "@/lib/sidebar";
import { DocNavItem } from "./DocNavItem";

interface DocNavProps {
    items: SidebarItem[];
    title?: string;
}

function findActive(
    items: SidebarItem[],
    pathname: string,
): SidebarItem | null {
    for (const item of items) {
        if (item.href === pathname) return item;
        if (item.children) {
            const found = findActive(item.children, pathname);
            if (found) return found;
        }
    }
    return null;
}

export default function DocNav({ items, title }: DocNavProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(true);
    const active = findActive(items, pathname);

    return (
        <div className="mb-10">
            <button
                onClick={() => setOpen((o) => !o)}
                className="flex w-full items-center justify-between border border-rim bg-surface px-5 py-3 text-sm transition-colors hover:bg-surface/80"
                aria-expanded={open}
                aria-label="Toggle page navigation"
            >
                <div className="flex min-w-0 items-center gap-2">
                    <span className="shrink-0 font-sans text-xs tracking-widest text-muted uppercase">
                        {title}
                    </span>
                    {active && (
                        <>
                            <span className="shrink-0 text-rim">/</span>
                            <span className="truncate text-text">
                                {active.label}
                            </span>
                        </>
                    )}
                </div>
                <svg
                    className={`ml-4 h-4 w-4 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
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

            {open && (
                <div className="bg-canvas border border-t-0 border-rim p-5">
                    <div className="columns-2 gap-6 md:columns-3 lg:columns-4">
                        {items.map((item, i) => (
                            <DocNavItem
                                key={i}
                                item={item}
                                onNavigate={() => setOpen(false)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
