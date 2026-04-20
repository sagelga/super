"use client";

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState,
} from "react";
import dynamic from "next/dynamic";

export type SettingsTab = "appearance" | "language" | "privacy";

interface SettingsContextType {
    openSettings: (tab?: SettingsTab) => void;
    closeSettings: () => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(
    undefined,
);

const SettingsModal = dynamic(() => import("./SettingsModal"), {
    ssr: false,
    loading: () => null,
});

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<SettingsTab>("appearance");
    const [hasEverOpened, setHasEverOpened] = useState(false);

    const openSettings = useCallback((tab: SettingsTab = "appearance") => {
        setActiveTab(tab);
        setIsOpen(true);
        setHasEverOpened(true);
    }, []);

    const closeSettings = useCallback(() => {
        setIsOpen(false);
    }, []);

    const value = useMemo(
        () => ({ openSettings, closeSettings }),
        [openSettings, closeSettings],
    );

    return (
        <SettingsContext.Provider value={value}>
            {children}
            {hasEverOpened && (
                <SettingsModal
                    isOpen={isOpen}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    onClose={closeSettings}
                />
            )}
        </SettingsContext.Provider>
    );
};

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
