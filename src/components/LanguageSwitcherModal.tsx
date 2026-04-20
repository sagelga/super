"use client";

import React from "react";
import BottomSheet from "./ui/BottomSheet";
import SettingsOptionList, { SettingsOption } from "./ui/SettingsOptionList";
import { useTranslations } from "next-intl";

interface LanguageSwitcherModalProps {
    isOpen: boolean;
    currentLang: string;
    onClose: () => void;
    onLanguageSelect: (lang: string) => void;
}

const LanguageSwitcherModal: React.FC<LanguageSwitcherModalProps> = ({
    isOpen,
    currentLang,
    onClose,
    onLanguageSelect,
}) => {
    const t = useTranslations("common");

    const checkmarkIcon = (
        <svg
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
    );

    const languageOptions: SettingsOption[] = [
        {
            id: "en",
            label: "English",
            leading: "🇬🇧",
            trailing: currentLang === "en" ? checkmarkIcon : undefined,
            isActive: currentLang === "en",
            onClick: () => onLanguageSelect("en"),
        },
        {
            id: "th",
            label: "ไทย",
            leading: "🇹🇭",
            trailing: currentLang === "th" ? checkmarkIcon : undefined,
            isActive: currentLang === "th",
            onClick: () => onLanguageSelect("th"),
        },
        {
            id: "zh",
            label: "中文",
            leading: "🇨🇳",
            trailing: currentLang === "zh" ? checkmarkIcon : undefined,
            isActive: currentLang === "zh",
            onClick: () => onLanguageSelect("zh"),
        },
    ];

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title={t("language.title")}
        >
            <SettingsOptionList options={languageOptions} />
        </BottomSheet>
    );
};

export default LanguageSwitcherModal;
