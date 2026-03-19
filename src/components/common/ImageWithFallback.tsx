import React from 'react';
import { useImageLoader } from '@/hooks/useImageLoader';
import type { ImageWithFallbackProps } from '@/types';

/**
 * Image component with automatic fallback handling
 * Shows a placeholder when image fails to load
 */
const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  fallback,
  onClick,
}) => {
  const { hasError, loadedSrc } = useImageLoader(src);

  if (hasError || !src) {
    return fallback ? (
      <div 
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ width, height }}
        onClick={onClick}
      >
        {fallback}
      </div>
    ) : (
      <div 
        className={`flex items-center justify-center bg-gray-200 dark:bg-gray-700 ${className}`}
        style={{ width, height }}
        onClick={onClick}
      >
        <span className="text-gray-400 dark:text-gray-500 text-sm">No Image</span>
      </div>
    );
  }

  return (
    <img
      src={loadedSrc || src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onClick={onClick}
    />
  );
};

export default ImageWithFallback;
