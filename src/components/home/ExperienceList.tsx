"use client";

import { useState } from "react";
import BulletPoint from "../common/BulletPoint";

interface ExperienceItem {
    title: string;
    company: string;
    duration: string;
    description: string[];
}

interface ExperienceListProps {
    experiences: ExperienceItem[];
}

export default function ExperienceList({ experiences }: ExperienceListProps) {
    // 0 = first item expanded by default
    const [expanded, setExpanded] = useState<number | null>(0);

    return (
        <>
            {experiences.map((exp, index) => (
                <div key={index} className="relative pb-10 pl-8 last:pb-0">
                    {/* Timeline line */}
                    {index < experiences.length - 1 && (
                        <div className="absolute top-3 bottom-0 left-[7px] w-px bg-rim" />
                    )}
                    {/* Timeline dot */}
                    <div
                        className={`absolute top-1.5 left-0 h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 ${
                            expanded === index
                                ? "border-accent bg-accent"
                                : "border-muted bg-canvas"
                        }`}
                    />

                    {/* Header — clickable to expand (WAI-ARIA accordion: h3 wraps button) */}
                    <h3 className="mb-2">
                        <button
                            className="group w-full text-left"
                            onClick={() =>
                                setExpanded((prev) =>
                                    prev === index ? null : index,
                                )
                            }
                        >
                            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                                <span
                                    className={`font-sans text-lg transition-colors duration-200 ${
                                        expanded === index
                                            ? "text-text"
                                            : "text-muted group-hover:text-text"
                                    }`}
                                >
                                    {exp.title}
                                </span>
                                <div className="flex flex-shrink-0 items-center gap-3">
                                    <span className="font-sans text-xs text-muted">
                                        {exp.duration}
                                    </span>
                                    {/* Chevron indicator */}
                                    <svg
                                        className={`h-3.5 w-3.5 shrink-0 text-muted transition-transform duration-300 ${
                                            expanded === index
                                                ? "rotate-180"
                                                : ""
                                        }`}
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
                                </div>
                            </div>
                            <span className="mt-0.5 block text-sm text-accent">
                                {exp.company}
                            </span>
                        </button>
                    </h3>

                    {/* Smooth accordion — CSS grid height animation */}
                    <div
                        className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                            expanded === index
                                ? "grid-rows-[1fr]"
                                : "grid-rows-[0fr]"
                        }`}
                    >
                        <div className="min-h-0 overflow-hidden">
                            <ul className="space-y-2 pt-3 pb-1">
                                {exp.description.map((desc, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-3 text-sm leading-relaxed text-muted"
                                    >
                                        <BulletPoint />
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
}
