"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useScrollShadow } from "@/hooks/useScrollShadow";
import ProjectModal from "./ProjectModal";
import { ProjectCard } from "./ProjectCard";
import { DocCard } from "./DocCard";

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

const SCROLL_AMOUNT = 600;

const SCROLL_BTN =
    "w-8 h-8 flex items-center justify-center border border-rim bg-surface font-sans text-sm text-muted transition-all duration-200 hover:border-accent/60 hover:text-accent disabled:opacity-20 disabled:pointer-events-none";

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
                headingVariant="display"
                sectionNumber="03"
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
                            <div className="flex items-center gap-3">
                                <div className="h-px w-8 flex-shrink-0 bg-accent" />
                                <span className="text-xs leading-none text-accent">
                                    ✦
                                </span>
                                <h3 className="text-cream font-serif text-3xl font-bold">
                                    {tCommon("docs.sidebar_title")}
                                </h3>
                            </div>
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
