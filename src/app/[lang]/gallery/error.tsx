'use client';

import ErrorView from '@/components/ErrorView';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function GalleryError({ error, reset }: ErrorProps) {
    return <ErrorView eyebrowKey="gallery.eyebrow" error={error} reset={reset} />;
}
