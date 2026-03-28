import type { ReactNode } from "react";

// ============================================================================
// Common Types
// ============================================================================

/**
 * Props for the Section component
 */
export interface SectionProps {
    title?: string;
    children: ReactNode;
    className?: string;
    id?: string;
    darkBg?: boolean;
    spacing?: "compact" | "normal" | "generous";
}

// ============================================================================
// Blog Types
// ============================================================================

/**
 * Blog post object structure
 */
export interface Post {
    id: string;
    slug: string;
    title: string;
    content: string;
    published_at: string;
    excerpt: string;
    feature_image: string;
    primary_tag: { name: string };
}

// ============================================================================
// Cookies Types
// ============================================================================

/**
 * Cookie preferences structure
 */
export interface CookiePreferences {
    functional: boolean;
    analytics: boolean;
    consentGiven: boolean;
    consentTimestamp: number | null;
}

/**
 * Storage key for cookie consent
 */
export const COOKIE_STORAGE_KEY = "cookie_consent";
