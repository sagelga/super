"use client";

import React, { useEffect, useCallback } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

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

    // ESC to close
    const handleKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        },
        [onClose],
    );

    // Lock body scroll + ESC listener
    useEffect(() => {
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", handleKeyDown);
        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
        >
            {/* Backdrop */}
            <div
                className="bg-canvas/85 absolute inset-0 backdrop-blur-sm"
                style={{ animation: "fade-in 0.15s ease-out both" }}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className="border-rim relative z-10 flex max-h-[85vh] w-full max-w-2xl flex-col border bg-surface"
                style={{
                    animation: "fade-up 0.2s cubic-bezier(0.25,1,0.5,1) both",
                }}
            >
                {/* Header */}
                <div className="flex items-start justify-between p-6 pb-5">
                    <div className="flex-1 pr-6">
                        <p className="mb-2 font-sans text-[10px] tracking-widest text-accent/60 uppercase">
                            {statusLabel}
                        </p>
                        <h2 className="text-cream font-serif text-2xl leading-snug">
                            {project.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="hover:text-cream -mr-1 flex-none p-1 text-muted/50 transition-colors duration-200"
                        aria-label="Close"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.5"
                        >
                            <path d="M4 4l12 12M16 4L4 16" />
                        </svg>
                    </button>
                </div>

                <div className="bg-rim mx-6 h-px" />

                {/* Scrollable body */}
                <div className="flex-1 space-y-5 overflow-y-auto p-6">
                    {/* Full description */}
                    <p className="font-sans text-sm leading-relaxed text-muted">
                        {project.description}
                    </p>

                    {/* Tech stack — all chips */}
                    {project.stack && project.stack.length > 0 && (
                        <div>
                            <p className="mb-2 font-sans text-[10px] tracking-[0.2em] text-muted/40 uppercase">
                                Stack
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {project.stack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="border-rim border px-2 py-1 font-sans text-[11px] leading-none text-muted/70"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="bg-rim mx-6 h-px" />

                {/* Action footer */}
                <div className="flex flex-wrap gap-3 p-6 pt-5">
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
                            className="border-rim hover:text-cream border px-4 py-2 font-sans text-sm text-muted transition-colors duration-200 hover:border-accent/50"
                        >
                            GitHub ↗
                        </a>
                    )}
                    {hasDocs && (
                        <Link
                            href={`${langPrefix}/docs/${project.docsSlug}`}
                            onClick={onClose}
                            className="border-rim hover:text-cream flex items-center gap-1.5 border px-4 py-2 font-sans text-sm text-muted transition-colors duration-200 hover:border-accent/50"
                        >
                            {t("project_link_docs")}
                            <span className="text-xs">→</span>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectModal;
