import { useState, useEffect } from 'react';

interface UseImageLoaderResult {
  isLoading: boolean;
  hasError: boolean;
  loadedSrc: string | null;
}

/**
 * Custom hook to handle image loading and error states
 * @param src - The image source URL
 * @returns Object containing loading state, error state, and loaded source
 */
export function useImageLoader(src: string | undefined): UseImageLoaderResult {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!src) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);
    setLoadedSrc(null);

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setLoadedSrc(src);
      setIsLoading(false);
    };
    
    img.onerror = () => {
      setHasError(true);
      setIsLoading(false);
    };
  }, [src]);

  return { isLoading, hasError, loadedSrc };
}
