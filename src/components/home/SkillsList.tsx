"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Section from "../common/Section";
import { getIconClass } from "@/utils/iconMapping";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SkillsListProps {
    skills: string[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
    const t = useTranslations("home");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <Section
            id="skills"
            title={t("skills_section_title")}
            darkBg={false}
            spacing="compact"
        >
            <div
                ref={ref}
                className={`reveal flex flex-wrap gap-2.5 ${isVisible ? "is-revealed" : ""}`}
            >
                {skills.map((skill, index) => {
                    const iconClass = getIconClass(skill);
                    return (
                        <span
                            key={index}
                            className="inline-flex cursor-default items-center gap-1.5 border border-rim px-3 py-1.5 text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:text-cream"
                        >
                            {iconClass && (
                                <i className={`${iconClass} text-sm`} />
                            )}
                            {skill}
                        </span>
                    );
                })}
            </div>
        </Section>
    );
};

export default SkillsList;
