import type { ReactNode } from 'react';

// ============================================================================
// Common Types
// ============================================================================

/**
 * Props for the ExternalLinkIcon component
 */
export interface ExternalLinkIconProps {
  className?: string;
  'aria-label'?: string;
}

/**
 * Props for the ImageWithFallback component
 */
export interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  fallback?: ReactNode;
  onClick?: () => void;
}

/**
 * Props for the Section component
 */
export interface SectionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  id?: string;
  darkBg?: boolean;
}

// ============================================================================
// Navigation Types
// ============================================================================

/**
 * Link item for navigation and sitemap
 */
export interface LinkItem {
  name: string;
  href: string;
  iconClass?: string;
  icon?: string;
}

/**
 * Sidebar navigation item for documentation
 */
export interface SidebarItem {
  title: string;
  href?: string;
  children?: SidebarItem[];
  isOpen?: boolean;
}

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
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
 * Cookie category definition
 */
export interface CookieCategory {
  key: keyof Omit<CookiePreferences, 'consentGiven' | 'consentTimestamp'>;
  required: boolean;
}

/**
 * Storage key for cookie consent
 */
export const COOKIE_STORAGE_KEY = 'cookie_consent';

/**
 * Available cookie categories
 */
export const COOKIE_CATEGORIES: CookieCategory[] = [
  { key: 'functional', required: true },
  { key: 'analytics', required: false },
];

// ============================================================================
// Home Types
// ============================================================================

/**
 * Project item for homepage showcase
 */
export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

/**
 * Experience item for work history
 */
export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

/**
 * Certification item
 */
export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
}

/**
 * Volunteering experience item
 */
export interface Volunteering {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  cause: string;
}

/**
 * Skill item
 */
export type Skill = string;

/**
 * Combined homepage data structure
 */
export interface HomePageData {
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  volunteering: Volunteering[];
}

// ============================================================================
// i18n Types
// ============================================================================

/**
 * Props for DocsProjectCard component (used in i18n types)
 */
export interface DocsProjectCardProps {
  title: string;
  description: string;
  href: string;
  imageUrl?: string;
}

/**
 * Define the structure for common.json
 */
export interface CommonMessages {
  greeting: string;
  blog: {
    search_placeholder: string;
    loading_posts: string;
    error_loading_posts: string;
    featured_posts_title: string;
    other_posts_title: string;
    previous_button: string;
    next_button: string;
    page_of: string;
    no_posts_found: string;
    all_categories: string;
    table_of_contents: string;
  };
  footer: {
    copyright: string;
    back_to_top: string;
    english: string;
    thai: string;
    chinese: string;
    japanese: string;
    sitemap: {
      kunanon_srisuntiroj: string;
      home: string;
      about: string;
      skills: string;
      experience: string;
      certifications: string;
      projects: string;
      todoist_notion_sync: string;
      learn_with_sagelga: string;
      documentation_website: string;
      byteside_one: string;
      the_sunny_side_publication: string;
      connect: string;
      linkedin: string;
      github: string;
      salesforce_trailblazer: string;
    };
  };
  github_label: string;
  demo_label: string;
  metadata: {
    title: string;
    description: string;
    site_name: string;
    image_alt: string;
  };
  docs: {
    sidebar_title: string;
  };
  navbar: {
    name: string;
    home: string;
    blog: string;
    gallery: string;
    learn: string;
    docs: string;
    experience: string;
    certifications: string;
    projects: string;
    volunteering: string;
  };
  breadcrumb: {
    home: string;
    blog: string;
    gallery: string;
    docs: string;
    experience: string;
    certifications: string;
    volunteering: string;
    projects: string;
    privacy_policy: string;
    terms_of_service: string;
  };
  not_found: {
    title: string;
    description: string;
    go_home: string;
  };
  gallery: {
    title: string;
    image_alt: string;
  };
  no_image_available: string;
  read_documentation: string;
  site: {
    name: string;
  };
}

/**
 * Define the structure for docs.json
 */
export interface DocsMessages {
  docs_page_title: string;
  docs_page_description: string;
  projects_documentation_title: string;
  projects: DocsProjectCardProps[];
  doc_detail_page_title: string;
}

// Extend the next-intl messages
declare module 'next-intl' {
  interface IntlMessages extends CommonMessages, DocsMessages {
    // Add other message interfaces here if needed
  }
}
