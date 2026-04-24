"use client";

import React, { useCallback, useRef } from "react";
import { useTranslations } from "next-intl";
import BottomSheet from "../ui/BottomSheet";
import AppearanceSection from "./sections/AppearanceSection";
import LanguageSection from "./sections/LanguageSection";
import PrivacySection from "./sections/PrivacySection";
import type { SettingsTab } from "./SettingsProvider";
import "./SettingsModal.style.css";

interface SettingsModalProps {
    isOpen: boolean;
    activeTab: SettingsTab;
    onTabChange: (tab: SettingsTab) => void;
    onClose: () => void;
}

const TAB_ORDER: SettingsTab[] = ["appearance", "language", "privacy"];

const TAB_ICONS: Record<SettingsTab, React.ReactNode> = {
    appearance: (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    ),
    language: (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <line x1="2" y1="12" x2="22" y2="12" />
            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
    ),
    privacy: (
        <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <path d="M8.5 8.5v.01" />
            <path d="M16 15.5v.01" />
            <path d="M12 12v.01" />
            <path d="M11 17v.01" />
            <path d="M7 14v.01" />
        </svg>
    ),
};

const SettingsModal: React.FC<SettingsModalProps> = ({
    isOpen,
    activeTab,
    onTabChange,
    onClose,
}) => {
    const t = useTranslations("common");
    const tabRefs = useRef<Record<SettingsTab, HTMLButtonElement | null>>({
        appearance: null,
        language: null,
        privacy: null,
    });

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
            e.preventDefault();
            const currentIndex = TAB_ORDER.indexOf(activeTab);
            const nextIndex =
                e.key === "ArrowDown"
                    ? (currentIndex + 1) % TAB_ORDER.length
                    : (currentIndex - 1 + TAB_ORDER.length) % TAB_ORDER.length;
            const nextTab = TAB_ORDER[nextIndex];
            onTabChange(nextTab);
            tabRefs.current[nextTab]?.focus();
        },
        [activeTab, onTabChange],
    );

    return (
        <BottomSheet
            isOpen={isOpen}
            onClose={onClose}
            title={t("settings.title")}
        >
            <div className="settings-layout">
                <div
                    className="settings-tabs"
                    role="tablist"
                    aria-label={t("settings.title")}
                    aria-orientation="vertical"
                    onKeyDown={handleKeyDown}
                >
                    {TAB_ORDER.map((tab) => (
                        <button
                            key={tab}
                            ref={(el) => {
                                tabRefs.current[tab] = el;
                            }}
                            role="tab"
                            id={`settings-tab-${tab}`}
                            aria-selected={activeTab === tab}
                            aria-controls={`settings-panel-${tab}`}
                            tabIndex={activeTab === tab ? 0 : -1}
                            className={`settings-tab ${activeTab === tab ? "active" : ""}`}
                            onClick={() => onTabChange(tab)}
                        >
                            <span className="settings-tab-icon">
                                {TAB_ICONS[tab]}
                            </span>
                            {t(`settings.tabs.${tab}`)}
                        </button>
                    ))}
                </div>

                <div
                    key={activeTab}
                    role="tabpanel"
                    id={`settings-panel-${activeTab}`}
                    aria-labelledby={`settings-tab-${activeTab}`}
                    className="settings-panel"
                >
                    {activeTab === "appearance" && (
                        <AppearanceSection onSelected={onClose} />
                    )}
                    {activeTab === "language" && <LanguageSection />}
                    {activeTab === "privacy" && (
                        <PrivacySection onSaved={onClose} />
                    )}
                </div>
            </div>
        </BottomSheet>
    );
};

export default SettingsModal;
