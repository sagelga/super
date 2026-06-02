import React from "react";
import { getTranslations } from "next-intl/server";
import Section from "../common/Section";
import RevealOnScroll from "../common/RevealOnScroll";
import ExperienceList from "./ExperienceList";

interface ExperienceItem {
    title: string;
    company: string;
    duration: string;
    description: string[];
}

const ExperienceSection: React.FC = async () => {
    const t = await getTranslations("home");
    const experiences = t.raw("experiences") as ExperienceItem[];

    return (
        <Section
            id="experience"
            title={t("experience_section_title")}
            subtitle={`${experiences.length}`}
            variant="canvas"
        >
            <RevealOnScroll className="max-w-4xl">
                <ExperienceList experiences={experiences} />
            </RevealOnScroll>
        </Section>
    );
};

export default ExperienceSection;
