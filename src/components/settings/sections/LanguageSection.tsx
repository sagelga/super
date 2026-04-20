"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import "./LanguageSection.style.css";

interface LanguageOption {
    code: string;
    label: string;
    flag: string;
}

const languageOptions: LanguageOption[] = [
    { code: "en", label: "English", flag: "\uD83C\uDDEC\uD83C\uDDE7" },
    { code: "th", label: "ไทย", flag: "\uD83C\uDDF9\uD83C\uDDED" },
    { code: "zh", label: "中文", flag: "\uD83C\uDDE8\uD83C\uDDF3" },
];

const LanguageSection: React.FC = () => {
    const currentLang = useLocale();
    const pathname = usePathname();

    const handleSelect = (newLang: string) => {
        const localeFree = pathname.startsWith(`/${currentLang}`)
            ? pathname.slice(`/${currentLang}`.length) || "/"
            : pathname;
        window.location.href =
            newLang === "th" ? localeFree : `/${newLang}${localeFree}`;
    };

    return (
        <div className="language-switcher-list">
            {languageOptions.map((option) => (
                <button
                    key={option.code}
                    className={`language-option ${currentLang === option.code ? "active" : ""}`}
                    onClick={() => handleSelect(option.code)}
                >
                    <span className="language-flag">{option.flag}</span>
                    <span className="language-label">{option.label}</span>
                    {currentLang === option.code && (
                        <svg
                            className="language-check"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12" />
                        </svg>
                    )}
                </button>
            ))}
        </div>
    );
};

export default LanguageSection;
