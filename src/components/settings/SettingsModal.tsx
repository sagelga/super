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
            if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
            e.preventDefault();
            const currentIndex = TAB_ORDER.indexOf(activeTab);
            const nextIndex =
                e.key === "ArrowRight"
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
            <div
                className="settings-tabs"
                role="tablist"
                aria-label={t("settings.title")}
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
                        {t(`settings.tabs.${tab}`)}
                    </button>
                ))}
            </div>

            <div
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
        </BottomSheet>
    );
};

export default SettingsModal;
