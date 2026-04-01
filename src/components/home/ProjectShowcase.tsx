"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { getIconClass } from "@/utils/iconMapping";

const FEATURED_COUNT = 4;

// Icons whose `colored` variant is white/invisible on light backgrounds
const DARK_OVERRIDE_ICONS = new Set([
    "devicon-notion-plain",
    "devicon-nextjs-plain",
]);

interface Project {
    title: string;
    description: string;
    stack?: string[];
    githubLink?: string;
    demoLink?: string;
}

interface ProjectShowcaseProps {
    projects: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
    const t = useTranslations("home");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <Section
            id="projects"
            title={t("projects_section_title")}
            subtitle={`${projects.length}`}
            darkBg={true}
            spacing="generous"
        >
            <div
                ref={ref}
                className={`reveal divide-y divide-rim ${isVisible ? "is-revealed" : ""}`}
            >
                {projects.map((project, index) => (
                    <div
                        key={index}
                        className={`group grid grid-cols-[3rem_1fr] items-start gap-6 lg:grid-cols-[3rem_1fr_auto] ${
                            index < FEATURED_COUNT ? "py-10" : "py-6"
                        }`}
                    >
                        {/* Index number — decorative display ordinal */}
                        <span className="font-display pt-0.5 text-2xl leading-none font-bold text-muted/15 select-none">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Content */}
                        <div>
                            <h3
                                className={`mb-2 font-sans text-cream transition-colors duration-200 group-hover:text-accent ${index < FEATURED_COUNT ? "text-xl" : "text-base"}`}
                            >
                                {project.title}
                            </h3>
                            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted">
                                {project.description}
                            </p>
                            {project.stack && project.stack.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    <div className="flex flex-wrap gap-3">
                                        {project.stack.map((tech, i) => {
                                            const iconClass =
                                                getIconClass(tech);
                                            return iconClass ? (
                                                <i
                                                    key={i}
                                                    className={`${iconClass} text-2xl ${DARK_OVERRIDE_ICONS.has(iconClass) ? "text-foreground" : "colored"}`}
                                                    title={tech}
                                                />
                                            ) : null;
                                        })}
                                    </div>
                                    <p className="font-sans text-xs text-muted/50">
                                        {project.stack.join(", ")}
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="col-start-2 flex flex-wrap items-start gap-4 pt-1 lg:flex-col">
                            {project.demoLink && (
                                <Link
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-xs tracking-wide whitespace-nowrap text-muted transition-colors duration-200 hover:text-accent"
                                >
                                    Demo ↗
                                </Link>
                            )}
                            {project.githubLink && (
                                <Link
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-xs tracking-wide whitespace-nowrap text-muted transition-colors duration-200 hover:text-accent"
                                >
                                    GitHub ↗
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default ProjectShowcase;
