"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import ConnectModal from "./ConnectModal";

const Navbar: React.FC = () => {
    const t = useTranslations("common");
    const lang = useLocale();
    const pathname = usePathname();
    const p = (path: string) => (lang === "th" ? path : `/${lang}${path}`);
    const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [showConnect, setShowConnect] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Determine active nav link based on pathname
    const isHomeActive = pathname === p("/") || pathname === `/${lang}`;
    const isBlogActive = pathname.includes("/blog");
    const isGalleryActive = pathname.includes("/gallery");
    const isLearnActive = pathname.includes("/learn");
    const isDocsActive = pathname.includes("/docs");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        handleScroll(); // seed initial state
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isMobileMenuOpen]);

    return (
        <nav
            className={`fixed top-0 z-50 w-full transition-all duration-300 ${
                scrolled ? "border-b border-rim bg-canvas" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-8 lg:px-16">
                {/* Logo */}
                <Link
                    href={p("/")}
                    className="font-sans text-sm tracking-[0.15em] text-cream uppercase transition-colors duration-200 hover:text-brand"
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
                                    ? "border-b border-accent text-cream"
                                    : "text-muted hover:text-cream"
                            }`}
                        >
                            {t("nav.home")}
                        </Link>
                        {isHomeMenuOpen && (
                            <div className="absolute top-full left-1/2 mt-2 min-w-[180px] -translate-x-1/2 border border-rim bg-surface py-2 shadow-xl">
                                <Link
                                    href={p("/home/experience")}
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("nav.experience")}
                                </Link>
                                <Link
                                    href={p("/home/certifications")}
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("nav.certifications")}
                                </Link>
                                <Link
                                    href={p("/home/projects")}
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
                                >
                                    {t("nav.projects")}
                                </Link>
                                <Link
                                    href={p("/home/volunteering")}
                                    className="block px-5 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
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
                                ? "border-b border-accent text-cream"
                                : "text-muted hover:text-cream"
                        }`}
                    >
                        {t("nav.blog")}
                    </Link>
                    <Link
                        href={p("/gallery")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            isGalleryActive
                                ? "border-b border-accent text-cream"
                                : "text-muted hover:text-cream"
                        }`}
                    >
                        {t("nav.gallery")}
                    </Link>
                    <Link
                        href={p("/learn")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            isLearnActive
                                ? "border-b border-accent text-cream"
                                : "text-muted hover:text-cream"
                        }`}
                    >
                        {t("nav.learn")}
                    </Link>
                    <Link
                        href={p("/docs")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            isDocsActive
                                ? "border-b border-accent text-cream"
                                : "text-muted hover:text-cream"
                        }`}
                    >
                        {t("nav.docs")}
                    </Link>
                    <Link
                        href={p("/contact")}
                        className={`text-sm tracking-wide transition-colors duration-200 ${
                            pathname.includes("/contact")
                                ? "border-b border-accent text-cream"
                                : "text-muted hover:text-cream"
                        }`}
                    >
                        {t("nav.contact")}
                    </Link>
                    <button
                        disabled
                        className="cursor-not-allowed bg-accent px-3 py-1 text-sm tracking-wide text-canvas opacity-60"
                    >
                        {t("nav.contact")}
                    </button>
                </div>

                {/* Hamburger button — mobile only */}
                <button
                    className="flex h-10 w-10 items-center justify-center text-muted transition-colors duration-200 hover:text-cream lg:hidden"
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

            {/* Mobile menu backdrop */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 bg-canvas/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile menu drawer */}
            <div
                className={`fixed top-0 right-0 bottom-0 z-50 flex w-72 flex-col border-l border-rim bg-canvas transition-transform duration-300 ease-in-out lg:hidden ${
                    isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Drawer header */}
                <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-rim px-8">
                    <Link
                        href={p("/")}
                        className="font-sans text-sm tracking-[0.15em] text-cream uppercase"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t("navbar.name")}
                    </Link>
                    <button
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-muted transition-colors duration-200 hover:text-cream"
                        aria-label="Close menu"
                    >
                        <svg
                            width="18"
                            height="18"
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
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-8 py-6">
                    {/* Home — expandable */}
                    <div>
                        <button
                            className="flex w-full items-center justify-between py-3 text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                            onClick={() => setIsHomeMenuOpen((prev) => !prev)}
                        >
                            {t("nav.home")}
                            <svg
                                className={`h-3.5 w-3.5 transition-transform duration-200 ${isHomeMenuOpen ? "rotate-180" : ""}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {isHomeMenuOpen && (
                            <div className="flex flex-col gap-1 pb-2 pl-4">
                                <Link
                                    href={p("/home/experience")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t("nav.experience")}
                                </Link>
                                <Link
                                    href={p("/home/certifications")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t("nav.certifications")}
                                </Link>
                                <Link
                                    href={p("/home/projects")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t("nav.projects")}
                                </Link>
                                <Link
                                    href={p("/home/volunteering")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {t("nav.volunteering")}
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        href={p("/blog")}
                        className="block py-3 text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t("nav.blog")}
                    </Link>
                    <Link
                        href={p("/gallery")}
                        className="block py-3 text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t("nav.gallery")}
                    </Link>
                    <Link
                        href={p("/learn")}
                        className="block py-3 text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t("nav.learn")}
                    </Link>
                    <Link
                        href={p("/docs")}
                        className="block py-3 text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t("nav.docs")}
                    </Link>
                </nav>

                {/* Profiles and auth buttons at bottom */}
                <div className="flex-shrink-0 space-y-3 border-t border-rim px-8 py-6">
                    <Link
                        href={p("/contact")}
                        className="block py-3 text-sm tracking-wide text-muted transition-colors duration-200 hover:text-cream"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        {t("nav.contact")}
                    </Link>
                    <button
                        disabled
                        className="w-full cursor-not-allowed bg-accent px-3 py-2 text-left text-sm tracking-wide text-canvas opacity-60"
                    >
                        {t("nav.contact")}
                    </button>
                </div>
            </div>

            <ConnectModal
                isOpen={showConnect}
                onClose={() => setShowConnect(false)}
            />
        </nav>
    );
};

export default Navbar;
