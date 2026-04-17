"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { GALLERY_ITEMS, imageUrl, type GalleryItem } from "@/data/galleryItems";

type Category = "all" | "projects" | "photography" | "design";

const ITEMS = GALLERY_ITEMS;

function CloseIcon() {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    );
}

function ChevronIcon({ dir }: { dir: "left" | "right" }) {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d={dir === "left" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"} />
        </svg>
    );
}

export default function GalleryPage() {
    const t = useTranslations("common");
    const [active, setActive] = useState<Category>("all");
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    const filtered =
        active === "all" ? ITEMS : ITEMS.filter((i) => i.category === active);

    const navigate = useCallback(
        (dir: 1 | -1) => {
            if (!lightbox) return;
            const idx = filtered.findIndex((i) => i.id === lightbox.id);
            const next =
                filtered[(idx + dir + filtered.length) % filtered.length];
            setLightbox(next);
        },
        [lightbox, filtered],
    );

    useEffect(() => {
        if (!lightbox) return;
        const handler = (e: KeyboardEvent) => {
            if (e.key === "Escape") setLightbox(null);
            if (e.key === "ArrowRight") navigate(1);
            if (e.key === "ArrowLeft") navigate(-1);
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [lightbox, navigate]);

    const categories: { key: Category; label: string }[] = [
        { key: "all", label: t("gallery.all") },
        { key: "projects", label: t("gallery.projects") },
        { key: "photography", label: t("gallery.photography") },
        { key: "design", label: t("gallery.design") },
    ];

    return (
        <>
            <div className="container mx-auto px-8 py-16 lg:px-16">
                {/* Header */}
                <header className="mb-10">
                    <p className="mb-2 font-sans text-xs font-semibold tracking-widest text-accent uppercase">
                        {t("gallery.eyebrow")}
                    </p>
                    <h1 className="text-cream font-serif text-4xl font-semibold">
                        {t("gallery.title")}
                    </h1>
                    <p className="mt-3 text-muted">{t("gallery.subtitle")}</p>
                </header>

                {/* Filter pills */}
                <div className="mb-8 flex flex-wrap gap-2">
                    {categories.map(({ key, label }) => (
                        <button
                            key={key}
                            onClick={() => setActive(key)}
                            className={`px-4 py-1.5 font-sans text-xs tracking-widest uppercase transition-colors duration-200 ${
                                active === key
                                    ? "text-canvas bg-accent"
                                    : "border-rim hover:text-cream border text-muted hover:border-accent/60"
                            }`}
                        >
                            {label}
                            {key !== "all" && (
                                <span className="ml-2 opacity-60">
                                    {
                                        ITEMS.filter((i) => i.category === key)
                                            .length
                                    }
                                </span>
                            )}
                        </button>
                    ))}
                    <span className="ml-auto self-center font-sans text-xs text-muted">
                        {t("gallery.items_count", { count: filtered.length })}
                    </span>
                </div>

                {/* Masonry grid */}
                <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4">
                    {filtered.map((item) => (
                        <div
                            key={item.id}
                            className="group mb-4 cursor-pointer break-inside-avoid overflow-hidden"
                            onClick={() => setLightbox(item)}
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={imageUrl(
                                        item.seed,
                                        item.width,
                                        item.height,
                                    )}
                                    alt={item.title}
                                    width={item.width}
                                    height={item.height}
                                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                />
                                {/* Hover overlay */}
                                <div className="from-canvas/80 absolute inset-0 flex flex-col justify-end bg-gradient-to-t via-canvas/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <p className="text-cream truncate font-sans text-sm font-medium">
                                        {item.title}
                                    </p>
                                    <p className="font-sans text-xs tracking-widest text-accent uppercase">
                                        {t(`gallery.${item.category}`)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {lightbox && (
                <div
                    className="bg-canvas/95 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
                    onClick={() => setLightbox(null)}
                >
                    {/* Prev */}
                    <button
                        className="hover:text-cream absolute top-1/2 left-4 -translate-y-1/2 p-3 text-muted transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(-1);
                        }}
                        aria-label="Previous"
                    >
                        <ChevronIcon dir="left" />
                    </button>

                    {/* Image */}
                    <div
                        className="relative max-h-[85vh] max-w-5xl px-16"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={imageUrl(
                                lightbox.seed,
                                lightbox.width,
                                lightbox.height,
                            )}
                            alt={lightbox.title}
                            width={lightbox.width}
                            height={lightbox.height}
                            className="max-h-[80vh] w-auto object-contain"
                            priority
                        />
                        <div className="mt-3 flex items-center justify-between">
                            <div>
                                <p className="text-cream font-sans text-sm font-medium">
                                    {lightbox.title}
                                </p>
                                <p className="font-sans text-xs tracking-widest text-accent uppercase">
                                    {t(`gallery.${lightbox.category}`)}
                                </p>
                            </div>
                            <p className="font-sans text-xs text-muted">
                                {filtered.findIndex(
                                    (i) => i.id === lightbox.id,
                                ) + 1}{" "}
                                / {filtered.length}
                            </p>
                        </div>
                    </div>

                    {/* Next */}
                    <button
                        className="hover:text-cream absolute top-1/2 right-4 -translate-y-1/2 p-3 text-muted transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(1);
                        }}
                        aria-label="Next"
                    >
                        <ChevronIcon dir="right" />
                    </button>

                    {/* Close */}
                    <button
                        className="hover:text-cream absolute top-4 right-4 p-2 text-muted transition-colors"
                        onClick={() => setLightbox(null)}
                        aria-label="Close"
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}
        </>
    );
}
