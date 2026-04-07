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
        title: "Blog",
        description:
            "Read the latest articles and tutorials from Kunanon Srisuntiroj on web development, cloud computing, and technology.",
        keywords: [
            "blog",
            "articles",
            "tutorials",
            "web development",
            "cloud computing",
            "Kunanon Srisuntiroj",
        ],
        alternates: {
            canonical: `${currentUrl}/blog`,
            languages: Object.fromEntries(
                languages.map((l) => [
                    l,
                    l === "th" ? `${BASE_URL}/blog` : `${BASE_URL}/${l}/blog`,
                ]),
            ),
        },
        openGraph: {
            title: "Blog | Kunanon Srisuntiroj",
            description:
                "Read the latest articles and tutorials on web development, cloud computing, and technology.",
            url: `${currentUrl}/blog`,
            siteName: "Kunanon Srisuntiroj Portfolio",
            images: [
                { url: "/og-image.png", width: 1200, height: 630, alt: "Blog" },
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
            title: "Blog | Kunanon Srisuntiroj",
            description:
                "Read the latest articles and tutorials on web development, cloud computing, and technology.",
            images: ["/og-image.png"],
        },
    };
}
