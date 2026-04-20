"use client";

import React from "react";
import { getIconClass } from "@/utils/iconMapping";

interface Project {
    title: string;
    description: string;
    stack?: string[];
    githubLink?: string;
    demoLink?: string;
    docsSlug?: string;
}

interface ProjectCardProps {
    project: Project;
    onSelect: (project: Project) => void;
    statusLabel: string;
}

const ICON_POSITIONS = [
    "absolute right-[-12px] top-[-12px] text-[140px] opacity-[0.06]",
    "absolute left-4 bottom-[140px] text-[48px] opacity-[0.12]",
    "absolute right-8 bottom-[160px] text-[36px] opacity-[0.10]",
    "absolute left-[-8px] top-[60px] text-[60px] opacity-[0.08]",
    "absolute right-4 top-[80px] text-[28px] opacity-[0.09]",
];

const CARD_CLASSES =
    "group card-lift press-down flex-none w-[240px] h-[380px] relative overflow-hidden bg-canvas border border-rim cursor-pointer text-left";

export function ProjectCard({
    project,
    onSelect,
    statusLabel,
}: ProjectCardProps) {
    const icons = (project.stack ?? [])
        .map(getIconClass)
        .filter(Boolean) as string[];

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => onSelect(project)}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelect(project);
                }
            }}
            className={CARD_CLASSES}
        >
            {icons.slice(0, ICON_POSITIONS.length).map((ic, i) => (
                <i
                    key={i}
                    className={`${ic} ${ICON_POSITIONS[i]} colored pointer-events-none transition-all duration-500 ease-out select-none group-hover:scale-105 group-hover:opacity-100`}
                />
            ))}

            <div className="from-canvas via-canvas/85 pointer-events-none absolute inset-0 bg-gradient-to-t via-50% to-transparent" />

            <div className="absolute right-0 bottom-0 left-0 p-5">
                <p className="mb-2 font-sans text-[10px] tracking-widest text-accent/60 uppercase">
                    {statusLabel}
                </p>
                <h3 className="text-cream mb-2 font-serif text-lg leading-snug transition-colors duration-200 group-hover:text-accent">
                    {project.title}
                </h3>
                <p className="mb-3 line-clamp-2 font-sans text-xs leading-relaxed text-muted">
                    {project.description}
                </p>
                {project.stack && project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {project.stack.slice(0, 3).map((tech) => (
                            <span
                                key={tech}
                                className="border border-rim px-1.5 py-[3px] font-sans text-[10px] leading-none text-muted/70"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
