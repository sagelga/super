"use client";

import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Section from "../common/Section";
import BulletPoint from "../common/BulletPoint";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface VolunteeringItem {
    title: string;
    year?: string;
    description: string[];
    link?: { text: string; href: string };
}

interface VolunteeringSectionProps {
    volunteering: VolunteeringItem[];
}

const VolunteeringSection: React.FC<VolunteeringSectionProps> = ({
    volunteering,
}) => {
    const t = useTranslations("home");
    const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

    return (
        <Section
            title={t("volunteering_section_title")}
            darkBg={false}
            spacing="generous"
        >
            <div
                ref={ref}
                className={`reveal-stagger max-w-4xl space-y-12 ${isVisible ? "is-revealed" : ""}`}
            >
                {volunteering.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[4rem_1fr] items-start gap-8 sm:grid-cols-[6rem_1fr]"
                    >
                        {/* Year */}
                        <div className="text-right">
                            {item.year && (
                                <span className="font-display pt-1 text-5xl leading-none font-bold text-muted/20 select-none sm:text-6xl">
                                    {item.year}
                                </span>
                            )}
                        </div>

                        {/* Content */}
                        <div className="border-l border-rim pl-8">
                            <h3 className="font-display mb-3 text-lg text-cream">
                                {item.title}
                            </h3>
                            <ul className="mb-4 space-y-2">
                                {item.description.map((desc, i) => (
                                    <li
                                        key={i}
                                        className="flex gap-3 text-sm leading-relaxed text-muted"
                                    >
                                        <BulletPoint />
                                        {desc}
                                    </li>
                                ))}
                            </ul>
                            {item.link && (
                                <Link
                                    href={item.link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 border border-accent/40 px-4 py-1.5 text-sm text-accent transition-colors duration-200 hover:border-accent hover:text-cream"
                                >
                                    {item.link.text}
                                    <span className="text-xs">↗</span>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
};

export default VolunteeringSection;
