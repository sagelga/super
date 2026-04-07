import React from "react";
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { BASE_URL } from "@/lib/config";
const LOCALES = ["en", "th", "zh"] as const;

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    const t = await getTranslations({ locale: lang, namespace: "common" });
    const canonical =
        lang === "th" ? `${BASE_URL}/gallery` : `${BASE_URL}/${lang}/gallery`;
    const title = t("gallery.title");
    const description = t("gallery.subtitle");

    return {
        title,
        description,
        alternates: {
            canonical,
            languages: Object.fromEntries(
                LOCALES.map((l) => [
                    l,
                    l === "th"
                        ? `${BASE_URL}/gallery`
                        : `${BASE_URL}/${l}/gallery`,
                ]),
            ),
        },
        openGraph: {
            type: "website",
            url: canonical,
            title,
            description,
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
        },
    };
}

export default function GalleryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
