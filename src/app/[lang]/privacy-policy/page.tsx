import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import { formatDate } from "@/utils/formatDate";

// When this policy was last materially updated — update this when content changes.
const LAST_UPDATED = new Date("2025-03-28");

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "Privacy Policy for sagelga.com and all projects under the sagelga brand.",
};

const PrivacyPolicyPage: React.FC = () => {
    const t = useTranslations("privacy-policy");
    const { name: websiteName, email: contactEmail } = siteConfig();

    const sections = t.raw("sections") as unknown as {
        id: string;
        title: string;
    }[];

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-8 text-center text-4xl font-extrabold text-cream">
                {t("title")}
            </h1>

            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Main Content */}
                <div className="grow lg:w-3/4">
                    {/* Introduction */}
                    <section id="introduction" className="mb-10">
                        <h2 className="mb-5 text-3xl font-bold text-cream">
                            {sections[0].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.0.paragraphs.0", { websiteName })}
                        </p>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.0.paragraphs.1")}
                        </p>
                    </section>

                    {/* Data We Collect */}
                    <section id="data-we-collect" className="mb-10">
                        <h2 className="mb-5 text-3xl font-bold text-cream">
                            {sections[1].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.1.paragraphs.0")}
                        </p>
                        <h3 className="mb-3 text-2xl font-semibold text-cream">
                            {t("sections.1.subsections.0.title")}
                        </h3>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.1.subsections.0.paragraph")}
                        </p>
                        <h3 className="mb-3 text-2xl font-semibold text-cream">
                            {t("sections.1.subsections.1.title")}
                        </h3>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.1.subsections.1.paragraph")}
                        </p>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.1.subsections.1.additional_paragraph")}
                        </p>
                        <h3 className="mb-3 text-2xl font-semibold text-cream">
                            {t("sections.1.subsections.2.title")}
                        </h3>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.1.subsections.2.paragraph")}
                        </p>
                    </section>

                    {/* How We Use Your Information */}
                    <section id="how-we-use-your-information" className="mb-10">
                        <h2 className="mb-5 text-3xl font-bold text-cream">
                            {sections[2].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.2.paragraphs.0")}
                        </p>
                        <ul className="ml-6 list-inside list-disc space-y-2 text-muted">
                            <li>{t("sections.2.list_items.0")}</li>
                            <li>{t("sections.2.list_items.1")}</li>
                            <li>{t("sections.2.list_items.2")}</li>
                            <li>{t("sections.2.list_items.3")}</li>
                        </ul>
                    </section>

                    {/* Disclosure */}
                    <section id="disclosure-of-your-information" className="mb-10">
                        <h2 className="mb-5 text-3xl font-bold text-cream">
                            {sections[3].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.3.paragraphs.0")}
                        </p>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.3.paragraphs.1")}
                        </p>
                        <h3 className="mb-3 text-2xl font-semibold text-cream">
                            {t("sections.3.subsections.0.title")}
                        </h3>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.3.subsections.0.paragraph")}
                        </p>
                        <h3 className="mb-3 text-2xl font-semibold text-cream">
                            {t("sections.3.subsections.1.title")}
                        </h3>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.3.subsections.1.paragraph")}
                        </p>
                    </section>

                    {/* Security */}
                    <section id="security-of-your-information" className="mb-10">
                        <h2 className="mb-5 text-3xl font-bold text-cream">
                            {sections[4].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.4.paragraphs.0")}
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section id="your-rights" className="mb-10">
                        <h2 className="mb-5 text-3xl font-bold text-cream">
                            {sections[5].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.5.paragraphs.0")}
                        </p>
                        <ul className="ml-6 list-inside list-disc space-y-2 text-muted">
                            <li>{t("sections.5.list_items.0")}</li>
                            <li>{t("sections.5.list_items.1")}</li>
                            <li>{t("sections.5.list_items.2")}</li>
                            <li>{t("sections.5.list_items.3")}</li>
                            <li>{t("sections.5.list_items.4")}</li>
                            <li>{t("sections.5.list_items.5")}</li>
                            <li>{t("sections.5.list_items.6")}</li>
                        </ul>
                        <p className="mt-4 leading-relaxed text-muted">
                            {t("sections.5.additional_paragraph")}
                        </p>
                    </section>

                    {/* Contact */}
                    <section id="contact-us" className="mb-10">
                        <h2 className="mb-5 text-3xl font-bold text-cream">
                            {sections[6].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.6.paragraphs.0")}
                        </p>
                        <p className="text-lg font-semibold text-accent">
                            {contactEmail}
                        </p>
                    </section>

                    {/* Last Updated */}
                    <section className="mt-12 text-center">
                        <p className="text-sm text-muted">
                            {t("last_updated", {
                                date: formatDate(LAST_UPDATED),
                            })}
                        </p>
                    </section>
                </div>

                {/* Table of Contents */}
                <nav className="h-fit rounded-lg bg-surface p-6 shadow-md lg:sticky lg:top-20 lg:w-1/4">
                    <h2 className="mb-4 text-xl font-bold text-cream">
                        {t("table_of_contents_title")}
                    </h2>
                    <ul className="list-none space-y-2 p-0">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-lg text-accent hover:underline"
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default PrivacyPolicyPage;
