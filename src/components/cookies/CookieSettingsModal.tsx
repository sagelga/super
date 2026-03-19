"use client";

import React, { useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import {
  getCookiePreferences,
  setCookiePreferences,
} from "@/utils/cookies";

interface CookieSettingsModalProps {
  onClose: () => void;
  onSave: () => void;
}

const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({
  onClose,
  onSave,
}) => {
  const t = useTranslations("cookies");
  const locale = useLocale();
  const [preferences, setPreferences] = useState({
    functional: true,
    analytics: false,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const currentPreferences = getCookiePreferences();
    setPreferences({
      functional: currentPreferences.functional,
      analytics: currentPreferences.analytics,
    });

    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleToggle = (key: keyof typeof preferences) => {
    if (key === "functional") return; // Can't toggle functional cookies
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    setCookiePreferences({
      ...preferences,
      consentGiven: true,
      consentTimestamp: Date.now(),
    });
    onSave();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-canvas/80 p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
    >
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-rim bg-surface shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between border-b border-rim bg-surface px-6 py-4">
          <h2
            id="cookie-settings-title"
            className="font-serif text-lg font-semibold text-cream"
          >
            {t("settings.title")}
          </h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-muted transition-colors duration-200 hover:bg-canvas hover:text-cream"
            aria-label={t("settings.close")}
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="mb-6 text-sm text-muted">
            {t("settings.description")}
          </p>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {/* Functional Cookies */}
            <div className="rounded-lg border border-rim bg-canvas p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-1 font-medium text-cream">
                    {t("categories.functional.name")}
                    <span className="ml-2 text-xs text-accent">
                      ({t("categories.required")})
                    </span>
                  </h3>
                  <p className="text-sm text-muted">
                    {t("categories.functional.description")}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="h-6 w-11 rounded-full bg-accent opacity-50"></div>
                    <div className="absolute left-6 top-1 h-4 w-4 rounded-full bg-canvas"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div className="rounded-lg border border-rim bg-canvas p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="mb-1 font-medium text-cream">
                    {t("categories.analytics.name")}
                  </h3>
                  <p className="text-sm text-muted">
                    {t("categories.analytics.description")}
                  </p>
                </div>
                <button
                  onClick={() => handleToggle("analytics")}
                  className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
                    preferences.analytics ? "bg-accent" : "bg-rim"
                  }`}
                  role="switch"
                  aria-checked={preferences.analytics}
                  aria-label={t("categories.analytics.name")}
                >
                  <span
                    className={`absolute top-1 h-4 w-4 rounded-full bg-canvas shadow transition-transform duration-200 ${
                      preferences.analytics
                        ? "left-6 translate-x-0"
                        : "left-1 translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Learn More Link */}
          <div className="mt-6 text-sm text-muted">
            <span>{t("settings.learn_more")}</span>
            <a
              href={`/${locale}/privacy-policy`}
              className="ml-1 text-accent underline hover:text-cream"
              onClick={onClose}
            >
              {t("links.privacy_policy")}
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex justify-end gap-3 border-t border-rim bg-surface px-6 py-4">
          <button
            onClick={onClose}
            className="rounded border border-rim px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
          >
            {t("buttons.cancel")}
          </button>
          <button
            onClick={handleSave}
            className="rounded border border-accent bg-accent px-4 py-2 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent/90"
          >
            {t("buttons.save_preferences")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieSettingsModal;
