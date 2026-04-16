interface Breadcrumb {
    label: string;
    href: string;
}

interface DocHeaderProps {
    title: string;
    description?: string;
    readingTime?: string;
    breadcrumbs?: Breadcrumb[];
}

export default function DocHeader({
    title,
    description,
    readingTime,
    breadcrumbs,
}: DocHeaderProps) {
    return (
        <header className="mb-10">
            {breadcrumbs && breadcrumbs.length > 0 && (
                <nav aria-label="Breadcrumb" className="mb-4">
                    <ol className="flex flex-wrap items-center gap-1.5 font-sans text-xs text-muted">
                        {breadcrumbs.map((crumb, i) => (
                            <li key={crumb.href} className="flex items-center gap-1.5">
                                {i > 0 && (
                                    <span className="text-rim" aria-hidden="true">
                                        /
                                    </span>
                                )}
                                {i < breadcrumbs.length - 1 ? (
                                    <a
                                        href={crumb.href}
                                        className="transition-colors hover:text-cream"
                                    >
                                        {crumb.label}
                                    </a>
                                ) : (
                                    <span className="text-accent">{crumb.label}</span>
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            )}

            <h1 className="mb-4 font-serif text-4xl leading-tight font-semibold text-cream sm:text-5xl">
                {title}
            </h1>

            <div className="flex flex-wrap items-center gap-3">
                {description && (
                    <p className="font-sans text-base text-muted leading-relaxed">
                        {description}
                    </p>
                )}
                {readingTime && (
                    <span className="shrink-0 font-sans text-sm text-muted">
                        {readingTime}
                    </span>
                )}
            </div>
        </header>
    );
}
