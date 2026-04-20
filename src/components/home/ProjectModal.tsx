"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import BottomSheet from "../ui/BottomSheet";

interface Project {
    title: string;
    description: string;
    stack?: string[];
    githubLink?: string;
    demoLink?: string;
    docsSlug?: string;
}

interface ProjectModalProps {
    project: Project;
    langPrefix: string;
    onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({
    project,
    langPrefix,
    onClose,
}) => {
    const t = useTranslations("home");

    const hasDemo = Boolean(project.demoLink);
    const hasGithub = Boolean(project.githubLink);
    const hasDocs = Boolean(project.docsSlug);

    const statusLabel = hasDemo
        ? t("project_status_live")
        : hasGithub
          ? t("project_status_open_source")
          : t("project_status_private");

    return (
        <BottomSheet isOpen={true} onClose={onClose} title={project.title}>
            <div className="space-y-5 p-6">
                <p className="mb-2 font-sans text-[10px] tracking-widest text-accent/60 uppercase">
                    {statusLabel}
                </p>

                <p className="font-sans text-sm leading-relaxed text-muted">
                    {project.description}
                </p>

                {project.stack && project.stack.length > 0 && (
                    <div>
                        <p className="mb-2 font-sans text-[10px] tracking-[0.2em] text-muted/40 uppercase">
                            Stack
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                            {project.stack.map((tech) => (
                                <span
                                    key={tech}
                                    className="border border-rim px-2 py-1 font-sans text-[11px] leading-none text-muted/70"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                <div className="border-t border-rim pt-5" />

                <div className="flex flex-wrap gap-3">
                    {hasDemo && (
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-canvas bg-accent px-4 py-2 font-sans text-sm transition-colors duration-200 hover:bg-accent/90"
                        >
                            {t("project_link_demo")} ↗
                        </a>
                    )}
                    {hasGithub && (
                        <a
                            href={project.githubLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cream border border-rim px-4 py-2 font-sans text-sm text-muted transition-colors duration-200 hover:border-accent/50"
                        >
                            GitHub ↗
                        </a>
                    )}
                    {hasDocs && (
                        <Link
                            href={`${langPrefix}/docs/${project.docsSlug}`}
                            onClick={onClose}
                            className="hover:text-cream flex items-center gap-1.5 border border-rim px-4 py-2 font-sans text-sm text-muted transition-colors duration-200 hover:border-accent/50"
                        >
                            {t("project_link_docs")}
                            <span className="text-xs">→</span>
                        </Link>
                    )}
                </div>
            </div>
        </BottomSheet>
    );
};

export default ProjectModal;
