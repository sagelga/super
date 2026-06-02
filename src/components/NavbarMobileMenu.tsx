"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
    SettingsIcon,
    CloseIcon,
    ArrowUpRightIcon,
    ChevronDownIcon,
} from "./icons";
import { useSettings } from "./settings/SettingsProvider";

interface NavbarMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    p: (path: string) => string;
    t: (key: string) => string;
    pathname: string;
    lang: string;
}

interface MobileNavRowProps {
    href: string;
    label: string;
    index: string;
    active: boolean;
    onClick: () => void;
}

function MobileNavRow({
    href,
    label,
    index,
    active,
    onClick,
}: MobileNavRowProps) {
    return (
        <Link
            href={href}
            className={`group flex items-baseline justify-between border-b border-rim/60 py-4 transition-colors duration-200 ${
                active ? "text-cream" : "text-cream/80 hover:text-cream"
            }`}
            onClick={onClick}
        >
            <div className="flex items-baseline gap-4">
                <span
                    className={`font-mono text-xs tracking-[0.2em] tabular-nums ${
                        active ? "text-accent" : "text-muted"
                    }`}
                    aria-hidden="true"
                >
                    {index}
                </span>
                <span className="font-display text-2xl font-semibold tracking-tight">
                    {label}
                </span>
            </div>
            <ArrowUpRightIcon
                width={16}
                height={16}
                aria-hidden="true"
                className={`shrink-0 transition-all duration-200 ${
                    active
                        ? "text-accent"
                        : "text-muted/50 group-hover:text-accent"
                } group-hover:translate-x-0.5 group-hover:-translate-y-0.5`}
            />
        </Link>
    );
}

export default function NavbarMobileMenu({
    isOpen,
    onClose,
    p,
    t,
    pathname,
    lang,
}: NavbarMobileMenuProps) {
    const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);
    const { openSettings } = useSettings();

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const isHomeActive = pathname === p("/") || pathname === `/${lang}`;
    const isBlogActive = pathname.includes("/blog");
    const isGalleryActive = pathname.includes("/gallery");
    const isLearnActive = pathname.includes("/learn");
    const isDocsActive = pathname.includes("/docs");

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-canvas/95 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 right-0 z-50 flex h-dvh w-[88%] max-w-sm flex-col border-l border-rim bg-canvas transition-transform duration-300 ease-out lg:hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Decorative amber dot-grid — top-right corner */}
                <div
                    className="pointer-events-none absolute top-0 right-0 h-48 w-48 opacity-40"
                    style={{
                        backgroundImage:
                            "radial-gradient(circle, rgba(201,148,58,0.18) 1px, transparent 1px)",
                        backgroundSize: "20px 20px",
                        maskImage:
                            "radial-gradient(circle at top right, black, transparent 70%)",
                        WebkitMaskImage:
                            "radial-gradient(circle at top right, black, transparent 70%)",
                    }}
                    aria-hidden="true"
                />

                {/* Header */}
                <div className="relative flex h-16 flex-shrink-0 items-center justify-between border-b border-rim px-7">
                    <Link
                        href={p("/")}
                        className="flex items-baseline"
                        onClick={onClose}
                    >
                        <span className="font-display text-base font-semibold tracking-tight text-cream">
                            {t("navbar.name")}
                        </span>
                        <span className="font-display text-base font-semibold text-accent">
                            .
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="flex h-9 w-9 items-center justify-center border border-rim text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent"
                        aria-label="Close menu"
                    >
                        <CloseIcon width={16} height={16} aria-hidden="true" />
                    </button>
                </div>

                {/* Eyebrow label */}
                <div className="relative flex items-center gap-3 px-7 pt-7 pb-3">
                    <span className="eyebrow">Navigate</span>
                    <span className="h-px flex-1 bg-rim" aria-hidden="true" />
                </div>

                {/* Nav links */}
                <nav className="relative flex flex-1 flex-col overflow-y-auto px-7">
                    {/* Home — expandable */}
                    <div className="border-b border-rim/60">
                        <button
                            className={`group flex w-full items-baseline justify-between py-4 transition-colors duration-200 ${
                                isHomeActive
                                    ? "text-cream"
                                    : "text-cream/80 hover:text-cream"
                            }`}
                            onClick={() => setIsHomeMenuOpen((prev) => !prev)}
                            aria-expanded={isHomeMenuOpen}
                        >
                            <div className="flex items-baseline gap-4">
                                <span
                                    className={`font-mono text-[11px] tracking-[0.2em] tabular-nums ${
                                        isHomeActive
                                            ? "text-accent"
                                            : "text-muted/70"
                                    }`}
                                    aria-hidden="true"
                                >
                                    01
                                </span>
                                <span className="font-display text-2xl font-semibold tracking-tight">
                                    {t("nav.home")}
                                </span>
                            </div>
                            <ChevronDownIcon
                                width={16}
                                height={16}
                                aria-hidden="true"
                                className={`shrink-0 text-muted/60 transition-transform duration-200 ${
                                    isHomeMenuOpen ? "rotate-180" : ""
                                }`}
                            />
                        </button>
                        {isHomeMenuOpen && (
                            <div className="flex flex-col pb-3 pl-10">
                                {[
                                    {
                                        href: p("/#experience"),
                                        label: t("nav.experience"),
                                        idx: "i",
                                    },
                                    {
                                        href: p("/#certifications"),
                                        label: t("nav.certifications"),
                                        idx: "ii",
                                    },
                                    {
                                        href: p("/#projects"),
                                        label: t("nav.projects"),
                                        idx: "iii",
                                    },
                                    {
                                        href: p("/#volunteering"),
                                        label: t("nav.volunteering"),
                                        idx: "iv",
                                    },
                                ].map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="flex items-baseline gap-3 py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                        onClick={onClose}
                                    >
                                        <span
                                            className="font-mono text-[10px] tracking-[0.2em] text-muted/60"
                                            aria-hidden="true"
                                        >
                                            {item.idx}
                                        </span>
                                        <span>{item.label}</span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                    <MobileNavRow
                        href={p("/blog")}
                        label={t("nav.blog")}
                        index="02"
                        active={isBlogActive}
                        onClick={onClose}
                    />
                    <MobileNavRow
                        href={p("/gallery")}
                        label={t("nav.gallery")}
                        index="03"
                        active={isGalleryActive}
                        onClick={onClose}
                    />
                    <MobileNavRow
                        href={p("/learn")}
                        label={t("nav.learn")}
                        index="04"
                        active={isLearnActive}
                        onClick={onClose}
                    />
                    <MobileNavRow
                        href={p("/docs")}
                        label={t("nav.docs")}
                        index="05"
                        active={isDocsActive}
                        onClick={onClose}
                    />
                </nav>

                {/* Bottom actions */}
                <div className="relative flex flex-shrink-0 items-stretch gap-2 border-t border-rim px-7 py-5">
                    <Link
                        href={p("/contact")}
                        className="group flex flex-1 items-center justify-center gap-2 border border-accent/60 px-4 py-3 font-sans text-sm tracking-wide text-accent transition-all duration-200 hover:border-accent hover:bg-accent hover:text-canvas"
                        onClick={onClose}
                    >
                        <span>{t("nav.contact")}</span>
                        <ArrowUpRightIcon
                            width={14}
                            height={14}
                            aria-hidden="true"
                            className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>
                    <button
                        type="button"
                        onClick={() => {
                            onClose();
                            openSettings();
                        }}
                        aria-label="Open settings"
                        className="flex aspect-square items-center justify-center border border-rim px-3 text-muted transition-colors duration-200 hover:border-accent/60 hover:text-accent"
                    >
                        <SettingsIcon width={16} height={16} aria-hidden="true" />
                    </button>
                </div>
            </div>
        </>
    );
}
