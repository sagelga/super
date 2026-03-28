"use client";

import React from "react";
import BottomSheet from "./ui/BottomSheet";
import { useTranslations } from "next-intl";
import "./LanguageSwitcherModal.style.css";

interface LanguageOption {
    code: string;
    label: string;
    flag: string;
}

const languageOptions: LanguageOption[] = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "th", label: "ไทย", flag: "🇹🇭" },
    { code: "zh", label: "中文", flag: "🇨🇳" },
];

interface LanguageSwitcherModalProps {
    currentLang: string;
    onClose: () => void;
    onLanguageSelect: (lang: string) => void;
}

const LanguageSwitcherModal: React.FC<LanguageSwitcherModalProps> = ({
    currentLang,
    onClose,
    onLanguageSelect,
}) => {
    const t = useTranslations("common");

    const handleSelect = (code: string) => {
        onLanguageSelect(code);
    };

    return (
        <BottomSheet
            isOpen={true}
            onClose={onClose}
            title={t("language.title")}
        >
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
        </BottomSheet>
    );
};

export default LanguageSwitcherModal;
