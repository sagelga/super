// Import necessary types and fonts from Next.js
import type { Metadata } from "next";
import {
    IBM_Plex_Sans_Thai,
    IBM_Plex_Mono,
    IBM_Plex_Serif,
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

// Define the metadata for the website
export async function generateMetadata({
    params,
}: {
    params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
    const { lang = "en" } = await params;
    const t = await getTranslations({ locale: lang, namespace: "metadata" });
    const baseUrl = "https://super.sagelga.workers.dev";
    const languages = ["en", "th", "zh"];
    const currentUrl = lang === "en" ? baseUrl : `${baseUrl}/${lang}`;

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
                languages.map((l) => [l, l === "en" ? baseUrl : `${baseUrl}/${l}`])
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
            locale: lang === "th" ? "th_TH" : lang === "zh" ? "zh_CN" : "en_US",
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
        verification: {
            google: "your-google-verification-code", // Replace with actual code
            yandex: "your-yandex-verification-code", // Replace if needed
        },
    };
}

// JSON-LD Structured Data for the website
const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "Person",
            "@id": "https://super.sagelga.workers.dev/#person",
            name: "Kunanon Srisuntiroj",
            url: "https://super.sagelga.workers.dev",
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
            "@id": "https://super.sagelga.workers.dev/#website",
            url: "https://super.sagelga.workers.dev",
            name: "Kunanon Srisuntiroj Portfolio",
            publisher: { "@id": "https://super.sagelga.workers.dev/#person" },
            potentialAction: {
                "@type": "SearchAction",
                target: "https://super.sagelga.workers.dev/{lang}/blog?q={search_term_string}",
                "query-input": "required name=search_term_string",
            },
        },
        {
            "@type": "Organization",
            "@id": "https://super.sagelga.workers.dev/#organization",
            name: "Kunanon Srisuntiroj Portfolio",
            url: "https://super.sagelga.workers.dev",
            logo: {
                "@type": "ImageObject",
                url: "https://super.sagelga.workers.dev/og-image.png",
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
    const { lang = "en" } = await params;

    const messages = await getMessages();

    return (
        <html lang={lang}>
            <head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
                />
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link
                    rel="icon"
                    href="/icon.svg"
                    type="image/svg+xml"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/apple-touch-icon.png"
                />
                <link rel="manifest" href="/manifest.webmanifest" />
                <link rel="preconnect" href="https://cdn.jsdelivr.net" />
                <meta name="theme-color" content="#f59e0b" />
                <meta name="color-scheme" content="dark light" />
                <meta name="referrer" content="strict-origin-when-cross-origin" />
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
