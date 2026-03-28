"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getCookiePreferences, setCookiePreferences } from "@/utils/cookies";
import BottomSheet from "../ui/BottomSheet";
import CookieSettingsModal from "./CookieSettingsModal";

const CookieConsentBanner: React.FC = () => {
    const t = useTranslations("cookies");
    const [isVisible, setIsVisible] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const preferences = getCookiePreferences();
        if (!preferences.consentGiven) {
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

    if (!mounted) return null;

    return (
        <>
            <BottomSheet
                isOpen={isVisible}
                onClose={handleRejectAll}
                title={t("banner.title")}
            >
                <div style={{ padding: "0.25rem" }}>
                    <p className="mb-4 text-sm text-muted">
                        {t("banner.description")}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-3 text-sm">
                        <Link
                            href="/privacy-policy"
                            className="text-accent underline hover:text-cream"
                            onClick={handleRejectAll}
                        >
                            {t("links.privacy_policy")}
                        </Link>
                        <span className="text-muted">|</span>
                        <button
                            onClick={() => setShowSettings(true)}
                            className="text-accent underline hover:text-cream"
                        >
                            {t("buttons.settings")}
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <button
                            onClick={handleAcceptAll}
                            className="w-full rounded-lg border border-accent bg-accent py-3 text-sm font-medium text-canvas transition-colors duration-200 hover:bg-accent/90"
                        >
                            {t("buttons.accept_all")}
                        </button>
                        <button
                            onClick={handleRejectAll}
                            className="w-full rounded-lg border border-rim bg-transparent py-3 text-sm font-medium text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                        >
                            {t("buttons.reject_all")}
                        </button>
                    </div>
                </div>
            </BottomSheet>

            <CookieSettingsModal
                isOpen={showSettings}
                onClose={() => setShowSettings(false)}
                onSave={handleSavePreferences}
            />
        </>
    );
};

export default CookieConsentBanner;
