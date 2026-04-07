export default function BlogLoading() {
    return (
        <div className="container mx-auto px-8 py-16 lg:px-16">
            <header className="mb-12">
                <div className="mb-2 h-3 w-16 animate-pulse rounded bg-surface" />
                <div className="h-10 w-24 animate-pulse rounded bg-surface" />
                <div className="mt-3 h-4 w-64 animate-pulse rounded bg-surface" />
            </header>

            <div>
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="border-b border-rim py-8 first:border-t">
                        <div className="mb-3 flex items-center gap-3">
                            <div className="h-3 w-20 animate-pulse rounded bg-surface" />
                            <div className="h-px w-6 bg-rim" />
                            <div className="h-3 w-12 animate-pulse rounded bg-surface" />
                        </div>
                        <div className="mb-2 h-6 w-3/4 animate-pulse rounded bg-surface" />
                        <div className="space-y-1.5">
                            <div className="h-4 w-full animate-pulse rounded bg-surface" />
                            <div className="h-4 w-5/6 animate-pulse rounded bg-surface" />
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                            <div className="h-5 w-16 animate-pulse rounded bg-surface" />
                            <div className="h-5 w-14 animate-pulse rounded bg-surface" />
                            <div className="h-5 w-20 animate-pulse rounded bg-surface" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
