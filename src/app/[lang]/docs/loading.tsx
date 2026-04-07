export default function DocsLoading() {
    return (
        <div className="container mx-auto px-8 py-16 lg:px-16">
            <header className="mb-12">
                <div className="mb-2 h-3 w-12 animate-pulse rounded bg-surface" />
                <div className="h-10 w-40 animate-pulse rounded bg-surface" />
                <div className="mt-3 h-4 w-80 animate-pulse rounded bg-surface" />
            </header>

            <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="min-h-[220px] border border-rim bg-surface p-8 md:col-span-2">
                    <div className="mb-2 h-3 w-16 animate-pulse rounded bg-rim" />
                    <div className="mb-3 h-8 w-3/4 animate-pulse rounded bg-rim" />
                    <div className="space-y-1.5">
                        <div className="h-4 w-full animate-pulse rounded bg-rim" />
                        <div className="h-4 w-5/6 animate-pulse rounded bg-rim" />
                        <div className="h-4 w-4/6 animate-pulse rounded bg-rim" />
                    </div>
                </div>

                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="min-h-[160px] border border-rim bg-surface p-6">
                        <div className="mb-2 h-3 w-12 animate-pulse rounded bg-rim" />
                        <div className="mb-2 h-6 w-2/3 animate-pulse rounded bg-rim" />
                        <div className="space-y-1.5">
                            <div className="h-3.5 w-full animate-pulse rounded bg-rim" />
                            <div className="h-3.5 w-4/5 animate-pulse rounded bg-rim" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex min-h-[64px] items-center gap-3 border border-rim bg-surface px-4 py-3"
                    >
                        <div className="h-3 w-5 shrink-0 animate-pulse rounded bg-rim" />
                        <div className="min-w-0 flex-1 space-y-1.5">
                            <div className="h-3.5 w-full animate-pulse rounded bg-rim" />
                            <div className="h-3 w-10 animate-pulse rounded bg-rim" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
