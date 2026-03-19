'use client';

import React, { useState } from 'react';

// ImageWithLoading Props
interface ImageWithLoadingProps {
  src?: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  placeholderClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
}

// Reusable Image component with loading state and error fallback
export const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  width,
  height,
  fill = false,
  className = '',
  placeholderClassName = '',
  onLoad,
  onError,
  priority = false,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
    onError?.();
  };

  // Loading skeleton
  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-cream-200 text-muted dark:bg-surface dark:text-muted animate-pulse ${placeholderClassName}`}
        style={!fill ? { width, height } : undefined}
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative" style={!fill ? { width, height } : undefined}>
      {/* Loading skeleton overlay */}
      {isLoading && (
        <div
          className={`absolute inset-0 animate-pulse bg-cream-200 dark:bg-surface ${placeholderClassName}`}
        />
      )}
      
      {/* Next.js Image */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
    </div>
  );
};

// Responsive Image wrapper with aspect ratio
interface ResponsiveImageProps {
  src?: string;
  alt: string;
  aspectRatio?: 'video' | 'square' | 'portrait' | 'auto';
  className?: string;
  onError?: () => void;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  aspectRatio = 'video',
  className = '',
  onError,
}) => {
  const aspectClasses = {
    video: 'aspect-video',
    square: 'aspect-square',
    portrait: 'aspect-[3/4]',
    auto: '',
  };

  return (
    <div className={`relative overflow-hidden ${aspectClasses[aspectRatio]} ${className}`}>
      <ImageWithLoading
        src={src}
        alt={alt}
        fill
        className="object-cover"
        onError={onError}
      />
    </div>
  );
};

export default ImageWithLoading;
