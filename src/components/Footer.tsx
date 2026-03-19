"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import CookieSettingsModal from "./cookies/CookieSettingsModal";

const CURRENT_YEAR = new Date().getFullYear();

interface LinkItem {
    name: string;
    href: string;
    iconClass?: string;
    icon?: string;
}

const Footer: React.FC = () => {
    const t = useTranslations("common");
    const tCookies = useTranslations("cookies");
    const pathname = usePathname();
    const lang = useLocale();
    const scrollToTop = useScrollToTop();
    const [showCookieSettings, setShowCookieSettings] = useState(false);

    const handleLanguageChange = (
        event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const newLang = event.target.value;
        // Strip current locale prefix to get the locale-free path
        const localeFree = pathname.startsWith(`/${lang}`)
            ? pathname.slice(`/${lang}`.length) || ""
            : pathname;
        // Hard navigate so the middleware re-initializes the locale context
        window.location.href = `/${newLang}${localeFree}`;
    };

    const sitemapLinks: { [key: string]: LinkItem[] } = useMemo(
        () => ({
            [t("footer.sitemap.kunanon_srisuntiroj")]: [
                { name: t("footer.sitemap.home"), href: `/${lang}` },
                { name: t("footer.sitemap.about"), href: `/${lang}/#about` },
                { name: t("footer.sitemap.skills"), href: `/${lang}/#skills` },
                {
                    name: t("footer.sitemap.experience"),
                    href: `/${lang}/#experience`,
                },
                {
                    name: t("footer.sitemap.certifications"),
                    href: `/${lang}/#certifications`,
                },
            ],
            [t("footer.sitemap.projects")]: [
                { name: t("footer.sitemap.todoist_notion_sync"), href: "#" },
                {
                    name: t("footer.sitemap.learn_with_sagelga"),
                    href: "https://learn.sagelga.com",
                },
                {
                    name: t("footer.sitemap.documentation_website"),
                    href: "https://docs.sagelga.com/",
                },
                {
                    name: t("footer.sitemap.byteside_one"),
                    href: "https://byteside.one/",
                },
                {
                    name: t("footer.sitemap.the_sunny_side_publication"),
                    href: "https://medium.com/the-sunny-side",
                },
            ],
            [t("footer.sitemap.connect")]: [
                {
                    name: t("footer.sitemap.linkedin"),
                    href: "https://www.linkedin.com/in/kunanon/",
                    iconClass: "devicon-linkedin-plain",
                },
                {
                    name: t("footer.sitemap.github"),
                    href: "https://github.com/sagelga",
                    iconClass: "devicon-github-plain",
                },
                {
                    name: t("footer.sitemap.salesforce_trailblazer"),
                    href: "https://www.salesforce.com/trailblazer/sagelga",
                    iconClass: "devicon-salesforce-plain",
                },
            ],
        }),
        [t, lang],
    );

    const legalLinks = [
        {
            name: t("footer.legal.privacy_policy"),
            href: `/${lang}/privacy-policy`,
        },
        {
            name: t("footer.legal.terms_of_service"),
            href: `/${lang}/terms-of-service`,
        },
    ];

    return (
        <div>
            <Breadcrumb />
            <footer className="border-t border-rim bg-surface">
                <div className="container mx-auto px-8 py-16 lg:px-16">
                    {/* Top: sitemap columns */}
                    <div className="mb-16 grid grid-cols-1 gap-12 md:grid-cols-3">
                        {Object.entries(sitemapLinks).map(
                            ([category, links]) => (
                                <div key={category}>
                                    <p className="mb-5 font-mono text-xs tracking-[0.25em] text-accent uppercase">
                                        {category}
                                    </p>
                                    <ul className="space-y-3">
                                        {links.map((link, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={link.href}
                                                    className="flex items-center gap-2 text-sm text-muted transition-colors duration-200 hover:text-cream"
                                                    target={
                                                        link.href.startsWith(
                                                            "/",
                                                        )
                                                            ? "_self"
                                                            : "_blank"
                                                    }
                                                    rel={
                                                        link.href.startsWith(
                                                            "/",
                                                        )
                                                            ? ""
                                                            : "noopener noreferrer"
                                                    }
                                                >
                                                    {link.iconClass && (
                                                        <i
                                                            className={`${link.iconClass} text-sm`}
                                                        />
                                                    )}
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ),
                        )}
                    </div>

                    {/* Bottom bar */}
                    <div className="flex flex-col items-start justify-between gap-4 border-t border-rim pt-6 sm:flex-row sm:items-center">
                        <p className="font-mono text-xs text-muted">
                            {t("footer.copyright", {
                                year: CURRENT_YEAR,
                                author: "Kunanon Srisuntiroj",
                            })}
                        </p>

                        <div className="flex flex-wrap items-center gap-6">
                            {legalLinks.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className="text-xs text-muted transition-colors duration-200 hover:text-cream"
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <select
                                value={lang}
                                onChange={handleLanguageChange}
                                className="cursor-pointer border border-rim bg-canvas px-3 py-1.5 text-xs text-muted transition-all duration-200 focus:border-accent focus:text-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                            >
                                <option value="en">
                                    {t("footer.english")}
                                </option>
                                <option value="th">{t("footer.thai")}</option>
                                <option value="zh">
                                    {t("footer.chinese")}
                                </option>
                            </select>

                            <button
                                onClick={scrollToTop}
                                className="font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
                            >
                                ↑ {t("footer.back_to_top")}
                            </button>

                            <button
                                onClick={() => setShowCookieSettings(true)}
                                className="font-mono text-xs text-muted transition-colors duration-200 hover:text-accent"
                            >
                                ⚙ {tCookies("footer.cookie_settings")}
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Cookie Settings Modal */}
            {showCookieSettings && (
                <CookieSettingsModal
                    onClose={() => setShowCookieSettings(false)}
                    onSave={() => setShowCookieSettings(false)}
                />
            )}
        </div>
    );
};

export default Footer;
