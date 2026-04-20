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

// Scattered decorative devicons inside each compact card background
const ICON_POSITIONS = [
    "absolute right-[-12px] top-[-12px] text-[140px] opacity-[0.06]",
    "absolute left-4 bottom-[140px] text-[48px] opacity-[0.12]",
    "absolute right-8 bottom-[160px] text-[36px] opacity-[0.10]",
    "absolute left-[-8px] top-[60px] text-[60px] opacity-[0.08]",
    "absolute right-4 top-[80px] text-[28px] opacity-[0.09]",
];

// Larger mural positions for the hero card (extends further to the left)
const HERO_ICON_POSITIONS = [
    "absolute left-[-24px] top-[-24px] text-[220px] opacity-[0.08]",
    "absolute left-[140px] top-[40px] text-[96px] opacity-[0.12]",
    "absolute left-[40px] bottom-[20px] text-[72px] opacity-[0.10]",
    "absolute left-[260px] bottom-[60px] text-[60px] opacity-[0.09]",
    "absolute left-[200px] top-[160px] text-[48px] opacity-[0.10]",
];

const CARD_CLASSES =
    "group relative flex flex-col overflow-hidden bg-canvas border border-rim min-h-[240px] transition-all duration-300 hover:border-accent/60 hover:shadow-[0_4px_32px_-8px_rgba(201,148,58,0.12)] hover:-translate-y-0.5 cursor-pointer text-left";

const HERO_CLASSES =
    "group relative flex flex-col lg:flex-row overflow-hidden bg-canvas border border-rim min-h-[320px] transition-all duration-300 hover:border-accent/60 hover:shadow-[0_8px_40px_-8px_rgba(201,148,58,0.18)] cursor-pointer text-left";

const SCROLL_AMOUNT = 600;

const SCROLL_BTN =
    "w-8 h-8 flex items-center justify-center border border-rim bg-surface font-sans text-sm text-muted transition-all duration-200 hover:border-accent/60 hover:text-accent disabled:opacity-20 disabled:pointer-events-none";

// ── Sub-components ────────────────────────────────────────────────────────────

interface ProjectHeroCardProps {
    project: Project;
    onSelect: (project: Project) => void;
    visitLabel: string;
    detailsLabel: string;
}

function ProjectHeroCard({
    project,
    onSelect,
    visitLabel,
    detailsLabel,
}: ProjectHeroCardProps) {
    const icons = (project.stack ?? [])
        .map(getIconClass)
        .filter(Boolean) as string[];
    const stopCard = (e: React.MouseEvent) => e.stopPropagation();

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
            className={HERO_CLASSES}
            aria-label={`${project.title} — ${detailsLabel}`}
        >
            {/* Mural — fills the left pane on desktop, sits behind content on mobile */}
            <div className="pointer-events-none absolute inset-0 lg:relative lg:h-auto lg:w-[42%] lg:flex-none lg:border-r lg:border-rim/60">
                {icons.slice(0, HERO_ICON_POSITIONS.length).map((ic, i) => (
                    <i
                        key={i}
                        className={`${ic} ${HERO_ICON_POSITIONS[i]} colored select-none`}
                    />
                ))}
                <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/70 via-60% to-transparent lg:bg-gradient-to-r lg:via-40%" />
            </div>

            {/* Content */}
            <div className="relative flex flex-1 flex-col justify-between gap-6 p-8 lg:p-10">
                <div className="flex justify-end">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-muted/60 uppercase">
                        Featured
                    </span>
                </div>

                <div>
                    <h3 className="mb-4 font-serif text-3xl leading-tight text-cream transition-colors duration-200 group-hover:text-accent lg:text-4xl">
                        {project.title}
                    </h3>
                    <p className="max-w-xl font-sans text-sm leading-relaxed text-muted lg:text-base">
                        {project.description}
                    </p>
                </div>

                {project.stack && project.stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {project.stack.slice(0, 6).map((tech) => (
                            <span
                                key={tech}
                                className="border border-rim px-2 py-1 font-sans text-[11px] leading-none text-muted/80"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-1">
                    {project.demoLink && (
                        <a
                            href={project.demoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={stopCard}
                            className="group/cta inline-flex items-center gap-2 bg-accent px-5 py-2.5 font-sans text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent/90"
                        >
                            {visitLabel}
                            <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5">
                                ↗
                            </span>
                        </a>
                    )}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onSelect(project);
                        }}
                        className="inline-flex items-center gap-2 border border-rim px-5 py-2.5 font-sans text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:text-cream"
                    >
                        {detailsLabel}
                        <span className="text-xs">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

interface ProjectCardProps {
    project: Project;
    onSelect: (project: Project) => void;
    visitLabel: string;
}

function ProjectCard({ project, onSelect, visitLabel }: ProjectCardProps) {
    const icons = (project.stack ?? [])
        .map(getIconClass)
        .filter(Boolean) as string[];
    const stopCard = (e: React.MouseEvent) => e.stopPropagation();

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

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/85 via-50% to-transparent" />

            <div className="relative flex flex-1 flex-col p-5">
                <div className="mt-auto">
                    <h3 className="mb-2 font-serif text-lg leading-snug text-cream transition-colors duration-200 group-hover:text-accent">
                        {project.title}
                    </h3>
                    <p className="mb-3 line-clamp-2 font-sans text-xs leading-relaxed text-muted">
                        {project.description}
                    </p>
                    {project.stack && project.stack.length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1">
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

                    <div className="flex items-center justify-between pt-1">
                        {project.demoLink ? (
                            <a
                                href={project.demoLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={stopCard}
                                className="group/cta inline-flex items-center gap-1 font-sans text-xs text-accent transition-colors duration-200 hover:text-accent/80"
                            >
                                {visitLabel}
                                <span className="transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5">
                                    ↗
                                </span>
                            </a>
                        ) : (
                            <span className="font-sans text-xs text-muted/50">
                                →
                            </span>
                        )}
                    </div>
                </div>
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
            className="group relative h-[280px] w-[240px] flex-none overflow-hidden border border-rim bg-canvas transition-all duration-300 hover:border-accent/60 hover:shadow-[0_4px_32px_-8px_rgba(201,148,58,0.12)]"
        >
            <span className="pointer-events-none absolute top-[-16px] right-[-8px] font-serif text-[160px] leading-none text-muted/[0.04] select-none">
                →
            </span>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/80 via-50% to-transparent" />

            <div className="absolute right-0 bottom-0 left-0 p-5">
                <p className="mb-2 font-sans text-xs text-accent/50">
                    {pagesLabel}
                </p>
                <h3 className="mb-2 font-serif text-lg leading-snug text-cream transition-colors duration-200 group-hover:text-accent">
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

    const { ref: gridRef, isVisible: gridVisible } =
        useScrollReveal<HTMLDivElement>();
    const { ref: docsRef, isVisible: docsVisible } =
        useScrollReveal<HTMLDivElement>();

    const { showLeft: dLeft, showRight: dRight } = useScrollShadow(docsRef);

    const scrollDocs = useCallback(
        (dir: "left" | "right") => {
            docsRef.current?.scrollBy({
                left: dir === "left" ? -SCROLL_AMOUNT : SCROLL_AMOUNT,
                behavior: "smooth",
            });
        },
        [docsRef],
    );

    const [hero, ...rest] = projects;
    const visitLabel = t("project_link_visit");
    const detailsLabel = t("project_link_details");

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
                <div
                    ref={gridRef}
                    className={`reveal ${gridVisible ? "is-revealed" : ""}`}
                >
                    {hero && (
                        <div className="mb-6">
                            <ProjectHeroCard
                                project={hero}
                                onSelect={setSelectedProject}
                                visitLabel={visitLabel}
                                detailsLabel={detailsLabel}
                            />
                        </div>
                    )}

                    {rest.length > 0 && (
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {rest.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    onSelect={setSelectedProject}
                                    visitLabel={visitLabel}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Documentation sub-section (unchanged — horizontal scroller) */}
                {docProjects.length > 0 && (
                    <div className="mt-14 border-t border-rim/60 pt-10">
                        <div className="mb-14">
                            <p className="mb-3 font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase">
                                {tCommon("docs.sidebar_title")}
                            </p>
                            <div className="h-px w-12 bg-accent opacity-60" />
                        </div>

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
                            <div className="pointer-events-none absolute top-0 right-0 bottom-2 z-10 w-20 bg-gradient-to-l from-surface to-transparent" />
                        </div>

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
