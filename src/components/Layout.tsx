'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsentBanner from './cookies/CookieConsentBanner';
import { ThemeProvider } from '../hooks/useTheme';

// Define the props interface for the Layout component
interface LayoutProps {
    children: React.ReactNode; // The content to be rendered within the layout
}

// Layout functional component that provides a consistent structure for pages
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <ThemeProvider>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow pt-16">{children}</main>
                <Footer />
                <CookieConsentBanner />
            </div>
        </ThemeProvider>
    );
};

export default Layout;
