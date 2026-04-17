import React from "react";
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/lib/config";

const LOCALES = ["en", "th", "zh"] as const;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "common" });
    const canonical =
        lang === "th"
            ? `${BASE_URL}/terms-of-service`
            : `${BASE_URL}/${lang}/terms-of-service`;
    const title = t("nav.terms_of_service");

    return {
        title,
        openGraph: {
            title,
            url: canonical,
            type: "website",
        },
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((l) => [
                    l,
                    l === "th"
                        ? `${BASE_URL}/terms-of-service`
                        : `${BASE_URL}/${l}/terms-of-service`,
                ]),
            ),
        },
    };
}

// Define the TermsOfServicePage component
const TermsOfServicePage: React.FC = () => {
    const t = useTranslations("terms-of-service");
    const { name: websiteName, email: contactEmail } = siteConfig();

    // Define the sections of the terms of service for navigation
    const sections = t.raw("sections") as unknown as {
        id: string;
        title: string;
    }[];

    // Render the TermsOfServicePage component
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-text mb-8 text-center text-4xl font-extrabold">
                {t("title")}
            </h1>

            <div className="flex flex-col gap-8 lg:flex-row">
                {/* Main Content Area */}
                <div className="grow lg:w-3/4">
                    {/* Introduction Section */}
                    <section id="introduction" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[0].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.0.paragraphs.0", { websiteName })}
                        </p>
                    </section>

                    {/* Acceptance of Terms Section */}
                    <section id="acceptance-of-terms" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[1].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.1.paragraphs.0")}
                        </p>
                    </section>

                    {/* Changes to Terms Section */}
                    <section id="changes-to-terms" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[2].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.2.paragraphs.0")}
                        </p>
                    </section>

                    {/* User Obligations Section */}
                    <section id="user-obligations" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[3].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.3.paragraphs.0")}
                        </p>
                        <ul className="ml-6 list-inside list-disc space-y-2 text-muted">
                            <li>{t("sections.3.list_items.0")}</li>
                            <li>{t("sections.3.list_items.1")}</li>
                            <li>{t("sections.3.list_items.2")}</li>
                            <li>{t("sections.3.list_items.3")}</li>
                            <li>{t("sections.3.list_items.4")}</li>
                            <li>{t("sections.3.list_items.5")}</li>
                            <li>{t("sections.3.list_items.6")}</li>
                        </ul>
                    </section>

                    {/* Intellectual Property Section */}
                    <section id="intellectual-property" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[4].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.4.paragraphs.0")}
                        </p>
                    </section>

                    {/* Disclaimer of Warranties Section */}
                    <section id="disclaimer-of-warranties" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[5].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.5.paragraphs.0")}
                        </p>
                    </section>

                    {/* Limitation of Liability Section */}
                    <section id="limitation-of-liability" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[6].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.6.paragraphs.0")}
                        </p>
                    </section>

                    {/* Indemnification Section */}
                    <section id="indemnification" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[7].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.7.paragraphs.0")}
                        </p>
                    </section>

                    {/* Governing Law Section */}
                    <section id="governing-law" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[8].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.8.paragraphs.0")}
                        </p>
                    </section>

                    {/* Contact Us Section */}
                    <section id="contact-us" className="mb-10">
                        <h2 className="text-text mb-5 text-3xl font-bold">
                            {sections[9].title}
                        </h2>
                        <p className="mb-4 leading-relaxed text-muted">
                            {t("sections.9.paragraphs.0")}
                        </p>
                        <p className="text-lg font-semibold text-accent">
                            {contactEmail}
                        </p>
                    </section>

                    {/* Last Updated Section */}
                    <section className="mt-12 text-center">
                        <p className="text-sm text-muted">
                            {t("last_updated", {
                                date: new Date().toLocaleDateString("en-US", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                }),
                            })}
                        </p>
                    </section>
                </div>

                {/* Table of Contents Area */}
                <nav className="h-fit rounded-lg bg-surface p-6 shadow-md lg:sticky lg:top-20 lg:w-1/4">
                    <h2 className="text-text mb-4 text-xl font-bold">
                        {t("table_of_contents_title")}
                    </h2>
                    <ul className="list-none space-y-2 p-0">
                        {/* Map through the sections array to create the table of contents */}
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

// Export the TermsOfServicePage component
export default TermsOfServicePage;
