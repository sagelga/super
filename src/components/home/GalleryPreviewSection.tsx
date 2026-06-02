"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import Section from "../common/Section";
import RevealOnScroll from "../common/RevealOnScroll";
import { imageUrl, type GalleryItem } from "@/data/galleryItems";

interface GalleryPreviewSectionProps {
    items: GalleryItem[];
}

// Bento layout for 6 items in a 4-col grid:
//   Row 1: [img0: 2col] [img1: 2col]
//   Row 2: [img0: 2col] [img2: 1col] [img3: 1col]
//   Row 3: [img4: 2col] [img5: 2col]
const BENTO_CLASSES: string[] = [
    "md:col-span-2 md:row-span-2", // 0: featured tall-left
    "md:col-span-2", // 1: wide top-right
    "", // 2: small bottom-right-left
    "", // 3: small bottom-right-right
    "md:col-span-2", // 4: wide bottom-left
    "md:col-span-2", // 5: wide bottom-right
];

const GalleryPreviewSection: React.FC<GalleryPreviewSectionProps> = ({
    items,
}) => {
    const t = useTranslations("common");
    const lang = useLocale();
    const langPrefix = lang === "th" ? "" : `/${lang}`;

    return (
        <Section
            variant="canvas"
            spacing="generous"
            title={t("gallery.eyebrow")}
        >
            {/* Bento grid — 4 cols, 3 implicit rows with fixed heights */}
            <RevealOnScroll
                stagger
                className="grid grid-cols-2 grid-rows-[180px_180px] gap-2 md:grid-cols-4 md:grid-rows-[220px_220px_180px]"
            >
                {items.slice(0, 6).map((item, i) => (
                    <Link
                        key={item.id}
                        href={`${langPrefix}/gallery`}
                        className={`group relative overflow-hidden ${BENTO_CLASSES[i] ?? ""}`}
                    >
                        <Image
                            src={imageUrl(item.seed, item.width, item.height)}
                            alt={item.title}
                            fill
                            sizes="(max-width: 768px) 50vw, 25vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-canvas/80 via-canvas/80 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            <p className="truncate font-sans text-sm font-medium text-cream">
                                {item.title}
                            </p>
                            <p className="font-sans text-xs tracking-widest text-accent uppercase">
                                {t(`gallery.${item.category}`)}
                            </p>
                        </div>
                    </Link>
                ))}
            </RevealOnScroll>

            {/* CTA banner */}
            <Link
                href={`${langPrefix}/gallery`}
                className="group mt-2 flex items-center justify-between border border-rim bg-surface px-8 py-6 transition-all duration-300 hover:border-accent"
            >
                <div>
                    <p className="font-sans text-xs tracking-[0.25em] text-muted uppercase">
                        {t("gallery.items_count", { count: 15 })}
                    </p>
                    <p className="mt-1 font-serif text-2xl text-cream transition-colors duration-200 group-hover:text-accent">
                        {t("gallery.title")}
                    </p>
                </div>
                <span
                    aria-hidden="true"
                    className="text-2xl text-muted/40 transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-accent"
                >
                    →
                </span>
            </Link>
        </Section>
    );
};

export default GalleryPreviewSection;
