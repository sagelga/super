// Import necessary types and fonts from Next.js
import type { Metadata } from "next";
import {
    IBM_Plex_Sans_Thai,
    IBM_Plex_Mono,
    IBM_Plex_Serif,
    Noto_Serif_Thai,
    Noto_Serif_SC,
} from "next/font/google";
import "./globals.css";

// Import the main layout component
import Layout from "../components/Layout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

// Configure the sans-serif font
const sans = IBM_Plex_Sans_Thai({
    variable: "--font-sans",
    weight: ["100", "200", "300", "400", "500", "600", "700"],
    subsets: ["thai", "latin"],
    display: "swap",
});

// Configure the monospace font
const mono = IBM_Plex_Mono({
    variable: "--font-mono",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

// Configure the serif font for display
const serif = IBM_Plex_Serif({
    variable: "--font-serif",
    weight: ["400", "500", "600", "700"],
    subsets: ["latin"],
    display: "swap",
});

// Thai serif font — fills the gap IBM Plex Serif leaves for Thai glyphs
const serifThai = Noto_Serif_Thai({
    variable: "--font-serif-thai",
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    subsets: ["thai"],
    display: "swap",
});

// Chinese serif font — IBM Plex has no CJK coverage at all
const serifZh = Noto_Serif_SC({
    variable: "--font-serif-zh",
    weight: ["200", "300", "400", "500", "600", "700", "900"],
    subsets: ["latin"],
    display: "swap",
});

// Define the metadata for the website
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
    const { lang } = await params;
    // Thai is default (no prefix), English and Chinese have prefixes
    const currentLang = lang ?? "th";
    const t = await getTranslations({
        locale: currentLang,
        namespace: "metadata",
    });
    const baseUrl = "https://sagelga.com";
    const languages = ["en", "th", "zh"];
    // Thai (default) has no prefix, others do
    const currentUrl =
        currentLang === "th" ? baseUrl : `${baseUrl}/${currentLang}`;

    return {
        title: {
            default: t("title"),
            template: `%s | ${t("site_name")}`,
        },
        description: t("description"),
        keywords: [
            "Kunanon Srisuntiroj",
            "Full-Stack Developer",
            "Cloud Enthusiast",
            "Portfolio",
            "Web Development",
            "React",
            "Next.js",
            "TypeScript",
        ],
        authors: [{ name: "Kunanon Srisuntiroj" }],
        creator: "Kunanon Srisuntiroj",
        publisher: "Kunanon Srisuntiroj",
        metadataBase: new URL(baseUrl),
        alternates: {
            canonical: currentUrl,
            languages: Object.fromEntries(
                languages.map((l) => [
                    l,
                    l === "th" ? baseUrl : `${baseUrl}/${l}`,
                ]),
            ),
        },
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: currentUrl,
            siteName: t("site_name"),
            images: [
                {
                    url: "/og-image.png",
                    width: 1200,
                    height: 630,
                    alt: t("image_alt"),
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
            title: t("title"),
            description: t("description"),
            images: ["/og-image.png"],
            creator: "@sagelga",
            site: "@sagelga",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

// JSON-LD Structured Data for the website
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://sagelga.com/#person",
            name: "Kunanon Srisuntiroj",
            url: "https://sagelga.com",
            sameAs: [
                "https://github.com/sagelga",
                "https://linkedin.com/in/sagelga",
            ],
            jobTitle: "Full-Stack Developer",
            worksFor: {
                "@type": "Organization",
                name: "Self-employed",
            },
        },
        {
            "@type": "WebSite",
            "@id": "https://sagelga.com/#website",
            url: "https://sagelga.com",
            name: "Kunanon Srisuntiroj Portfolio",
            publisher: { "@id": "https://sagelga.com/#person" },
            potentialAction: {
                "@type": "SearchAction",
                target: "https://sagelga.com/{lang}/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
            },
        },
        {
            "@type": "Organization",
            "@id": "https://sagelga.com/#organization",
            name: "Kunanon Srisuntiroj Portfolio",
            url: "https://sagelga.com",
            logo: {
                "@type": "ImageObject",
                url: "https://sagelga.com/og-image.png",
            },
        },
    ],
};

// Define the RootLayout component
export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ lang?: string }>;
}) {
    const { lang } = await params;
    // Thai is default (no prefix)
    const currentLang = lang ?? "th";

    const messages = await getMessages();

    return (
        <html
            lang={currentLang}
            className={`dark ${serifThai.variable} ${serifZh.variable}`}
        >
            <head>
                {/* Apply stored theme before first paint to avoid flash */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(){try{var s=localStorage.getItem('theme-preference');var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var dark=s==='dark'||(s!=='light'&&prefersDark)||!s;document.documentElement.classList.toggle('dark',dark);}catch(e){}})();`,
                    }}
                />
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link rel="manifest" href="/manifest.webmanifest" />
                <meta name="theme-color" content="#1A1814" />
                <meta name="color-scheme" content="dark light" />
                <meta
                    name="referrer"
                    content="strict-origin-when-cross-origin"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body
                className={`${sans.variable} ${mono.variable} ${serif.variable} antialiased`}
            >
                <NextIntlClientProvider messages={messages}>
                    <Layout>{children}</Layout>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
