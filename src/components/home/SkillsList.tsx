"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Section from "../common/Section";
import { getIconClass } from "@/utils/iconMapping";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SkillsTiered {
    core: string[];
    proficient: string[];
    familiar: string[];
}

interface SkillsListProps {
    skills: SkillsTiered;
}

function SkillPill({ skill }: { skill: string }) {
    const iconClass = getIconClass(skill);

    return (
        <span className="inline-flex cursor-default items-center gap-1.5 border border-rim/60 px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:text-text">
            {iconClass && <i className={`${iconClass} text-xs`} />}
            {skill}
        </span>
    );
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
    const t = useTranslations("home");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    const allSkills = [...skills.core, ...skills.proficient, ...skills.familiar];

    return (
        <Section
            id="skills"
            title={t("skills_section_title")}
            headingVariant="minimal"
            variant="canvas"
            spacing="compact"
        >
            <div
                ref={ref}
                className={`reveal ${isVisible ? "is-revealed" : ""}`}
            >
                <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill, i) => (
                        <SkillPill key={i} skill={skill} />
                    ))}
                </div>
            </div>
        </Section>
    );
};

export default SkillsList;
