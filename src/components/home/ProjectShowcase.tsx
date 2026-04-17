"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollShadow } from "@/hooks/useScrollShadow";
import { getIconClass } from "@/utils/iconMapping";
import ProjectModal from "./ProjectModal";

interface Project {
    title: string;
    description: string;
    stack?: string[];
    githubLink?: string;
    demoLink?: string;
    docsSlug?: string;
}

interface DocProject {
    slug: string;
    title: string;
    description: string;
    pageCount: number;
}

interface ProjectShowcaseProps {
    projects: Project[];
    docProjects?: DocProject[];
}

// Positions for scattered decorative icons in the card background
const ICON_POSITIONS = [
    "absolute right-[-12px] top-[-12px] text-[140px] opacity-[0.06]",
    "absolute left-4 bottom-[140px] text-[48px] opacity-[0.12]",
    "absolute right-8 bottom-[160px] text-[36px] opacity-[0.10]",
    "absolute left-[-8px] top-[60px] text-[60px] opacity-[0.08]",
    "absolute right-4 top-[80px] text-[28px] opacity-[0.09]",
];

const CARD_CLASSES =
    "group flex-none w-[240px] h-[380px] relative overflow-hidden bg-canvas border border-rim transition-all duration-300 hover:border-accent/60 hover:shadow-[0_4px_32px_-8px_rgba(201,148,58,0.12)] cursor-pointer text-left";

const SCROLL_AMOUNT = 600;

const SCROLL_BTN =
    "w-8 h-8 flex items-center justify-center border border-rim bg-surface font-sans text-sm text-muted transition-all duration-200 hover:border-accent/60 hover:text-accent disabled:opacity-20 disabled:pointer-events-none";

// ── Sub-components ────────────────────────────────────────────────────────────

interface ProjectCardProps {
    project: Project;
    onSelect: (project: Project) => void;
    statusLabel: string;
}

function ProjectCard({ project, onSelect, statusLabel }: ProjectCardProps) {
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
                    className={`${ic} ${ICON_POSITIONS[i]} colored pointer-events-none select-none`}
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

interface DocCardProps {
    project: DocProject;
    href: string;
    pagesLabel: string;
}

function DocCard({ project, href, pagesLabel }: DocCardProps) {
    return (
        <Link
            href={href}
            className="group bg-canvas relative h-[280px] w-[240px] flex-none overflow-hidden border border-rim transition-all duration-300 hover:border-accent/60 hover:shadow-[0_4px_32px_-8px_rgba(201,148,58,0.12)]"
        >
            <span className="pointer-events-none absolute top-[-16px] right-[-8px] font-serif text-[160px] leading-none text-muted/[0.04] select-none">
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

// ── Main component ────────────────────────────────────────────────────────────

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({
    projects,
    docProjects = [],
}) => {
    const t = useTranslations("home");
    const tCommon = useTranslations("common");
    const lang = useLocale();
    const langPrefix = lang === "th" ? "" : `/${lang}`;

    const [selectedProject, setSelectedProject] = useState<Project | null>(
        null,
    );

    const { ref: projectsRef, isVisible: projectsVisible } =
        useScrollReveal<HTMLDivElement>();
    const { ref: docsRef, isVisible: docsVisible } =
        useScrollReveal<HTMLDivElement>();

    const { showLeft: pLeft, showRight: pRight } = useScrollShadow(projectsRef);
    const { showLeft: dLeft, showRight: dRight } = useScrollShadow(docsRef);

    const makeScroller = useCallback(
        (ref: React.RefObject<HTMLElement | null>) =>
            (dir: "left" | "right") => {
                ref.current?.scrollBy({
                    left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
                    behavior: "smooth",
                });
            },
        [],
    );

    const scrollProjects = makeScroller(projectsRef);
    const scrollDocs = makeScroller(docsRef);

    return (
        <>
            <Section
                id="projects"
                title={t("projects_section_title")}
                subtitle={t("projects_section_subtitle", {
                    count: projects.length,
                })}
                spacing="generous"
            >
                {/* Projects horizontal scroller */}
                <div className="relative">
                    <div
                        ref={projectsRef}
                        className={`reveal relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${projectsVisible ? "is-revealed" : ""}`}
                    >
                        <div className="flex gap-3 px-4 pb-2 lg:px-6">
                            {projects.map((project, index) => {
                                const hasDemo = Boolean(project.demoLink);
                                const hasGithub = Boolean(project.githubLink);
                                const statusLabel = hasDemo
                                    ? t("project_status_live")
                                    : hasGithub
                                      ? t("project_status_open_source")
                                      : t("project_status_private");

                                return (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        onSelect={setSelectedProject}
                                        statusLabel={statusLabel}
                                    />
                                );
                            })}
                        </div>
                    </div>
                    {/* Right-edge fade — signals more content to the right */}
                    <div className="pointer-events-none absolute top-0 right-0 bottom-2 z-10 w-20 bg-gradient-to-l from-surface to-transparent" />
                </div>

                {/* Projects scroll buttons */}
                <div className="mt-3 flex justify-end gap-1.5">
                    <button
                        onClick={() => scrollProjects("left")}
                        disabled={!pLeft}
                        aria-label="Scroll projects left"
                        className={SCROLL_BTN}
                    >
                        ←
                    </button>
                    <button
                        onClick={() => scrollProjects("right")}
                        disabled={!pRight}
                        aria-label="Scroll projects right"
                        className={SCROLL_BTN}
                    >
                        →
                    </button>
                </div>

                {/* Documentation sub-section */}
                {docProjects.length > 0 && (
                    <div className="mt-14 border-t border-rim/60 pt-10">
                        {/* Sub-section heading — can't nest <Section> inside <Section>, so we replicate its default heading markup here */}
                        <div className="mb-14">
                            <p className="mb-3 font-sans text-sm tracking-[0.2em] text-accent uppercase">
                                {tCommon("docs.sidebar_title")}
                            </p>
                            <div className="h-px w-12 bg-accent opacity-60" />
                        </div>

                        {/* Docs horizontal scroller */}
                        <div className="relative">
                            <div
                                ref={docsRef}
                                className={`reveal relative left-1/2 w-screen -translate-x-1/2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${docsVisible ? "is-revealed" : ""}`}
                            >
                                <div className="flex gap-3 px-4 pb-2 lg:px-6">
                                    {docProjects.map((project) => (
                                        <DocCard
                                            key={project.slug}
                                            project={project}
                                            href={`${langPrefix}/docs/${project.slug}`}
                                            pagesLabel={tCommon(
                                                "docs.pages_count",
                                                { count: project.pageCount },
                                            )}
                                        />
                                    ))}
                                </div>
                            </div>
                            {/* Right-edge fade */}
                            <div className="pointer-events-none absolute top-0 right-0 bottom-2 z-10 w-20 bg-gradient-to-l from-surface to-transparent" />
                        </div>

                        {/* "See all docs" row with scroll buttons */}
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => scrollDocs("left")}
                                    disabled={!dLeft}
                                    aria-label="Scroll docs left"
                                    className={SCROLL_BTN}
                                >
                                    ←
                                </button>
                                <button
                                    onClick={() => scrollDocs("right")}
                                    disabled={!dRight}
                                    aria-label="Scroll docs right"
                                    className={SCROLL_BTN}
                                >
                                    →
                                </button>
                            </div>
                            <div className="flex items-center gap-6">
                                <p className="font-sans text-xs text-muted/70">
                                    {tCommon("docs.documented_projects", {
                                        count: docProjects.length,
                                    })}
                                </p>
                                <Link
                                    href={`${langPrefix}/docs`}
                                    className="group flex items-center gap-2 font-sans text-sm text-muted/70 transition-colors duration-200 hover:text-accent"
                                >
                                    {tCommon("docs.all_projects_title")}
                                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                        →
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </Section>

            {/* Project detail modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    langPrefix={langPrefix}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </>
    );
};

export default ProjectShowcase;
