"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { CloseIcon } from "./icons";

function SettingsHint() {
    const t = useTranslations("common");
    const [showHint, setShowHint] = useState(false);
    const [isDismissing, setIsDismissing] = useState(false);

    const dismissHint = () => {
        setIsDismissing(true);
        setTimeout(() => {
            setShowHint(false);
            setIsDismissing(false);
        }, 200);
    };

    useEffect(() => {
        if (typeof window === "undefined") return;
        const showTimer = setTimeout(() => setShowHint(true), 3000);
        const hideTimer = setTimeout(() => dismissHint(), 11000);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    if (!showHint) return null;

    return (
        <div
            className={`navbar-hint absolute top-full right-0 z-50 mt-3 w-56 border border-rim bg-surface p-3 shadow-xl ${isDismissing ? "dismissing" : ""}`}
        >
            <div className="navbar-hint-caret" />
            <button
                onClick={dismissHint}
                className="absolute top-2 right-2 text-muted transition-colors duration-150 hover:text-cream"
                aria-label="Dismiss"
            >
                <CloseIcon width={12} height={12} />
            </button>
            <p className="mb-1 text-xs font-medium tracking-wide text-cream">
                {t("language.label")}
            </p>
            <p className="text-xs leading-relaxed text-muted">
                {t("settings.hint_description")}
            </p>
        </div>
    );
}

export default SettingsHint;
