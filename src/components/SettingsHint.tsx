"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { X } from "lucide-react";

function SettingsHint() {
    const t = useTranslations("common");
    const [showHint, setShowHint] = useState(false);
    const [isDismissing, setIsDismissing] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        const showTimer = setTimeout(() => setShowHint(true), 3000);
        const hideTimer = setTimeout(() => dismissHint(), 11000);
        return () => {
            clearTimeout(showTimer);
            clearTimeout(hideTimer);
        };
    }, []);

    const dismissHint = () => {
        setIsDismissing(true);
        setTimeout(() => {
            setShowHint(false);
            setIsDismissing(false);
        }, 200);
    };

    if (!showHint) return null;

    return (
        <div
            className={`navbar-hint absolute top-full right-0 z-50 mt-3 w-56 border border-rim bg-surface p-3 shadow-xl ${isDismissing ? "dismissing" : ""}`}
        >
            <div className="navbar-hint-caret" />
            <button
                onClick={dismissHint}
                className="hover:text-cream absolute top-2 right-2 text-muted transition-colors duration-150"
                aria-label="Dismiss"
            >
                <X width={12} height={12} />
            </button>
            <p className="text-cream mb-1 text-xs font-medium tracking-wide">
                {t("language.label")}
            </p>
            <p className="text-xs leading-relaxed text-muted">
                {t("settings.hint_description")}
            </p>
        </div>
    );
}

export default SettingsHint;
