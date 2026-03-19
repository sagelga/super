import type { ReactNode } from 'react';

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
