"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface NavbarMobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
    p: (path: string) => string;
    t: (key: string) => string;
}

export default function NavbarMobileMenu({
    isOpen,
    onClose,
    p,
    t,
}: NavbarMobileMenuProps) {
    const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    return (
        <>
            {isOpen && (
                <div
                    className="bg-canvas/80 fixed inset-0 z-40 backdrop-blur-sm lg:hidden"
                    onClick={onClose}
                />
            )}

            <div
                className={`bg-canvas fixed top-0 right-0 bottom-0 z-50 flex w-72 flex-col border-l border-rim transition-transform duration-300 ease-in-out lg:hidden ${
                    isOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-rim px-8">
                    <Link
                        href={p("/")}
                        className="text-cream font-sans text-sm tracking-[0.15em] uppercase"
                        onClick={onClose}
                    >
                        {t("navbar.name")}
                    </Link>
                    <button
                        onClick={onClose}
                        className="hover:text-cream text-muted transition-colors duration-200"
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
                            className="hover:text-cream flex w-full items-center justify-between py-3 text-sm tracking-wide text-muted transition-colors duration-200"
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
                                    href={p("/#experience")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={onClose}
                                >
                                    {t("nav.experience")}
                                </Link>
                                <Link
                                    href={p("/#certifications")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={onClose}
                                >
                                    {t("nav.certifications")}
                                </Link>
                                <Link
                                    href={p("/#projects")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={onClose}
                                >
                                    {t("nav.projects")}
                                </Link>
                                <Link
                                    href={p("/#volunteering")}
                                    className="block py-2 text-sm tracking-wide text-muted transition-colors duration-150 hover:text-accent"
                                    onClick={onClose}
                                >
                                    {t("nav.volunteering")}
                                </Link>
                            </div>
                        )}
                    </div>
                    <Link
                        href={p("/blog")}
                        className="hover:text-cream block py-3 text-sm tracking-wide text-muted transition-colors duration-200"
                        onClick={onClose}
                    >
                        {t("nav.blog")}
                    </Link>
                    <Link
                        href={p("/gallery")}
                        className="hover:text-cream block py-3 text-sm tracking-wide text-muted transition-colors duration-200"
                        onClick={onClose}
                    >
                        {t("nav.gallery")}
                    </Link>
                    <Link
                        href={p("/learn")}
                        className="hover:text-cream block py-3 text-sm tracking-wide text-muted transition-colors duration-200"
                        onClick={onClose}
                    >
                        {t("nav.learn")}
                    </Link>
                    <Link
                        href={p("/docs")}
                        className="hover:text-cream block py-3 text-sm tracking-wide text-muted transition-colors duration-200"
                        onClick={onClose}
                    >
                        {t("nav.docs")}
                    </Link>
                </nav>

                {/* Bottom actions */}
                <div className="flex-shrink-0 space-y-3 border-t border-rim px-8 py-6">
                    <Link
                        href={p("/contact")}
                        className="hover:text-cream block py-3 text-sm tracking-wide text-muted transition-colors duration-200"
                        onClick={onClose}
                    >
                        {t("nav.contact")}
                    </Link>
                    <button
                        disabled
                        className="text-canvas w-full cursor-not-allowed bg-accent px-3 py-2 text-left text-sm tracking-wide opacity-60"
                    >
                        {t("nav.contact")}
                    </button>
                </div>
            </div>
        </>
    );
}
