'use client';

import ErrorView from '@/components/ErrorView';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function BlogError({ error, reset }: ErrorProps) {
    return <ErrorView eyebrowKey="blog.eyebrow" error={error} reset={reset} />;
}
