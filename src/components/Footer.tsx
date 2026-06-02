"use client";

import React from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import Breadcrumb from "./Breadcrumb";
import FooterBottom from "./FooterBottom";
import { useSettings } from "./settings/SettingsProvider";
import "./Footer.style.css";

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
    const lang = useLocale();
    const { openSettings } = useSettings();

    const langPrefix = lang === "th" ? "" : `/${lang}`;

    const footerColumns: LinkColumn[] = [
        {
            title: t("nav.home"),
            links: [
                { name: t("nav.home"), href: `${langPrefix}/` },
                {
                    name: t("footer.sitemap.about"),
                    href: `${langPrefix}/#about`,
                },
                {
                    name: t("footer.sitemap.skills"),
                    href: `${langPrefix}/#skills`,
                },
                {
                    name: t("nav.experience"),
                    href: `${langPrefix}/#experience`,
                },
                {
                    name: t("nav.certifications"),
                    href: `${langPrefix}/#certifications`,
                },
            ],
        },
        {
            title: t("footer.sitemap.explore"),
            links: [
                { name: t("nav.blog"), href: `${langPrefix}/blog` },
                { name: t("nav.learn"), href: `${langPrefix}/learn` },
                { name: t("nav.docs"), href: `${langPrefix}/docs` },
            ],
        },
        {
            title: t("nav.projects"),
            links: [
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
                            <Link
                                href={`${langPrefix}/`}
                                className="footer-logo-text"
                            >
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
                    <FooterBottom
                        onLanguageClick={() => openSettings("language")}
                        onCookieClick={() => openSettings("privacy")}
                        onThemeClick={() => openSettings("appearance")}
                        extra={
                            <a
                                href="https://webring.wonderful.software#hewkawar.xyz"
                                title="วงแหวนเว็บ"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="opacity-60 transition-opacity duration-150 hover:opacity-100"
                            >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    alt="วงแหวนเว็บ"
                                    width={32}
                                    height={32}
                                    src="https://webring.wonderful.software/webring.white.svg"
                                />
                            </a>
                        }
                    />
                </div>
            </footer>
        </div>
    );
};

export default Footer;
