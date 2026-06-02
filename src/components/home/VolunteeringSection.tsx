import React from "react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import Section from "../common/Section";
import BulletPoint from "../common/BulletPoint";
import RevealOnScroll from "../common/RevealOnScroll";

interface VolunteeringItem {
    title: string;
    year?: string;
    description: string[];
    link?: { text: string; href: string };
}

const VolunteeringSection: React.FC = async () => {
    const t = await getTranslations("home");
    const volunteering = t.raw("volunteering") as VolunteeringItem[];

    return (
        <Section
            id="volunteering"
            title={t("volunteering_section_title")}
            headingVariant="minimal"
            variant="canvas"
            spacing="generous"
        >
            <RevealOnScroll stagger className="max-w-4xl space-y-12">
                {volunteering.map((item, index) => (
                    <div
                        key={index}
                        className="grid grid-cols-[4rem_1fr] items-start gap-8 sm:grid-cols-[6rem_1fr]"
                    >
                        {/* Year */}
                        {item.year && (
                            <div className="pt-1 text-right">
                                <span aria-hidden="true" className="font-display -translate-x-[10px] pt-1 text-5xl leading-none font-bold text-muted/20 select-none sm:text-6xl">
                                    {item.year}
                                </span>
                            </div>
                        )}

                        {/* Content */}
                        <div className="border-l border-rim pl-8">
                            <h3 className="text-cream mb-3 font-sans text-lg">
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
                                    className="hover:text-cream inline-flex items-center gap-2 border border-accent/40 px-4 py-1.5 text-sm text-accent transition-colors duration-200 hover:border-accent"
                                >
                                    {item.link.text}
                                    <span className="text-xs">↗</span>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </RevealOnScroll>
        </Section>
    );
};

export default VolunteeringSection;
