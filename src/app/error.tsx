'use client';

interface ErrorProps {
    error: Error & { digest?: string };
    reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center px-8">
            <p className="font-mono text-sm uppercase tracking-widest text-accent mb-4">
                Error
            </p>
            <h1 className="text-4xl font-bold text-text mb-4">
                Something went wrong
            </h1>
            <p className="text-muted mb-8 text-center max-w-md">
                {error.message || 'An unexpected error occurred.'}
            </p>
            <button
                onClick={reset}
                className="px-6 py-3 bg-accent text-background rounded font-medium hover:opacity-90 transition-opacity"
            >
                Try again
            </button>
        </div>
    );
}
