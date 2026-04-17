"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import MemoryMatch from "./MemoryMatch";
import SoloUno from "./SoloUno";

type GameTab = "memory" | "uno";

export default function GameSection() {
    const t = useTranslations("common.games");
    const [active, setActive] = useState<GameTab>("memory");

    return (
        <div>
            {/* Tab row */}
            <div className="mb-8 flex gap-0 border-b border-rim">
                {(["memory", "uno"] as GameTab[]).map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActive(tab)}
                        className={`-mb-px border-b-2 pb-3 pr-7 font-sans text-sm tracking-wide transition-colors duration-150 ${
                            active === tab
                                ? "border-accent text-cream"
                                : "border-transparent text-muted hover:text-cream/70"
                        }`}
                    >
                        {tab === "memory" ? t("memory_match") : t("solo_uno")}
                    </button>
                ))}
            </div>

            {active === "memory" ? <MemoryMatch /> : <SoloUno />}
        </div>
    );
}
