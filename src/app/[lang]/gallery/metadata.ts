import type { Metadata } from "next";
import { BASE_URL } from "@/lib/config";

const languages = ["en", "th", "zh"];

export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    // Thai is default (no prefix)
    const currentLang = lang ?? "th";
    const currentUrl =
        currentLang === "th" ? `${BASE_URL}` : `${BASE_URL}/${currentLang}`;

    return {
        title: "Gallery",
        description:
            "Browse through a collection of photos and visual content by Kunanon Srisuntiroj.",
        keywords: ["gallery", "photos", "Kunanon Srisuntiroj", "portfolio"],
        alternates: {
            canonical: `${currentUrl}/gallery`,
            languages: Object.fromEntries(
                languages.map((l) => [
                    l,
                    l === "th"
                        ? `${BASE_URL}/gallery`
                        : `${BASE_URL}/${l}/gallery`,
                ]),
            ),
        },
        openGraph: {
            title: "Gallery | Kunanon Srisuntiroj",
            description:
                "Browse through a collection of photos and visual content.",
            url: `${currentUrl}/gallery`,
            siteName: "Kunanon Srisuntiroj Portfolio",
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: "Gallery",
                },
            ],
            locale:
                currentLang === "th"
                    ? "th_TH"
                    : currentLang === "zh"
                      ? "zh_CN"
                      : "en_US",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Gallery | Kunanon Srisuntiroj",
            description:
                "Browse through a collection of photos and visual content.",
            images: ["/og-image.png"],
        },
    };
}
