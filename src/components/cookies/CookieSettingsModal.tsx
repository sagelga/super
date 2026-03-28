"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import BottomSheet from "../ui/BottomSheet";
import { getCookiePreferences, setCookiePreferences } from "@/utils/cookies";
import "./CookieSettingsModal.style.css";

interface CookieSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: () => void;
}

const CookieSettingsModal: React.FC<CookieSettingsModalProps> = ({
    isOpen,
    onClose,
    onSave,
}) => {
    const t = useTranslations("cookies");
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
        onClose();
    };

    if (!mounted) {
        return null;
    }

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title={t("settings.title")}
        >
            <div className="cookie-settings-list">
                {/* Functional Cookies */}
                <div className="cookie-category">
                    <div className="cookie-category-header">
                        <div className="cookie-category-info">
                            <h3 className="cookie-category-name">
                                {t("categories.functional.name")}
                            </h3>
                            <span className="cookie-category-badge">
                                {t("categories.required")}
                            </span>
                        </div>
                        <div className="cookie-category-toggle disabled">
                            <div className="toggle-track toggle-on">
                                <div className="toggle-thumb" />
                            </div>
                        </div>
                    </div>
                    <p className="cookie-category-description">
                        {t("categories.functional.description")}
                    </p>
                </div>

                {/* Analytics Cookies */}
                <div className="cookie-category">
                    <div className="cookie-category-header">
                        <div className="cookie-category-info">
                            <h3 className="cookie-category-name">
                                {t("categories.analytics.name")}
                            </h3>
                        </div>
                        <button
                            onClick={() => handleToggle("analytics")}
                            className="cookie-category-toggle"
                            role="switch"
                            aria-checked={preferences.analytics}
                            aria-label={t("categories.analytics.name")}
                        >
                            <div
                                className={`toggle-track ${preferences.analytics ? "toggle-on" : ""}`}
                            >
                                <div className="toggle-thumb" />
                            </div>
                        </button>
                    </div>
                    <p className="cookie-category-description">
                        {t("categories.analytics.description")}
                    </p>
                </div>
            </div>

            {/* Learn More Link */}
            <div className="cookie-settings-footer">
                <p className="cookie-learn-more">
                    {t("settings.learn_more")}
                    <a
                        href="/privacy-policy"
                        className="cookie-learn-more-link"
                        onClick={onClose}
                    >
                        {t("links.privacy_policy")}
                    </a>
                </p>
            </div>

            {/* Save Button */}
            <div className="cookie-settings-actions">
                <button onClick={handleSave} className="cookie-save-btn">
                    {t("buttons.save_preferences")}
                </button>
            </div>
        </BottomSheet>
    );
};

export default CookieSettingsModal;
