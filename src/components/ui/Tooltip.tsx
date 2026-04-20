"use client";

import React, { useId, useState } from "react";

type Placement = "top" | "bottom";

interface TooltipProps {
    content: React.ReactNode;
    children: React.ReactNode;
    placement?: Placement;
    className?: string;
}

export default function Tooltip({
    content,
    children,
    placement = "top",
    className = "",
}: TooltipProps) {
    const [open, setOpen] = useState(false);
    const id = useId();

    const positionClasses =
        placement === "top"
            ? "bottom-full mb-2"
            : "top-full mt-2";

    return (
        <span className={`relative inline-flex ${className}`}>
            <span
                tabIndex={0}
                role="button"
                aria-describedby={open ? id : undefined}
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onKeyDown={(e) => {
                    if (e.key === "Escape") setOpen(false);
                }}
                className="cursor-help decoration-dotted decoration-muted/50 underline-offset-4 transition-colors hover:text-accent hover:decoration-accent focus-visible:text-accent"
                style={{ textDecorationLine: "underline" }}
            >
                {children}
            </span>
            <span
                id={id}
                role="tooltip"
                aria-hidden={!open}
                className={`pointer-events-none absolute left-1/2 z-50 w-64 -translate-x-1/2 rounded-sm border border-accent/30 bg-surface px-3 py-2 text-xs leading-relaxed text-text shadow-hover transition-opacity duration-150 ${positionClasses} ${
                    open ? "opacity-100" : "opacity-0"
                }`}
            >
                {content}
            </span>
        </span>
    );
}
