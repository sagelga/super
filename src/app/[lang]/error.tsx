'use client';

import ErrorView from '@/components/ErrorView';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return <ErrorView eyebrowKey="nav.home" error={error} reset={reset} />;
}
