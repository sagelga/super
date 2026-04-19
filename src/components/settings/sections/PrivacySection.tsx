"use client";

import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { getCookiePreferences, setCookiePreferences } from "@/utils/cookies";
import "./PrivacySection.style.css";

interface PrivacySectionProps {
    onSaved?: () => void;
}

const PrivacySection: React.FC<PrivacySectionProps> = ({ onSaved }) => {
    const t = useTranslations("cookies");
    const [preferences, setPreferences] = useState({
        functional: true,
        analytics: false,
    });

    useEffect(() => {
        const currentPreferences = getCookiePreferences();
        setPreferences({
            functional: currentPreferences.functional,
            analytics: currentPreferences.analytics,
        });
    }, []);

    const handleToggle = (key: keyof typeof preferences) => {
        if (key === "functional") return;
        setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setCookiePreferences({
            ...preferences,
            consentGiven: true,
            consentTimestamp: Date.now(),
        });
        onSaved?.();
    };

    return (
        <>
            <div className="cookie-settings-list">
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

            <div className="cookie-settings-footer">
                <p className="cookie-learn-more">
                    {t("settings.learn_more")}
                    <Link
                        href="/privacy-policy"
                        className="cookie-learn-more-link"
                        onClick={() => onSaved?.()}
                    >
                        {t("links.privacy_policy")}
                    </Link>
                </p>
            </div>

            <div className="cookie-settings-actions">
                <button onClick={handleSave} className="cookie-save-btn">
                    {t("buttons.save_preferences")}
                </button>
            </div>
        </>
    );
};

export default PrivacySection;
