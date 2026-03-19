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

    return {
        title: t("title"),
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: "https://super.sagelga.workers.dev/",
            siteName: t("site_name"),
            images: [
                {
                    url: "https://super.sagelga.workers.dev/next.svg", // Replace with a relevant image for your site preview
                    width: 1200,
                    height: 630,
                    alt: t("image_alt"),
                },
            ],
            locale: lang === "th" ? "th_TH" : "en_US",
            type: "website",
        },
    };
}

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
