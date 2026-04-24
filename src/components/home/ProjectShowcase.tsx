"use client";

import React, { useState, useCallback, useRef } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";
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

// Scattered decorative devicons inside each compact card background.
// Opacity is handled via the mural wrapper so hover can modulate all icons at once.
const ICON_POSITIONS = [
    "absolute right-[-12px] top-[-12px] text-[140px]",
    "absolute left-4 bottom-[140px] text-[48px]",
    "absolute right-8 bottom-[160px] text-[36px]",
    "absolute left-[-8px] top-[60px] text-[60px]",
    "absolute right-4 top-[80px] text-[28px]",
];

const HERO_ICON_POSITIONS = [
    "absolute left-[-24px] top-[-24px] text-[220px]",
    "absolute left-[140px] top-[40px] text-[96px]",
    "absolute left-[40px] bottom-[20px] text-[72px]",
    "absolute left-[260px] bottom-[60px] text-[60px]",
    "absolute left-[200px] top-[160px] text-[48px]",
];

const CARD_CLASSES =
    "group relative flex flex-col overflow-hidden bg-canvas border border-rim min-h-[240px] transition-all duration-300 hover:border-accent/60 hover:shadow-[0_4px_32px_-8px_rgba(201,148,58,0.12)] hover:-translate-y-0.5 cursor-pointer text-left";

const HERO_CLASSES =
    "group relative flex flex-col lg:flex-row overflow-hidden bg-canvas border border-rim min-h-[320px] transition-all duration-300 hover:border-accent/60 hover:shadow-[0_8px_40px_-8px_rgba(201,148,58,0.18)] cursor-pointer text-left";

const CARDS_PER_PAGE = 6;

const DOC_CARD_W = 260;
const DOC_CARD_GAP = 12;

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
                {/* Warm amber lamplight wash — sits behind the icons, brightens on hover */}
                <div
                    className="absolute inset-0 opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                        background:
                            "radial-gradient(ellipse 65% 80% at 25% 45%, rgba(201,148,58,0.18) 0%, rgba(201,148,58,0.08) 35%, transparent 70%)",
                    }}
                />
                {/* The icons themselves — wrapped so hover can modulate collective opacity */}
                <div className="absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                    {icons.slice(0, HERO_ICON_POSITIONS.length).map((ic, i) => {
                        const baseOpacities = [0.12, 0.18, 0.14, 0.13, 0.14];
                        return (
                            <i
                                key={i}
                                style={{ opacity: baseOpacities[i] }}
                                className={`${ic} ${HERO_ICON_POSITIONS[i]} colored select-none`}
                            />
                        );
                    })}
                </div>
                {/* Smoother multi-stop fade into the content pane — vertical on mobile, horizontal on desktop */}
                <div className="absolute inset-0 bg-gradient-to-t from-canvas from-5% via-canvas/75 via-45% to-transparent lg:bg-gradient-to-r lg:from-canvas/0 lg:via-canvas/55 lg:via-55% lg:to-canvas" />
                {/* Subtle top-edge glow to anchor the mural */}
                <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-accent/[0.05] to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex flex-1 flex-col justify-between gap-6 p-8 lg:p-10">
                <div className="flex justify-end">
                    <span className="font-sans text-[10px] tracking-[0.2em] text-muted-readable uppercase">
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
                                className="border border-rim px-2 py-1 font-sans text-[11px] leading-none text-muted"
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
            {/* Warm amber lamplight wash behind the mural */}
            <div
                className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                    background:
                        "radial-gradient(ellipse 80% 60% at 70% 20%, rgba(201,148,58,0.14) 0%, rgba(201,148,58,0.05) 40%, transparent 75%)",
                }}
            />

            <div className="pointer-events-none absolute inset-0 opacity-90 transition-opacity duration-500 group-hover:opacity-100">
                {icons.slice(0, ICON_POSITIONS.length).map((ic, i) => {
                    const baseOpacities = [0.1, 0.16, 0.13, 0.11, 0.12];
                    return (
                        <i
                            key={i}
                            style={{ opacity: baseOpacities[i] }}
                            className={`${ic} ${ICON_POSITIONS[i]} colored select-none`}
                        />
                    );
                })}
            </div>

            {/* Smoother multi-stop fade — keeps text crisp while letting icons breathe above */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas from-10% via-canvas/80 via-45% to-transparent" />

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
                                    className="border border-rim px-1.5 py-[3px] font-sans text-[10px] leading-none text-muted"
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
                            <span className="font-sans text-xs text-muted-readable">
                                →
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Placeholder slot that fills empty trailing cells on the last pagination page.
// Rendered as a blank "unwritten page" — dashed rim, muted ruled-paper lines,
// and a tiny centered ornament — so the grid rhythm stays intact without
// implying a missing project.
function ProjectBlankCard() {
    return (
        <div
            aria-hidden="true"
            className="relative flex min-h-[240px] flex-col overflow-hidden border border-dashed border-rim/60 bg-canvas/40"
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.35]"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(to bottom, transparent 0px, transparent 27px, rgba(154,148,133,0.12) 28px, rgba(154,148,133,0.12) 29px)",
                }}
            />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-3xl leading-none text-muted/25 select-none">
                    ·
                </span>
            </div>
        </div>
    );
}

interface DocCardProps {
    project: DocProject;
    href: string;
}

function DocCard({ project, href }: DocCardProps) {
    return (
        <Link
            href={href}
            className="group relative flex h-[300px] w-[260px] flex-none flex-col overflow-hidden border border-rim bg-canvas transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/60 hover:shadow-[0_4px_32px_-8px_rgba(201,148,58,0.15)]"
        >
            {/* Decorative large page number */}
            <span className="pointer-events-none absolute top-3 right-4 font-serif text-[100px] leading-none text-accent/[0.06] tabular-nums select-none">
                {project.pageCount}
            </span>

            {/* Decorative arrow */}
            <span
                aria-hidden="true"
                className="pointer-events-none absolute top-4 right-4 font-sans text-xs text-muted/40 transition-colors duration-200 group-hover:text-accent/60"
            >
                ↗
            </span>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-canvas via-canvas/75 via-40% to-transparent" />

            {/* Content pinned to bottom */}
            <div className="absolute right-0 bottom-0 left-0 p-5">
                <h3 className="mb-2 font-serif text-xl leading-snug text-cream transition-colors duration-200 group-hover:text-accent">
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
    const [currentPage, setCurrentPage] = useState(0);
    const [slideDir, setSlideDir] = useState<"left" | "right">("right");

    const goToPage = useCallback((page: number, dir: "left" | "right") => {
        setSlideDir(dir);
        setCurrentPage(page);
    }, []);

    // Derived — must be above the touch handlers so they can reference totalPages
    const [hero, ...rest] = projects;
    const totalPages = Math.ceil(rest.length / CARDS_PER_PAGE);
    const pagedProjects = rest.slice(
        currentPage * CARDS_PER_PAGE,
        (currentPage + 1) * CARDS_PER_PAGE,
    );

    const touchStartX = useRef<number>(0);
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    }, []);
    const handleTouchEnd = useCallback(
        (e: React.TouchEvent) => {
            const dx = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(dx) < 50) return;
            if (dx < 0 && currentPage < totalPages - 1)
                goToPage(currentPage + 1, "right");
            else if (dx > 0 && currentPage > 0)
                goToPage(currentPage - 1, "left");
        },
        [currentPage, totalPages, goToPage],
    );

    const { ref: gridRef, isVisible: gridVisible } =
        useScrollReveal<HTMLDivElement>();

    const marqueeOffset = -(DOC_CARD_W + DOC_CARD_GAP) * docProjects.length;
    const loopedDocs = [...docProjects, ...docProjects];
    const marqueeDuration = Math.max(20, docProjects.length * 5);

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
                        <div
                            onTouchStart={handleTouchStart}
                            onTouchEnd={handleTouchEnd}
                        >
                            <div
                                key={currentPage}
                                className={`grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 ${
                                    slideDir === "right"
                                        ? "animate-slide-in-right"
                                        : "animate-slide-in-left"
                                }`}
                            >
                                {pagedProjects.map((project, index) => (
                                    <ProjectCard
                                        key={index}
                                        project={project}
                                        onSelect={setSelectedProject}
                                        visitLabel={visitLabel}
                                    />
                                ))}
                                {Array.from({
                                    length: Math.max(
                                        0,
                                        CARDS_PER_PAGE - pagedProjects.length,
                                    ),
                                }).map((_, i) => (
                                    <ProjectBlankCard key={`blank-${i}`} />
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="mt-6 flex items-center justify-between">
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() =>
                                                goToPage(
                                                    currentPage - 1,
                                                    "left",
                                                )
                                            }
                                            disabled={currentPage === 0}
                                            aria-label="Previous page"
                                            className={SCROLL_BTN}
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={() =>
                                                goToPage(
                                                    currentPage + 1,
                                                    "right",
                                                )
                                            }
                                            disabled={
                                                currentPage === totalPages - 1
                                            }
                                            aria-label="Next page"
                                            className={SCROLL_BTN}
                                        >
                                            →
                                        </button>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {Array.from({ length: totalPages }).map(
                                            (_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() =>
                                                        goToPage(
                                                            i,
                                                            i > currentPage
                                                                ? "right"
                                                                : "left",
                                                        )
                                                    }
                                                    aria-label={`Go to page ${i + 1}`}
                                                    className={`h-1 transition-all duration-300 ${
                                                        i === currentPage
                                                            ? "w-6 bg-accent"
                                                            : "w-2 bg-muted/40 hover:bg-muted/70"
                                                    }`}
                                                />
                                            ),
                                        )}
                                    </div>

                                    <p className="font-sans text-xs text-muted">
                                        {currentPage + 1} / {totalPages}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Documentation sub-section — auto-scroll marquee */}
                {docProjects.length > 0 && (
                    <div className="mt-14 border-t border-rim/60 pt-10">
                        <div className="mb-10">
                            <p className="mb-3 font-sans text-sm font-bold tracking-[0.2em] text-accent uppercase">
                                {tCommon("docs.sidebar_title")}
                            </p>
                            <div className="h-px w-12 bg-accent opacity-60" />
                        </div>

                        {/* Marquee carousel */}
                        <div
                            className="group relative left-1/2 w-screen -translate-x-1/2 overflow-hidden"
                            style={
                                {
                                    "--marquee-offset": `${marqueeOffset}px`,
                                } as React.CSSProperties
                            }
                        >
                            {/* Edge fades */}
                            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-surface to-transparent" />
                            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-surface to-transparent" />

                            <div
                                className="flex gap-3 py-2 pl-6 group-hover:[animation-play-state:paused]"
                                style={{
                                    animation: `marquee ${marqueeDuration}s linear infinite`,
                                }}
                            >
                                {loopedDocs.map((project, i) => (
                                    <DocCard
                                        key={`${project.slug}-${i}`}
                                        project={project}
                                        href={`${langPrefix}/docs/${project.slug}`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Footer row */}
                        <div className="mt-5 flex items-center justify-end gap-6">
                            <p className="font-sans text-xs text-muted">
                                {tCommon("docs.documented_projects", {
                                    count: docProjects.length,
                                })}
                            </p>
                            <Link
                                href={`${langPrefix}/docs`}
                                className="group flex items-center gap-2 font-sans text-sm text-muted transition-colors duration-200 hover:text-accent"
                            >
                                {tCommon("docs.all_projects_title")}
                                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>
                            </Link>
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
