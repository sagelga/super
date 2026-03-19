"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { getCookiePreferences, setCookiePreferences } from "@/utils/cookies";
import CookieSettingsModal from "./CookieSettingsModal";

const CookieConsentBanner: React.FC = () => {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const preferences = getCookiePreferences();
    if (!preferences.consentGiven) {
      // Small delay to prevent layout shift
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookiePreferences({
      functional: true,
      analytics: true,
      consentGiven: true,
      consentTimestamp: Date.now(),
    });
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    setCookiePreferences({
      functional: true,
      analytics: false,
      consentGiven: true,
      consentTimestamp: Date.now(),
    });
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    setShowSettings(false);
    setIsVisible(false);
  };

  if (!mounted) {
    return null;
  }

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-50 w-full animate-slide-up px-4 pb-4 sm:px-6 sm:pb-6 lg:px-8 lg:pb-8"
        role="dialog"
        aria-labelledby="cookie-consent-title"
        aria-describedby="cookie-consent-description"
      >
        <div className="mx-auto max-w-7xl rounded-xl border border-rim bg-canvas shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="container mx-auto px-6 py-6 lg:px-8 lg:py-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              {/* Content */}
              <div className="flex-1">
                <h2
                  id="cookie-consent-title"
                  className="mb-2 font-serif text-lg font-semibold text-cream lg:text-xl"
                >
                  {t("banner.title")}
                </h2>
                <p
                  id="cookie-consent-description"
                  className="mb-4 max-w-2xl text-sm text-muted"
                >
                  {t("banner.description")}
                </p>
                <div className="flex flex-wrap gap-2 text-xs text-muted">
                  <Link
                    href={`/${locale}/privacy-policy`}
                    className="text-accent underline hover:text-cream"
                  >
                    {t("links.privacy_policy")}
                  </Link>
                  <span className="text-rim">|</span>
                  <button
                    onClick={() => setShowSettings(true)}
                    className="text-accent underline hover:text-cream"
                  >
                    {t("buttons.settings")}
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2 sm:flex-row lg:flex-col lg:items-end">
                <button
                  onClick={handleAcceptAll}
                  className="rounded border border-accent bg-accent px-4 py-2 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent/90"
                >
                  {t("buttons.accept_all")}
                </button>
                <button
                  onClick={handleRejectAll}
                  className="rounded border border-rim bg-transparent px-4 py-2 text-sm font-medium text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                >
                  {t("buttons.reject_all")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <CookieSettingsModal
          onClose={() => setShowSettings(false)}
          onSave={handleSavePreferences}
        />
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default CookieConsentBanner;
