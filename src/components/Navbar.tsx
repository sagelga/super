"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Settings, X, Menu, ArrowUpRight } from "lucide-react";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarReadingProgress from "./NavbarReadingProgress";
import SettingsHint from "./SettingsHint";
import { useSettings } from "./settings/SettingsProvider";
import "./Navbar.style.css";

interface NavItemProps {
    href: string;
    label: string;
    index: string;
    active: boolean;
}

function NavItem({ href, label, index, active }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`navbar-link group relative inline-flex items-baseline gap-1.5 py-1 text-sm tracking-wide transition-colors duration-200 ${
                active ? "text-cream" : "text-muted hover:text-cream"
            }`}
        >
            <span
                className={`font-mono text-[10px] tracking-[0.15em] tabular-nums transition-colors duration-200 ${
                    active
                        ? "text-accent"
                        : "text-muted/60 group-hover:text-accent/80"
                }`}
                aria-hidden="true"
            >
                {index}
            </span>
            <span>{label}</span>
            <span
                className={`navbar-rule pointer-events-none absolute right-0 -bottom-0.5 left-0 h-px bg-accent transition-transform duration-300 ease-out ${
                    active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}
                aria-hidden="true"
            />
        </Link>
    );
}

function Navbar() {
    const t = useTranslations("common");
    const lang = useLocale();
    const pathname = usePathname();
    const p = (path: string) => (lang === "th" ? path : `/${lang}${path}`);
    const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [globePulsing, setGlobePulsing] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { openSettings } = useSettings();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const pulseTimer = setTimeout(() => setGlobePulsing(true), 2000);
        const hideTimer = setTimeout(() => setGlobePulsing(false), 3000);
        return () => {
            clearTimeout(pulseTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const onScroll = () => setIsScrolled(window.scrollY > 8);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

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
        <nav
            className={`fixed top-0 z-50 w-full border-b bg-canvas/95 backdrop-blur-sm transition-all duration-300 ${
                isScrolled
                    ? "border-rim shadow-[0_1px_0_0_rgba(201,148,58,0.08)]"
                    : "border-transparent"
            }`}
        >
            <div className="container mx-auto flex h-16 items-center justify-between px-8 lg:px-16">
                {/* Logo — serif name with amber dot flourish */}
                <Link
                    href={p("/")}
                    className="group flex items-baseline gap-0 transition-opacity duration-200 hover:opacity-90"
                    aria-label={t("navbar.name")}
                >
                    <span className="font-display text-lg font-semibold tracking-tight text-cream">
                        {t("navbar.name")}
                    </span>
                    <span className="font-display text-lg font-semibold text-accent transition-transform duration-200 group-hover:translate-x-0.5">
                        .
                    </span>
                </Link>

                {/* Nav links — desktop only */}
                <div className="hidden items-center gap-8 lg:flex">
                    <div className="flex items-center gap-7">
                        <div
                            className="relative"
                            onMouseEnter={() => setIsHomeMenuOpen(true)}
                            onMouseLeave={() => setIsHomeMenuOpen(false)}
                            onFocus={() => setIsHomeMenuOpen(true)}
                            onBlur={(e) => {
                                if (
                                    !e.currentTarget.contains(e.relatedTarget)
                                ) {
                                    setIsHomeMenuOpen(false);
                                }
                            }}
                        >
                            <NavItem
                                href={p("/")}
                                label={t("nav.home")}
                                index="01"
                                active={isHomeActive}
                            />
                            {isHomeMenuOpen && (
                                <div className="navbar-dropdown absolute top-full left-1/2 mt-3 min-w-[220px] -translate-x-1/2 border border-rim bg-surface py-2 shadow-xl">
                                    <span
                                        className="absolute -top-[7px] left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-t border-l border-rim bg-surface"
                                        aria-hidden="true"
                                    />
                                    <div className="relative">
                                        <DropdownLink
                                            href={p("/#experience")}
                                            label={t("nav.experience")}
                                            index="i"
                                        />
                                        <DropdownLink
                                            href={p("/#certifications")}
                                            label={t("nav.certifications")}
                                            index="ii"
                                        />
                                        <DropdownLink
                                            href={p("/#projects")}
                                            label={t("nav.projects")}
                                            index="iii"
                                        />
                                        <DropdownLink
                                            href={p("/#volunteering")}
                                            label={t("nav.volunteering")}
                                            index="iv"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                        <NavItem
                            href={p("/blog")}
                            label={t("nav.blog")}
                            index="02"
                            active={isBlogActive}
                        />
                        <NavItem
                            href={p("/gallery")}
                            label={t("nav.gallery")}
                            index="03"
                            active={isGalleryActive}
                        />
                        <NavItem
                            href={p("/learn")}
                            label={t("nav.learn")}
                            index="04"
                            active={isLearnActive}
                        />
                        <NavItem
                            href={p("/docs")}
                            label={t("nav.docs")}
                            index="05"
                            active={isDocsActive}
                        />
                    </div>

                    {/* Vertical rule — hand-drawn separator */}
                    <span className="h-5 w-px bg-rim" aria-hidden="true" />

                    <div className="flex items-center gap-3">
                        <Link
                            href={p("/contact")}
                            className="group inline-flex items-center gap-2 border border-accent/50 px-4 py-1.5 font-sans text-sm tracking-wide text-accent transition-all duration-200 hover:border-accent hover:bg-accent hover:text-canvas"
                        >
                            <span>{t("nav.contact")}</span>
                            <ArrowUpRight
                                width={14}
                                height={14}
                                aria-hidden="true"
                                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            />
                        </Link>

                        <div className="relative">
                            <button
                                onClick={() => openSettings()}
                                aria-label="Open settings"
                                className={`flex h-9 w-9 items-center justify-center border border-rim text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent ${globePulsing ? "navbar-globe-pulsing" : ""}`}
                            >
                                <Settings
                                    width={15}
                                    height={15}
                                    aria-hidden="true"
                                />
                            </button>

                            <SettingsHint />
                        </div>
                    </div>
                </div>

                {/* Hamburger button — mobile only */}
                <button
                    className="flex h-10 w-10 items-center justify-center border border-transparent text-muted transition-colors duration-200 hover:border-rim hover:text-cream lg:hidden"
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    aria-expanded={isMobileMenuOpen}
                    onClick={() => setIsMobileMenuOpen((prev) => !prev)}
                >
                    {isMobileMenuOpen ? (
                        <X width={20} height={20} />
                    ) : (
                        <Menu width={20} height={20} />
                    )}
                </button>
            </div>

            <NavbarMobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                p={p}
                t={t}
                pathname={pathname}
                lang={lang}
            />

            <NavbarReadingProgress showProgress={showProgress} />
        </nav>
    );
}

function DropdownLink({
    href,
    label,
    index,
}: {
    href: string;
    label: string;
    index: string;
}) {
    return (
        <Link
            href={href}
            className="group flex items-baseline gap-3 px-5 py-2.5 text-sm tracking-wide text-muted transition-colors duration-150 hover:bg-canvas hover:text-accent"
        >
            <span
                className="font-mono text-[10px] tracking-[0.2em] text-muted/60 group-hover:text-accent"
                aria-hidden="true"
            >
                {index}
            </span>
            <span>{label}</span>
        </Link>
    );
}

export default Navbar;
