import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@/lib/content";

interface BlogCardProps {
    post: BlogPost;
    locale?: string;
}

export default function BlogCard({ post, locale }: BlogCardProps) {
    const formattedDate = post.date
        ? new Date(post.date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "";

    return (
        <article className="group flex flex-col gap-6 border-b border-rim py-8 first:pt-0 last:border-none sm:flex-row">
            {post.image &&
                (post.image.startsWith("http") ||
                    post.image.startsWith("/")) && (
                    <div className="h-36 w-full shrink-0 overflow-hidden rounded-sm sm:w-52">
                        <Image
                            src={post.image}
                            alt={post.title}
                            width={208}
                            height={144}
                            sizes="208px"
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    </div>
                )}
            <div className="flex min-w-0 flex-col justify-between">
                <div>
                    <div className="mb-2 flex flex-wrap items-center gap-3 font-sans text-xs text-muted">
                        {formattedDate && <span>{formattedDate}</span>}
                        {formattedDate && post.readingTime && (
                            <span className="text-rim">·</span>
                        )}
                        {post.readingTime && <span>{post.readingTime}</span>}
                    </div>
                    <h2 className="mb-2">
                        <Link
                            href={`/blog/${post.slug}`}
                            className="font-serif text-xl font-semibold text-cream transition-colors duration-200 hover:text-accent"
                        >
                            {post.title}
                        </Link>
                    </h2>
                    {post.description && (
                        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
                            {post.description}
                        </p>
                    )}
                </div>
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="rounded-sm border border-rim px-2 py-0.5 font-sans text-xs text-muted/70"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </article>
    );
}
