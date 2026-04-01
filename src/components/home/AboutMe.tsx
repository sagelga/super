"use client";

import React from "react";
import { useTranslations } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const AboutMe: React.FC = () => {
    const t = useTranslations("home");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <Section
            id="about"
            title={t("about.title")}
            headingVariant="minimal"
            spacing="generous"
            darkBg={true}
        >
            <div
                ref={ref}
                className={`reveal grid grid-cols-1 gap-12 lg:grid-cols-3 lg:gap-16 ${isVisible ? "is-revealed" : ""}`}
            >
                {/* Introduction — spans 2 columns */}
                <div className="lg:col-span-2">
                    <p className="font-display border-l-2 border-accent pl-6 text-xl leading-relaxed text-cream">
                        {t("about.introduction")}
                    </p>
                </div>

                {/* Education — right column */}
                <div>
                    <p className="mb-5 font-sans text-xs tracking-[0.25em] text-accent uppercase">
                        {t("about.education_title")}
                    </p>
                    <p className="mb-2 leading-snug font-medium text-cream">
                        {t("about.university_name")}
                    </p>
                    <p className="mb-1 text-sm text-muted">
                        {t("about.school_years")}
                    </p>
                    <p className="text-sm text-muted">{t("about.grade")}</p>
                </div>
            </div>
        </Section>
    );
};

export default AboutMe;
