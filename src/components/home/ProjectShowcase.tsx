"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const FEATURED_COUNT = 4;

interface Project {
    title: string;
    description: string;
    stack?: string[];
    githubLink?: string;
    demoLink?: string;
    imageUrl?: string;
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
            darkBg={true}
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
                        {/* Index number */}
                        <span className="pt-1 font-mono text-sm text-muted">
                            {String(index + 1).padStart(2, "0")}
                        </span>

                        {/* Content */}
                        <div>
                            <h3 className="font-display mb-2 text-xl text-cream transition-colors duration-200 group-hover:text-accent">
                                {project.title}
                            </h3>
                            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-muted">
                                {project.description}
                            </p>
                            {project.stack && project.stack.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((tech, i) => (
                                        <span
                                            key={i}
                                            className="border border-rim px-2 py-0.5 font-mono text-xs text-muted/70"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Links */}
                        <div className="flex items-start gap-4 pt-1 lg:flex-col">
                            {project.demoLink && (
                                <Link
                                    href={project.demoLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs tracking-wide whitespace-nowrap text-muted transition-colors duration-200 hover:text-accent"
                                >
                                    Demo ↗
                                </Link>
                            )}
                            {project.githubLink && (
                                <Link
                                    href={project.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-mono text-xs tracking-wide whitespace-nowrap text-muted transition-colors duration-200 hover:text-accent"
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
