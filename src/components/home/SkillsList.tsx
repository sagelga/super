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

function SkillPill({
    skill,
    tier,
}: {
    skill: string;
    tier: "core" | "proficient" | "familiar";
}) {
    const iconClass = getIconClass(skill);

    const tierStyles = {
        core: "border-accent/40 bg-accent/5 px-4 py-2 text-sm font-medium text-cream hover:border-accent hover:bg-accent/10",
        proficient:
            "border-rim px-3 py-1.5 text-sm text-muted hover:border-accent/50 hover:text-cream",
        familiar:
            "border-rim/50 px-2.5 py-1 text-xs text-muted/60 hover:border-rim hover:text-muted",
    };

    return (
        <span
            className={`inline-flex cursor-default items-center gap-1.5 border transition-colors duration-200 ${tierStyles[tier]}`}
        >
            {iconClass && (
                <i
                    className={`${iconClass} ${tier === "core" ? "text-sm" : "text-xs"}`}
                />
            )}
            {skill}
        </span>
    );
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
    const t = useTranslations("home");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <Section
            id="skills"
            title={t("skills_section_title")}
            headingVariant="minimal"
            darkBg={false}
            spacing="compact"
        >
            <div
                ref={ref}
                className={`reveal space-y-6 ${isVisible ? "is-revealed" : ""}`}
            >
                <div>
                    <p className="mb-3 font-sans text-[10px] tracking-[0.3em] text-muted/40 uppercase">Core</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.core.map((skill, i) => (
                            <SkillPill key={i} skill={skill} tier="core" />
                        ))}
                    </div>
                </div>
                <div>
                    <p className="mb-3 font-sans text-[10px] tracking-[0.3em] text-muted/40 uppercase">Proficient</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.proficient.map((skill, i) => (
                            <SkillPill key={i} skill={skill} tier="proficient" />
                        ))}
                    </div>
                </div>
                <div>
                    <p className="mb-3 font-sans text-[10px] tracking-[0.3em] text-muted/40 uppercase">Familiar</p>
                    <div className="flex flex-wrap gap-2">
                        {skills.familiar.map((skill, i) => (
                            <SkillPill key={i} skill={skill} tier="familiar" />
                        ))}
                    </div>
                </div>
            </div>
        </Section>
    );
};

export default SkillsList;
