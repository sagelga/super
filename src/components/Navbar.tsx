"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { X, Menu } from "lucide-react";
import ConnectModal from "./ConnectModal";
import NavbarMobileMenu from "./NavbarMobileMenu";
import NavbarDesktopMenu from "./NavbarDesktopMenu";
import NavbarReadingProgress from "./NavbarReadingProgress";
import LanguageSwitcherModal from "./LanguageSwitcherModal";
import "./Navbar.style.css";

function Navbar() {
  const t = useTranslations("common");
  const lang = useLocale();
  const pathname = usePathname();
  const p = (path: string) => (lang === "th" ? path : `/${lang}${path}`);
  const [showConnect, setShowConnect] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLanguageSwitcher, setShowLanguageSwitcher] = useState(false);
  const [globePulsing, setGlobePulsing] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const pulseTimer = setTimeout(() => setGlobePulsing(true), 2000);
    const hideTimer = setTimeout(() => setGlobePulsing(false), 3000);
    return () => {
      clearTimeout(pulseTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const handleLanguageSelect = (newLang: string) => {
    const localeFree = pathname.startsWith(`/${lang}`)
      ? pathname.slice(`/${lang}`.length) || "/"
      : pathname;
    window.location.href =
      newLang === "th" ? localeFree : `/${newLang}${localeFree}`;
  };

  const isHomeActive = pathname === p("/") || pathname === `/${lang}`;
  const isBlogActive = pathname.includes("/blog");
  const isGalleryActive = pathname.includes("/gallery");
  const isLearnActive = pathname.includes("/learn");
  const isDocsActive = pathname.includes("/docs");

  const isBlogPost = isBlogActive && pathname !== p("/blog");
  const isDocsPage = isDocsActive && pathname !== p("/docs");
  const showProgress = isBlogPost || isDocsPage;

  return (
    <nav className="bg-canvas fixed top-0 z-50 w-full border-b border-rim transition-all duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-8 lg:px-16">
        <Link
          href={p("/")}
          className="text-cream hover:text-brand font-sans text-sm tracking-[0.15em] uppercase transition-colors duration-200"
        >
          {t("navbar.name")}
        </Link>

        <NavbarDesktopMenu
          isHomeActive={isHomeActive}
          isBlogActive={isBlogActive}
          isGalleryActive={isGalleryActive}
          isLearnActive={isLearnActive}
          isDocsActive={isDocsActive}
          globePulsing={globePulsing}
          p={p}
          t={t}
          onLanguageClick={() => setShowLanguageSwitcher(true)}
        />

        <button
          className="hover:text-cream flex h-10 w-10 items-center justify-center text-muted transition-colors duration-200 lg:hidden"
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
      />

      <NavbarReadingProgress showProgress={showProgress} />

      <ConnectModal
        isOpen={showConnect}
        onClose={() => setShowConnect(false)}
      />

      <LanguageSwitcherModal
        isOpen={showLanguageSwitcher}
        currentLang={lang}
        onClose={() => setShowLanguageSwitcher(false)}
        onLanguageSelect={handleLanguageSelect}
      />
    </nav>
  );
}

export default Navbar;
