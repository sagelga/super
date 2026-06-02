import React from "react";
import { getTranslations } from "next-intl/server";
import Section from "../common/Section";
import RevealOnScroll from "../common/RevealOnScroll";
import SkillPill from "./SkillPill";
import { getIconClass } from "@/utils/iconMapping";
import "@/styles/devicons.css";

const SkillsList: React.FC = async () => {
    const t = await getTranslations("home");
    const skills = t.raw("skills") as {
        core: string[];
        proficient: string[];
        familiar: string[];
    };
    const allSkills = [...skills.core, ...skills.proficient, ...skills.familiar];

    return (
        <Section
            id="skills"
            title={t("skills_section_title")}
            headingVariant="minimal"
            variant="canvas"
            spacing="compact"
        >
            <RevealOnScroll>
                <div className="flex flex-wrap gap-2">
                    {allSkills.map((skill, i) => (
                        <SkillPill
                            key={i}
                            skill={skill}
                            iconClass={getIconClass(skill)}
                        />
                    ))}
                </div>
            </RevealOnScroll>
        </Section>
    );
};

export default SkillsList;
