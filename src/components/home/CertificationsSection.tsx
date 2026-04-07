"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Section from "../common/Section";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface CertificationItem {
    title: string;
    issuer?: string;
    date?: string;
    url?: string;
    skills: string[];
}

interface CertificationsSectionProps {
    certifications: CertificationItem[];
}

const CERT_TITLE_CLASS = "text-cream text-sm font-medium leading-snug";

const CertificationsSection: React.FC<CertificationsSectionProps> = ({
    certifications,
}) => {
    const t = useTranslations("home");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <Section
            id="certifications"
            title={t("certifications_section_title")}
            subtitle={`${certifications.length}`}
            headingVariant="minimal"
            spacing="compact"
        >
            <div
                ref={ref}
                className={`reveal-stagger grid grid-cols-1 gap-px overflow-hidden rounded-xl bg-rim md:grid-cols-2 lg:grid-cols-3 ${isVisible ? "is-revealed" : ""}`}
            >
                {certifications.map((cert, index) => (
                    <div
                        key={index}
                        className="group hover:bg-canvas bg-surface p-6 transition-colors duration-200"
                    >
                        <div className="mb-3">
                            {cert.url ? (
                                <Link
                                    href={cert.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <h3
                                        className={`${CERT_TITLE_CLASS} transition-colors duration-200 group-hover:text-accent`}
                                    >
                                        {cert.title}
                                    </h3>
                                </Link>
                            ) : (
                                <h3 className={CERT_TITLE_CLASS}>
                                    {cert.title}
                                </h3>
                            )}
                            {cert.date && (
                                <p className="mt-1 font-sans text-xs text-muted">
                                    {t("issued_label")} {cert.date}
                                </p>
                            )}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                            {cert.skills.map((skill, i) => (
                                <span
                                    key={i}
                                    className="border border-rim px-2 py-0.5 font-sans text-xs text-muted/70"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default CertificationsSection;
