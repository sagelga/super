"use client";

import { useState, useEffect } from "react";

interface NavbarReadingProgressProps {
    showProgress: boolean;
}

export default function NavbarReadingProgress({
    showProgress,
}: NavbarReadingProgressProps) {
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        if (!showProgress) return;
        const update = () => {
            const total =
                document.documentElement.scrollHeight - window.innerHeight;
            setReadingProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
        };
        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, [showProgress]);

    if (!showProgress) return null;

    return (
        <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-px bg-accent transition-[width] duration-100 ease-out"
            style={{ width: `${readingProgress}%` }}
        />
    );
}
