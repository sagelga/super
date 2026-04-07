"use client";

import { useState } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ConnectModal from "./ConnectModal";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarReadingProgress from "./NavbarReadingProgress";

function Navbar() {
    const t = useTranslations("common");
    const lang = useLocale();
    const pathname = usePathname();
    const p = (path: string) => (lang === "th" ? path : `/${lang}${path}`);
    const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
    const [showConnect, setShowConnect] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Determine active nav link based on pathname
    const isHomeActive = pathname === p("/") || pathname === `/${lang}`;
    const isBlogActive = pathname.includes("/blog");
    const isGalleryActive = pathname.includes("/gallery");
    const isLearnActive = pathname.includes("/learn");
    const isDocsActive = pathname.includes("/docs");

    // Show progress bar only on long-form reading pages (not listing pages)
    const isBlogPost = isBlogActive && pathname !== p("/blog");
    const isDocsPage = isDocsActive && pathname !== p("/docs");
    const showProgress = isBlogPost || isDocsPage;

    return (
        <nav className="bg-canvas fixed top-0 z-50 w-full border-b border-rim transition-all duration-300">
            <div className="container mx-auto flex h-16 items-center justify-between px-8 lg:px-16">
                {/* Logo */}
                <Link
                    href={p("/")}
                    className="text-cream hover:text-brand font-sans text-sm tracking-[0.15em] uppercase transition-colors duration-200"
                >
                    {t("navbar.name")}
                </Link>

                {/* Nav links — desktop only */}
                <div className="hidden items-center gap-8 lg:flex">
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
                            href={p("/")}
                            aria-haspopup="true"
                            aria-expanded={isHomeMenuOpen}
                            className={`text-sm tracking-wide transition-colors duration-200 ${
                                isHomeActive
                                    ? "text-cream border-b border-accent"
                                    : "hover:text-cream text-muted"
                            }`}
                        >
                            {t("nav.home")}
                        </Link>
                        {isHomeMenuOpen && (
                            <div className="absolute top-full left-1/2 mt-2 min-w-[180px] -translate-x-1/2 border border-rim bg-surface py-2 shadow-xl">
                                <Link
                                    href={p("/#experience")}
                                    className="hover:bg-canvas block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                >
                                    {t("nav.experience")}
                                </Link>
                                <Link
                                    href={p("/#certifications")}
                                    className="hover:bg-canvas block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                >
                                    {t("nav.certifications")}
                                </Link>
                                <Link
                                    href={p("/#projects")}
                                    className="hover:bg-canvas block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                >
                                    {t("nav.projects")}
                                </Link>
                                <Link
                                    href={p("/#volunteering")}
                                    className="hover:bg-canvas block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                >
                                    {t("nav.volunteering")}
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        href={p("/blog")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            isBlogActive
                                ? "text-cream border-b border-accent"
                                : "hover:text-cream text-muted"
                        }`}
                    >
                        {t("nav.blog")}
                    </Link>
                    <Link
                        href={p("/gallery")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            isGalleryActive
                                ? "text-cream border-b border-accent"
                                : "hover:text-cream text-muted"
                        }`}
                    >
                        {t("nav.gallery")}
                    </Link>
                    <Link
                        href={p("/learn")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            isLearnActive
                                ? "text-cream border-b border-accent"
                                : "hover:text-cream text-muted"
                        }`}
                    >
                        {t("nav.learn")}
                    </Link>
                    <Link
                        href={p("/docs")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            isDocsActive
                                ? "text-cream border-b border-accent"
                                : "hover:text-cream text-muted"
                        }`}
                    >
                        {t("nav.docs")}
                    </Link>
                    <button
                        disabled
                        className="text-canvas cursor-not-allowed bg-accent px-3 py-1 text-sm tracking-wide opacity-60"
                    >
                        {t("nav.contact")}
                    </button>
                </div>

                {/* Hamburger button — mobile only */}
                <button
                    className="hover:text-cream flex h-10 w-10 items-center justify-center text-muted transition-colors duration-200 lg:hidden"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                    {isMobileMenuOpen ? (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    ) : (
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="3" y1="6" x2="21" y2="6" />
                            <line x1="3" y1="12" x2="21" y2="12" />
                            <line x1="3" y1="18" x2="21" y2="18" />
                        </svg>
                    )}
                </button>
            </div>

            <NavbarMobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                p={p}
                t={t}
            />

            <NavbarReadingProgress showProgress={showProgress} />

            <ConnectModal
                isOpen={showConnect}
                onClose={() => setShowConnect(false)}
            />
        </nav>
    );
}

export default Navbar;
