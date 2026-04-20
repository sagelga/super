"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { ThemeProvider } from "../hooks/useTheme";

const CookieConsentBanner = dynamic(
    () => import("./cookies/CookieConsentBanner"),
    { ssr: false },
);

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <div className="flex min-h-screen flex-col">
                <Navbar />
                <main className="page-enter flex-grow pt-16">{children}</main>
                <Footer />
                <CookieConsentBanner />
            </div>
        </ThemeProvider>
    );
};

export default Layout;
