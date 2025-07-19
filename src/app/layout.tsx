// Import necessary types and fonts from Next.js
import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, IBM_Plex_Mono } from "next/font/google";
// import { GeistSans } from "geist/font/sans";
// import { GeistMono } from "geist/font/mono";
import "./globals.css";

// Import the main layout component
import Layout from "../components/Layout";
import I18nProvider from "../components/I18nProvider";

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

// Define the metadata for the website
export const metadata: Metadata = {
  title: "คุณานนต์ ศรีสันติโรจน์ | Full-Stack Developer & Cloud Enthusiast",
  description: "คุณานนต์ ศรีสันติโรจน์ นักพัฒนา Full-Stack ที่เชี่ยวชาญด้านเทคโนโลยีคลาวด์, การพัฒนาเว็บ และการมีส่วนร่วมในโอเพนซอร์ส",
  openGraph: {
    title: "คุณานนต์ ศรีสันติโรจน์ | Full-Stack Developer & Cloud Enthusiast",
    description: "คุณานนต์ ศรีสันติโรจน์ นักพัฒนา Full-Stack ที่เชี่ยวชาญด้านเทคโนโลยีคลาวด์, การพัฒนาเว็บ และการมีส่วนร่วมในโอเพนซอร์ส",
    url: "https://super.sagelga.workers.dev/",
    siteName: "พอร์ตโฟลิโอคุณานนต์ ศรีสันติโรจน์",
    images: [
      {
        url: "https://super.sagelga.workers.dev/next.svg", // Replace with a relevant image for your site preview
        width: 1200,
        height: 630,
        alt: "แบนเนอร์พอร์ตโฟลิโอคุณานนต์ ศรีสันติโรจน์",
      },
    ],
    locale: "th_TH",
    type: "website",
  },
};

// Define the RootLayout component
export default function RootLayout({
  children,
  params: { lang },
}: Readonly<{
  children: React.ReactNode;
  params: { lang: string };
}>) {
  return (
    <html lang={lang}>
      <head>
        {/* Link to the devicon stylesheet for icons */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
      </head>
      {/* Apply the configured fonts to the body */}
      <body className={`${sans.variable} ${mono.variable} antialiased`}>
        {/* Use the Layout component to wrap the content */}
        <I18nProvider>
          <Layout>{children}</Layout>
        </I18nProvider>
      </body>
    </html>
  );
}
