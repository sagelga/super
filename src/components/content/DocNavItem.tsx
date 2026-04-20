"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { SidebarItem } from "@/lib/sidebar";

interface DocNavItemProps {
    item: SidebarItem;
    onNavigate: () => void;
}

export function DocNavItem({ item, onNavigate }: DocNavItemProps) {
    const pathname = usePathname();
    const isActive = item.href === pathname;

    return (
        <div className="mb-4 break-inside-avoid">
            {item.href ? (
                <Link
                    href={item.href}
                    onClick={onNavigate}
                    className={`mb-1.5 block text-sm font-medium transition-colors ${
                        isActive
                            ? "text-accent"
                            : "text-text hover:text-accent"
                    }`}
                >
                    {item.label}
                </Link>
            ) : (
                <p className="mb-1.5 font-sans text-xs tracking-widest text-muted uppercase">
                    {item.label}
                </p>
            )}
            {item.children && (
                <ul className="space-y-0.5 border-l border-rim pl-3">
                    {item.children.map((child, i) => (
                        <li key={i}>
                            <Link
                                href={child.href ?? "#"}
                                onClick={onNavigate}
                                className={`block py-0.5 text-sm transition-colors ${
                                    pathname === child.href
                                        ? "text-accent"
                                        : "text-muted hover:text-text"
                                }`}
                            >
                                {child.label}
                            </Link>
                            {child.children && (
                                <ul className="mt-0.5 space-y-0.5 border-l border-rim/50 pl-3">
                                    {child.children.map((grandchild, j) => (
                                        <li key={j}>
                                            <Link
                                                href={grandchild.href ?? "#"}
                                                onClick={onNavigate}
                                                className={`block py-0.5 text-xs transition-colors ${
                                                    pathname === grandchild.href
                                                        ? "text-accent"
                                                        : "text-muted hover:text-text"
                                                }`}
                                            >
                                                {grandchild.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
