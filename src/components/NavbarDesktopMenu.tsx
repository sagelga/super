"use client";

import { useState } from "react";
import Link from "next/link";
import { Languages } from "lucide-react";
import SettingsHint from "./SettingsHint";

interface NavbarDesktopMenuProps {
  isHomeActive: boolean;
  isBlogActive: boolean;
  isGalleryActive: boolean;
  isLearnActive: boolean;
  isDocsActive: boolean;
  globePulsing: boolean;
  p: (path: string) => string;
  t: (key: string) => string;
  onLanguageClick: () => void;
}

export default function NavbarDesktopMenu({
  isHomeActive,
  isBlogActive,
  isGalleryActive,
  isLearnActive,
  isDocsActive,
  globePulsing,
  p,
  t,
  onLanguageClick,
}: NavbarDesktopMenuProps) {
  const [isHomeMenuOpen, setIsHomeMenuOpen] = useState(false);

  return (
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

      <div className="relative">
        <button
          onClick={onLanguageClick}
          aria-label="Change language"
          className={`hover:text-cream flex h-8 w-8 items-center justify-center text-muted transition-colors duration-200 ${globePulsing ? "navbar-globe-pulsing" : ""}`}
        >
          <Languages width={16} height={16} />
        </button>

        <SettingsHint />
      </div>
    </div>
  );
}
