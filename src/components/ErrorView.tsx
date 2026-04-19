'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface ErrorViewProps {
    eyebrowKey: string;
    error: Error & { digest?: string };
    reset: () => void;
}

export default function ErrorView({ eyebrowKey, error, reset }: ErrorViewProps) {
    const t = useTranslations('common');

    return (
        <div className="container mx-auto px-8 py-20 lg:px-16">
            <p className="mb-8 select-none font-serif text-[11px] uppercase tracking-[0.28em] text-muted/70">
                § {t(eyebrowKey)}
            </p>

            <div className="mt-4 mb-10 flex items-center gap-4">
                <div className="h-px flex-1 bg-rim" />
                <span className="shrink-0 font-sans text-[10px] uppercase tracking-[0.32em] text-muted/70">
                    {t('error.title')}
                </span>
                <div className="h-px w-10 bg-accent/20" />
            </div>

            <div className="max-w-sm">
                <p className="font-sans text-sm leading-relaxed text-muted">
                    {error.message || t('error.description')}
                </p>

                <div className="mt-7 flex items-center gap-4">
                    <button
                        onClick={reset}
                        className="font-sans text-sm text-accent transition-colors duration-150 hover:text-text"
                    >
                        {t('error.try_again')}
                    </button>
                    <span className="text-muted/30">·</span>
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 font-sans text-sm text-muted transition-colors duration-150 hover:text-text"
                    >
                        <span className="transition-transform duration-150 group-hover:-translate-x-0.5">
                            ←
                        </span>
                        <span>{t('error.go_home')}</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}
