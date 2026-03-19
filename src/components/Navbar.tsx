"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

const Navbar: React.FC = () => {
    const t = useTranslations("common");
    const lang = useLocale();
    const [isHomeHovered, setIsHomeHovered] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        handleScroll(); // seed initial state
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled ? "border-b border-rim bg-canvas" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-8 lg:px-16">
                {/* Logo */}
                <Link
                    href={`/${lang}`}
                    className="font-mono text-sm tracking-[0.15em] text-cream uppercase transition-colors duration-200 hover:text-accent"
                >
                    {t("navbar.name")}
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-8">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHomeHovered(true)}
                        onMouseLeave={() => setIsHomeHovered(false)}
                    >
                        <Link
                            href={`/${lang}`}
                            className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                        >
                            {t("navbar.home")}
                        </Link>
                        {isHomeHovered && (
                            <div className="absolute top-full left-1/2 mt-2 min-w-[180px] -translate-x-1/2 border border-rim bg-surface py-2 shadow-xl">
                                <Link
                                    href={`/${lang}/home/experience`}
                                    className="block px-5 py-2 text-xs tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("navbar.experience")}
                                </Link>
                                <Link
                                    href={`/${lang}/home/certifications`}
                                    className="block px-5 py-2 text-xs tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("navbar.certifications")}
                                </Link>
                                <Link
                                    href={`/${lang}/home/projects`}
                                    className="block px-5 py-2 text-xs tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("navbar.projects")}
                                </Link>
                                <Link
                                    href={`/${lang}/home/volunteering`}
                                    className="block px-5 py-2 text-xs tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("navbar.volunteering")}
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        href={`/${lang}/blog`}
                        className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                    >
                        {t("navbar.blog")}
                    </Link>
                    <Link
                        href={`/${lang}/gallery`}
                        className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                    >
                        {t("navbar.gallery")}
                    </Link>
                    <Link
                        href={`/${lang}/learn`}
                        className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                    >
                        {t("navbar.learn")}
                    </Link>
                    <Link
                        href={`/${lang}/docs`}
                        className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                    >
                        {t("navbar.docs")}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
