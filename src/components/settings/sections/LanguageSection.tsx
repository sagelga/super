"use client";

import React from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import "./LanguageSection.style.css";

interface LanguageOption {
    code: string;
    label: string;
    icon: React.ReactNode;
}

const FlagEN = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 40" width="28" height="20">
        <rect fill="#012169" width="60" height="40" />
        <path stroke="#fff" strokeWidth="8" d="M0,0 L60,40 M60,0 L0,40" />
        <path stroke="#C8102E" strokeWidth="5" d="M0,0 L60,40 M60,0 L0,40" />
        <rect fill="#fff" x="24" width="12" height="40" />
        <rect fill="#fff" y="14" width="60" height="12" />
        <rect fill="#C8102E" x="26" width="8" height="40" />
        <rect fill="#C8102E" y="16" width="60" height="8" />
    </svg>
);

const FlagTH = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="28" height="20">
        <rect fill="#A51931" width="900" height="600" />
        <rect fill="#F4F5F8" y="100" width="900" height="400" />
        <rect fill="#2D2A4A" y="200" width="900" height="200" />
    </svg>
);

const FlagZH = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="28" height="20">
        <rect fill="#DE2910" width="900" height="600" />
        <polygon fill="#FFDE00" points="150,75 180,165 270,165 200,215 225,305 150,255 75,305 100,215 30,165 120,165" />
        <polygon fill="#FFDE00" points="300,30 315,75 360,60 330,95 365,120 318,115 315,162 290,122 245,130 272,95 250,60 290,78" transform="rotate(25, 315, 90)" />
        <polygon fill="#FFDE00" points="360,120 375,165 420,150 390,185 425,210 378,205 375,252 350,212 305,220 332,185 310,150 350,168" transform="rotate(5, 375, 165)" />
        <polygon fill="#FFDE00" points="360,210 375,255 420,240 390,275 425,300 378,295 375,342 350,302 305,310 332,275 310,240 350,258" transform="rotate(-5, 375, 255)" />
        <polygon fill="#FFDE00" points="300,285 315,330 360,315 330,350 365,375 318,370 315,417 290,377 245,385 272,350 250,315 290,333" transform="rotate(-25, 315, 330)" />
    </svg>
);

const languageOptions: LanguageOption[] = [
    { code: "en", label: "English", icon: <FlagEN /> },
    { code: "th", label: "ไทย", icon: <FlagTH /> },
    { code: "zh", label: "中文", icon: <FlagZH /> },
];

const LanguageSection: React.FC = () => {
    const currentLang = useLocale();
    const pathname = usePathname();

    const handleSelect = (newLang: string) => {
        const localeFree = pathname.startsWith(`/${currentLang}`)
            ? pathname.slice(`/${currentLang}`.length) || "/"
            : pathname;
        const newPath = newLang === "th" ? localeFree : `/${newLang}${localeFree}`;
        // Full reload ensures all locale content refreshes correctly
        // eslint-disable-next-line react-hooks/immutability
        window.location.href = newPath;
    };

    return (
        <div className="language-switcher-list">
            {languageOptions.map((option) => (
                <button
                    key={option.code}
                    className={`language-option ${currentLang === option.code ? "active" : ""}`}
                    onClick={() => handleSelect(option.code)}
                >
                    <span className="language-option-icon">{option.icon}</span>
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
