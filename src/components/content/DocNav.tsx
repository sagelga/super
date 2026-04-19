"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarItem } from "@/lib/sidebar";

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

function NavItem({
    item,
    index,
    onNavigate,
}: {
    item: SidebarItem;
    index: number;
    onNavigate: () => void;
}) {
    const pathname = usePathname();
    const isActive = item.href === pathname;
    const numLabel = String(index + 1).padStart(2, "0");

    const heading = (
        <span className="flex items-baseline gap-2.5">
            <span className="font-mono text-[10px] tracking-wider text-accent/60 tabular-nums">
                {numLabel}
            </span>
            <span className="font-display text-base leading-tight">
                {item.label}
            </span>
        </span>
    );

    return (
        <div className="mb-7 break-inside-avoid">
            <div className="mb-2.5">
                {item.href ? (
                    <Link
                        href={item.href}
                        onClick={onNavigate}
                        className={`group block transition-colors ${
                            isActive
                                ? "text-accent"
                                : "text-text hover:text-accent"
                        }`}
                    >
                        {heading}
                    </Link>
                ) : (
                    <div className="text-text">{heading}</div>
                )}
                <div
                    className={`mt-2 h-px w-8 bg-gradient-to-r to-transparent ${
                        isActive ? "from-accent" : "from-accent/50"
                    }`}
                />
            </div>
            {item.children && (
                <ul className="space-y-0.5">
                    {item.children.map((child, i) => {
                        const childActive = pathname === child.href;
                        return (
                            <li key={i}>
                                <Link
                                    href={child.href ?? "#"}
                                    onClick={onNavigate}
                                    className={`group flex items-baseline gap-2 py-0.5 text-sm transition-colors ${
                                        childActive
                                            ? "text-accent"
                                            : "text-muted hover:text-text"
                                    }`}
                                >
                                    <span
                                        className={`text-xs transition-colors ${
                                            childActive
                                                ? "text-accent"
                                                : "text-rim group-hover:text-accent/70"
                                        }`}
                                        aria-hidden
                                    >
                                        ·
                                    </span>
                                    <span>{child.label}</span>
                                </Link>
                                {child.children && (
                                    <ul className="mt-0.5 ml-4 space-y-0.5">
                                        {child.children.map((grandchild, j) => (
                                            <li key={j}>
                                                <Link
                                                    href={grandchild.href ?? "#"}
                                                    onClick={onNavigate}
                                                    className={`block py-0.5 text-xs transition-colors ${
                                                        pathname === grandchild.href
                                                            ? "text-accent"
                                                            : "text-muted/75 hover:text-text"
                                                    }`}
                                                >
                                                    {grandchild.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}

export default function DocNav({ items, title }: DocNavProps) {
    const pathname = usePathname();
    const [open, setOpen] = useState(true);
    const active = findActive(items, pathname);

    return (
        <div className="mb-10">
            {/* Trigger bar */}
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

            {/* Expanded panel */}
            {open && (
                <div className="border border-t-0 border-rim bg-canvas p-6 md:p-8">
                    <div className="columns-2 gap-8 md:columns-3 md:gap-10 lg:columns-4">
                        {items.map((item, i) => (
                            <NavItem
                                key={i}
                                item={item}
                                index={i}
                                onNavigate={() => setOpen(false)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
