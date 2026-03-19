'use client';

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieConsentBanner from './cookies/CookieConsentBanner';

// Define the props interface for the Layout component
interface LayoutProps {
    children: React.ReactNode; // The content to be rendered within the layout
}

// Layout functional component that provides a consistent structure for pages
const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow pt-16">{children}</main>
            <Footer />
            <CookieConsentBanner />
        </div>
    );
};

export default Layout;
