"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import Breadcrumb from "./Breadcrumb";
import CookieSettingsModal from "./cookies/CookieSettingsModal";
import LanguageSwitcherModal from "./LanguageSwitcherModal";
import ThemeSettingsModal from "./ThemeSettingsModal";
import "./Footer.style.css";

const CURRENT_YEAR = new Date().getFullYear();

interface LinkItem {
    name: string;
    href: string;
    external?: boolean;
}

interface LinkColumn {
    title: string;
    links: LinkItem[];
}

const Footer: React.FC = () => {
    const t = useTranslations("common");
    const tCookies = useTranslations("cookies");
    const pathname = usePathname();
    const lang = useLocale();
    const [showCookieSettings, setShowCookieSettings] = useState(false);
    const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
    const [showThemeSettings, setShowThemeSettings] = useState(false);

    const handleLanguageSelect = (newLang: string) => {
        const localeFree = pathname.startsWith(`/${lang}`)
            ? pathname.slice(`/${lang}`.length) || "/"
            : pathname;
        window.location.href =
            newLang === "th" ? localeFree : `/${newLang}${localeFree}`;
    };

    const footerColumns: LinkColumn[] = [
        {
            title: t("footer.sitemap.kunanon_srisuntiroj"),
            links: [
                { name: t("nav.home"), href: "/" },
                { name: t("footer.sitemap.about"), href: "/#about" },
                { name: t("footer.sitemap.skills"), href: "/#skills" },
                { name: t("nav.experience"), href: "/#experience" },
                {
                    name: t("nav.certifications"),
                    href: "/#certifications",
                },
            ],
        },
        {
            title: t("nav.projects"),
            links: [
                {
                    name: "Learn",
                    href: "https://learn.sagelga.com",
                    external: true,
                },
                {
                    name: "Documentation",
                    href: "https://docs.sagelga.com/",
                    external: true,
                },
                {
                    name: "Mahjong Hands",
                    href: "https://mahjong.sagelga.com",
                    external: true,
                },
                {
                    name: "Telegram Thai",
                    href: "https://telegram.sagelga.com",
                    external: true,
                },
                {
                    name: "Status Page",
                    href: "https://status.sagelga.com/?brand=sagelga",
                    external: true,
                },
            ],
        },
        {
            title: t("footer.sitemap.connect"),
            links: [
                {
                    name: "GitHub",
                    href: "https://github.com/sagelga",
                    external: true,
                },
                {
                    name: "LinkedIn",
                    href: "https://www.linkedin.com/in/kunanon/",
                    external: true,
                },
                {
                    name: "Salesforce Trailblazer",
                    href: "https://www.salesforce.com/trailblazer/sagelga",
                    external: true,
                },
            ],
        },
    ];

    return (
        <div>
            <Breadcrumb />
            <footer className="footer">
                <div className="footer-container container mx-auto px-8 lg:px-16">
                    <div className="footer-top">
                        <div className="footer-brand">
                            <Link href="/" className="footer-logo-text">
                                {t("navbar.name")}
                            </Link>
                            <p className="footer-tagline">
                                {t("footer.tagline")}
                            </p>
                        </div>
                        <div className="footer-columns">
                            {footerColumns.map((column, index) => (
                                <div key={index} className="footer-col">
                                    <p className="footer-col-title">
                                        {column.title}
                                    </p>
                                    <ul>
                                        {column.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                {link.external ? (
                                                    <a
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        {link.name}
                                                    </a>
                                                ) : (
                                                    <Link href={link.href}>
                                                        {link.name}
                                                    </Link>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <hr className="footer-divider" />
                    <div className="footer-bottom">
                        <span>© 2021–{CURRENT_YEAR} Kunanon Srisuntiroj</span>
                        <div className="flex items-center gap-6">
                            <button
                                onClick={() => setShowLanguageSwitcher(true)}
                                className="footer-toggle-btn footer-lang-btn"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <line x1="2" y1="12" x2="22" y2="12" />
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                                </svg>
                                <span>{t("language.label")}</span>
                            </button>
                            <button
                                onClick={() => setShowCookieSettings(true)}
                                className="footer-toggle-btn"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                </svg>
                                <span>
                                    {tCookies("footer.cookie_settings")}
                                </span>
                            </button>
                            <button
                                onClick={() => setShowThemeSettings(true)}
                                className="footer-toggle-btn"
                            >
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    aria-hidden="true"
                                >
                                    <circle cx="12" cy="12" r="5" />
                                    <line x1="12" y1="1" x2="12" y2="3" />
                                    <line x1="12" y1="21" x2="12" y2="23" />
                                    <line
                                        x1="4.22"
                                        y1="4.22"
                                        x2="5.64"
                                        y2="5.64"
                                    />
                                    <line
                                        x1="18.36"
                                        y1="18.36"
                                        x2="19.78"
                                        y2="19.78"
                                    />
                                    <line x1="1" y1="12" x2="3" y2="12" />
                                    <line x1="21" y1="12" x2="23" y2="12" />
                                    <line
                                        x1="4.22"
                                        y1="19.78"
                                        x2="5.64"
                                        y2="18.36"
                                    />
                                    <line
                                        x1="18.36"
                                        y1="5.64"
                                        x2="19.78"
                                        y2="4.22"
                                    />
                                </svg>
                                <span>{t("theme.title")}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </footer>

            {showCookieSettings && (
                <CookieSettingsModal
                    isOpen={showCookieSettings}
                    onClose={() => setShowCookieSettings(false)}
                    onSave={() => setShowCookieSettings(false)}
                />
            )}

            {showLanguageSwitcher && (
                <LanguageSwitcherModal
                    currentLang={lang}
                    onClose={() => setShowLanguageSwitcher(false)}
                    onLanguageSelect={handleLanguageSelect}
                />
            )}

            <ThemeSettingsModal
                isOpen={showThemeSettings}
                onClose={() => setShowThemeSettings(false)}
            />
        </div>
    );
};

export default Footer;
