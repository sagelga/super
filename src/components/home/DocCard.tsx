"use client";

import Link from "next/link";

interface DocProject {
    slug: string;
    title: string;
    description: string;
    pageCount: number;
}

interface DocCardProps {
    project: DocProject;
    href: string;
    pagesLabel: string;
}

export function DocCard({ project, href, pagesLabel }: DocCardProps) {
    return (
        <Link
            href={href}
            className="group card-lift press-down bg-canvas relative h-[280px] w-[240px] flex-none overflow-hidden border border-rim"
        >
            <span className="pointer-events-none absolute top-[-16px] right-[-8px] font-serif text-[160px] leading-none text-muted/[0.04] transition-all duration-500 ease-out select-none group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent/20">
                →
            </span>

            <div className="from-canvas via-canvas/80 pointer-events-none absolute inset-0 bg-gradient-to-t via-50% to-transparent" />

            <div className="absolute right-0 bottom-0 left-0 p-5">
                <p className="mb-2 font-sans text-xs text-accent/50">
                    {pagesLabel}
                </p>
                <h3 className="text-cream mb-2 font-serif text-lg leading-snug transition-colors duration-200 group-hover:text-accent">
                    {project.title}
                </h3>
                {project.description && (
                    <p className="line-clamp-2 font-sans text-xs leading-relaxed text-muted">
                        {project.description}
                    </p>
                )}
            </div>
        </Link>
    );
}
