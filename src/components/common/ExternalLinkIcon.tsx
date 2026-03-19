import React from 'react';
import type { ExternalLinkIconProps } from '@/types/common';

/**
 * External link icon component
 * Renders a consistent external link SVG icon
 */
const ExternalLinkIcon: React.FC<ExternalLinkIconProps> = ({ 
  className = 'ml-2 -mr-0.5 h-4 w-4',
  'aria-label': ariaLabel = 'External link'
}) => {
  return (
    <svg 
      className={className} 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
      aria-label={ariaLabel}
    >
      <path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        strokeWidth={2} 
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6m6-6L10 14" 
      />
    </svg>
  );
};

export default ExternalLinkIcon;
