import React from "react";
import { useTranslations } from "next-intl";
import Section from "../common/Section";

// Define the interface for a single language item
interface LanguageItem {
    name: string;
    proficiency: string;
    iconClass?: string;
}

// Define the props interface for the LanguagesSection component
interface LanguagesSectionProps {
    languages: LanguageItem[];
}

// LanguagesSection functional component
const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => {
    const t = useTranslations("home");
    return (
        <Section
            title={t("languages_section_title")}
            darkBg={false}
            spacing="compact"
        >
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {languages.map((lang, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl bg-surface p-6 transition-colors duration-200 hover:bg-rim"
                    >
                        {lang.iconClass && (
                            <i
                                className={`${lang.iconClass} text-4xl text-accent`}
                            ></i>
                        )}
                        <div>
                            <h3 className="font-medium text-cream">
                                {lang.name}
                            </h3>
                            <p className="text-sm text-muted">
                                {lang.proficiency}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default LanguagesSection;
