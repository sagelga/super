import Link from "next/link";

interface NavItem {
    label: string;
    href: string;
}

interface ArticleFooterNavProps {
    prev: NavItem | null;
    next: NavItem | null;
}

export default function ArticleFooterNav({
    prev,
    next,
}: ArticleFooterNavProps) {
    if (!prev && !next) return null;

    return (
        <nav
            aria-label="Article navigation"
            className="mt-12 border-t border-border pt-8"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    {prev && (
                        <Link
                            href={prev.href}
                            className="group flex flex-col gap-1 rounded-sm border border-border p-4 transition-colors hover:border-accent/40"
                        >
                            <span className="font-sans text-xs text-muted transition-colors group-hover:text-accent">
                                ← Previous
                            </span>
                            <span className="font-sans text-sm text-cream line-clamp-2">
                                {prev.label}
                            </span>
                        </Link>
                    )}
                </div>
                <div>
                    {next && (
                        <Link
                            href={next.href}
                            className="group flex flex-col items-end gap-1 rounded-sm border border-border p-4 text-right transition-colors hover:border-accent/40"
                        >
                            <span className="font-sans text-xs text-muted transition-colors group-hover:text-accent">
                                Next →
                            </span>
                            <span className="font-sans text-sm text-cream line-clamp-2">
                                {next.label}
                            </span>
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
}
