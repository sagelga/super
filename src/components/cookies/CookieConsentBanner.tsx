"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getCookiePreferences, setCookiePreferences } from "@/utils/cookies";
import BottomSheet from "../ui/BottomSheet";
import { useSettings } from "../settings/SettingsProvider";

const CookieConsentBanner: React.FC = () => {
    const t = useTranslations("cookies");
    const { openSettings } = useSettings();
    const [isVisible, setIsVisible] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const preferences = getCookiePreferences();
        if (preferences.consentGiven) return;

        const show = () => {
            setMounted(true);
            setIsVisible(true);
        };

        const interactionEvents = ["scroll", "pointerdown", "keydown", "touchstart"] as const;

        const onInteraction = () => {
            interactionEvents.forEach((e) => window.removeEventListener(e, onInteraction));
            if (idleId !== undefined) {
                (window as Window & typeof globalThis & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId);
            }
            show();
        };

        let idleId: number | undefined;
        if ("requestIdleCallback" in window) {
            idleId = (window as Window & typeof globalThis & { requestIdleCallback: (cb: () => void) => number }).requestIdleCallback(show);
        } else {
            idleId = (window as Window).setTimeout(show, 2000) as unknown as number;
        }

        interactionEvents.forEach((e) => window.addEventListener(e, onInteraction, { once: true, passive: true }));

        return () => {
            interactionEvents.forEach((e) => window.removeEventListener(e, onInteraction));
            if (idleId !== undefined) {
                if ("cancelIdleCallback" in window) {
                    (window as Window & typeof globalThis & { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
                } else {
                    clearTimeout(idleId as unknown as ReturnType<typeof setTimeout>);
                }
            }
        };
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

    const handleOpenSettings = () => {
        setIsVisible(false);
        openSettings("privacy");
    };

    if (!mounted) return null;

    return (
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
                        onClick={handleOpenSettings}
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
    );
};

export default CookieConsentBanner;
