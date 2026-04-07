'use client';

import ErrorView from '@/components/ErrorView';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function LearnError({ error, reset }: ErrorProps) {
    return <ErrorView eyebrowKey="learn.eyebrow" error={error} reset={reset} />;
}
