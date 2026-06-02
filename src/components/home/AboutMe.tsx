import React from "react";
import { getTranslations } from "next-intl/server";
import Section from "../common/Section";
import RevealOnScroll from "../common/RevealOnScroll";

const AboutMe: React.FC = async () => {
    const t = await getTranslations("home");

    return (
        <Section
            id="about"
            title={t("about.title")}
            headingVariant="minimal"
            spacing="generous"
        >
            <RevealOnScroll className="grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16">
                {/* Introduction — spans 2 columns */}
                <div className="lg:col-span-2">
                    <p className="font-display text-text border-l-2 border-accent pl-6 text-xl leading-relaxed">
                        {t("about.introduction")}
                    </p>
                </div>

                {/* Education — right column */}
                <div>
                    <p className="mb-5 font-sans text-xs tracking-[0.25em] text-accent uppercase">
                        {t("about.education_title")}
                    </p>
                    <p className="text-text mb-2 leading-snug font-medium">
                        {t("about.university_name")}
                    </p>
                    <p className="mb-1 text-sm text-muted">
                        {t("about.school_years")}
                    </p>
                    <p className="text-sm text-muted">{t("about.grade")}</p>
                </div>
            </RevealOnScroll>
        </Section>
    );
};

export default AboutMe;
