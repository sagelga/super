import type { ReactNode } from "react";

// ============================================================================
// Common Types
// ============================================================================

/**
 * Props for the Section component
 */
export interface SectionProps {
    title?: string;
    /** Small muted text shown inline next to the amber label, e.g. a count or year range */
    subtitle?: string;
    /** "default" = amber label + 1px rule; "minimal" = muted label, no rule */
    headingVariant?: "default" | "minimal";
    children: ReactNode;
    className?: string;
    id?: string;
    variant?: "surface" | "canvas";
    spacing?: "compact" | "normal" | "generous" | "spacious";
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

// ============================================================================
// Content Types
// ============================================================================

export interface BlogFrontmatter {
    slug: string;
    title: string;
    description: string;
    date: string;
    authors: string[];
    tags: string[];
    image?: string;
}

export interface DocFrontmatter {
    title: string;
    sidebar_label?: string;
    slug?: string;
    description?: string;
}

export interface LearnFrontmatter {
    title?: string;
}

export interface SidebarItem {
    label: string;
    href?: string;
    children?: SidebarItem[];
}

export interface AuthorInfo {
    name: string;
    title?: string;
    url?: string;
    image_url?: string;
}
