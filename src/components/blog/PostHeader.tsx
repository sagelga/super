import Image from "next/image";
import React from "react";
import type { AuthorInfo } from "@/lib/content";

interface PostHeaderProps {
    title: string;
    date: string;
    tags?: string[];
    image?: string;
    readingTime?: string;
    authors?: string[];
    authorData?: Record<string, AuthorInfo>;
    locale?: string;
}

export default function PostHeader({
    title,
    date,
    tags,
    image,
    readingTime,
    authors,
    authorData,
    locale,
}: PostHeaderProps) {
    const formattedDate = date
        ? new Date(date).toLocaleDateString(locale, {
              year: "numeric",
              month: "long",
              day: "numeric",
          })
        : "";

    return (
        <header className="mb-10">
            {image && (image.startsWith("http") || image.startsWith("/")) && (
                <div className="relative mb-8 aspect-[2/1] max-h-96 overflow-hidden rounded-sm">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        priority
                        sizes="(max-width:768px) 100vw, 800px"
                        className="object-cover"
                    />
                </div>
            )}

            {tags && tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-sm border border-accent/30 px-2 py-0.5 font-sans text-xs text-accent"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            )}

            <h1 className="mb-4 font-serif text-4xl leading-tight font-semibold text-text sm:text-5xl">
                {title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
                {formattedDate && (
                    <span className="font-sans">{formattedDate}</span>
                )}
                {readingTime && (
                    <>
                        <span className="text-rim">·</span>
                        <span className="font-sans">{readingTime}</span>
                    </>
                )}
                {authors && authors.length > 0 && authorData && (
                    <>
                        <span className="text-rim">·</span>
                        <div className="flex items-center gap-2">
                            {authors.map((authorKey) => {
                                const info = authorData[authorKey];
                                if (!info) return null;
                                return (
                                    <div
                                        key={authorKey}
                                        className="flex items-center gap-1.5"
                                    >
                                        {info.image_url && (
                                            <Image
                                                src={info.image_url}
                                                alt={info.name}
                                                width={20}
                                                height={20}
                                                className="rounded-full"
                                            />
                                        )}
                                        <span>{info.name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}
            </div>
        </header>
    );
}
