"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

export default function HeroScrollIndicator() {
    const t = useTranslations("home");
    const locale = useLocale();
    const [hidden, setHidden] = useState(false);

    useEffect(() => {
        const onScroll = () => setHidden(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const isLatin = locale === "en";

    return (
        <div
            aria-hidden={hidden}
            className={`enter-fade enter-d6 pointer-events-none fixed bottom-6 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 transition-opacity duration-500 ${
                hidden ? "opacity-0" : "opacity-100"
            }`}
        >
            <span
                className={`text-[0.7rem] text-muted ${
                    isLatin
                        ? "tracking-[0.3em] uppercase"
                        : "tracking-[0.12em]"
                }`}
            >
                {t("hero.scroll_hint")}
            </span>
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-5 w-5 animate-bounce text-accent"
            >
                <line x1="12" y1="5" x2="12" y2="19" />
                <polyline points="5 12 12 19 19 12" />
            </svg>
        </div>
    );
}
