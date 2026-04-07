'use client';

import ErrorView from '@/components/ErrorView';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function DocsError({ error, reset }: ErrorProps) {
    return <ErrorView eyebrowKey="nav.docs" error={error} reset={reset} />;
}
