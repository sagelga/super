import type { Metadata } from "next";
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
        lang === "th" ? `${BASE_URL}/contact` : `${BASE_URL}/${lang}/contact`;
    const title = t("nav.contact");
    const description = t("contact.subtitle");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonical,
            type: "website",
        },
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((l) => [
                    l,
                    l === "th"
                        ? `${BASE_URL}/contact`
                        : `${BASE_URL}/${l}/contact`,
                ]),
            ),
        },
    };
}

const socials = [
    {
        key: "github",
        label: "GitHub",
        handle: "@sagelga",
        href: "https://github.com/sagelga",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
        ),
    },
    {
        key: "linkedin",
        label: "LinkedIn",
        handle: "in/kunanon",
        href: "https://www.linkedin.com/in/kunanon/",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
        ),
    },
    {
        key: "trailblazer",
        label: "Salesforce Trailblazer",
        handle: "sagelga",
        href: "https://www.salesforce.com/trailblazer/sagelga",
        icon: (
            <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
            >
                <path d="M10.12 2.004C8.312 2.004 6.674 2.87 5.615 4.22a4.34 4.34 0 0 0-2.196-.594C1.534 3.626 0 5.16 0 7.047c0 .482.1.94.278 1.357A4.12 4.12 0 0 0 .83 14.46a3.74 3.74 0 0 0-.09.8c0 2.07 1.677 3.748 3.748 3.748.386 0 .757-.06 1.107-.167A4.133 4.133 0 0 0 9.386 21a4.14 4.14 0 0 0 3.345-1.703c.288.058.585.09.89.09 2.49 0 4.507-2.018 4.507-4.508 0-.235-.02-.466-.055-.691A3.645 3.645 0 0 0 20 10.832a3.645 3.645 0 0 0-3.041-3.6 4.868 4.868 0 0 0-6.839-5.228z" />
            </svg>
        ),
    },
];

export default async function ContactPage() {
    const t = await getTranslations("common");

    return (
        <div className="container mx-auto px-8 py-20 lg:px-16">
            {/* Header */}
            <header className="mb-16">
                <p className="mb-3 font-sans text-xs font-semibold tracking-widest text-accent uppercase">
                    {t("contact.eyebrow")}
                </p>
                <h1 className="text-text font-serif text-5xl font-semibold lg:text-6xl">
                    {t("contact.title")}
                </h1>
                <p className="mt-4 max-w-lg text-lg text-muted">
                    {t("contact.subtitle")}
                </p>
            </header>

            {/* Two-column layout */}
            <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
                {/* Left: Email CTA */}
                <div className="flex flex-col gap-8">
                    {/* Availability badge */}
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-2.5 w-2.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                        </span>
                        <span className="font-sans text-sm text-accent">
                            {t("contact.available_label")}
                        </span>
                    </div>

                    {/* Email block */}
                    <div className="border border-rim bg-surface p-8">
                        <p className="mb-2 font-sans text-xs font-semibold tracking-widest text-muted uppercase">
                            {t("contact.email_label")}
                        </p>
                        <a
                            href={`mailto:${t("contact.email_cta")}`}
                            className="group text-text flex items-center gap-3 font-serif text-2xl transition-colors duration-200 hover:text-accent lg:text-3xl"
                        >
                            {t("contact.email_cta")}
                            <svg
                                className="h-5 w-5 shrink-0 translate-x-0 text-accent opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </a>
                        <p className="mt-4 font-sans text-sm text-muted/70">
                            {t("contact.response_note")}
                        </p>
                    </div>
                </div>

                {/* Right: Social profiles */}
                <div>
                    <p className="mb-6 font-sans text-xs font-semibold tracking-widest text-muted uppercase">
                        {t("contact.socials_heading")}
                    </p>
                    <div className="flex flex-col gap-1">
                        {socials.map((s) => (
                            <a
                                key={s.key}
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-center gap-5 border border-transparent px-5 py-4 transition-all duration-150 hover:border-rim hover:bg-surface"
                            >
                                <span className="group-hover:text-text shrink-0 text-muted transition-colors duration-150">
                                    {s.icon}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="text-text text-sm font-medium">
                                        {s.label}
                                    </p>
                                    <p className="font-sans text-xs text-muted">
                                        {s.handle}
                                    </p>
                                </div>
                                <svg
                                    className="h-4 w-4 shrink-0 text-muted/60 transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
