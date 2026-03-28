"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const Navbar: React.FC = () => {
    const t = useTranslations("common");
    const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
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
                    href="/"
                    className="font-mono text-sm tracking-[0.15em] text-cream uppercase transition-colors duration-200 hover:text-accent"
                >
                    {t("navbar.name")}
                </Link>

                {/* Nav links */}
                <div className="flex items-center gap-8">
                    <div
                        className="relative"
                        onMouseEnter={() => setIsHomeMenuOpen(true)}
                        onMouseLeave={() => setIsHomeMenuOpen(false)}
                        onFocus={() => setIsHomeMenuOpen(true)}
                        onBlur={(e) => {
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                                setIsHomeMenuOpen(false);
                            }
                        }}
                    >
                        <Link
                            href="/"
                            aria-haspopup="true"
                            aria-expanded={isHomeMenuOpen}
                            className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                        >
                            {t("nav.home")}
                        </Link>
                        {isHomeMenuOpen && (
                            <div className="absolute top-full left-1/2 mt-2 min-w-[180px] -translate-x-1/2 border border-rim bg-surface py-2 shadow-xl">
                                <Link
                                    href="/home/experience"
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("nav.experience")}
                                </Link>
                                <Link
                                    href="/home/certifications"
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("nav.certifications")}
                                </Link>
                                <Link
                                    href="/home/projects"
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("nav.projects")}
                                </Link>
                                <Link
                                    href="/home/volunteering"
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("nav.volunteering")}
                                </Link>
                            </div>
                        )}
                    </div>
                    <a
                        href="https://blog.sagelga.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                    >
                        {t("nav.blog")}
                    </a>
                    <span className="cursor-not-allowed text-sm tracking-wide text-muted/40">
                        {t("nav.gallery")}
                    </span>
                    <a
                        href="https://learn.sagelga.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                    >
                        {t("nav.learn")}
                    </a>
                    <a
                        href="https://docs.sagelga.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                    >
                        {t("nav.docs")}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
