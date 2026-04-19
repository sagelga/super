import Image from "next/image";
import React from "react";
import type { AuthorInfo } from "@/lib/content";
import Tooltip from "@/components/ui/Tooltip";

interface PostHeaderProps {
    title: string;
    date: string;
    lastEditedTime?: string;
    syncedAt?: string;
    tags?: string[];
    image?: string;
    readingTime?: string;
    authors?: string[];
    authorData?: Record<string, AuthorInfo>;
    locale?: string;
}

function formatDate(value: string | undefined, locale?: string): string {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleDateString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
}

function formatDateTime(value: string | undefined, locale?: string): string {
    if (!value) return "";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return "";
    return d.toLocaleString(locale, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

function sameDay(a?: string, b?: string): boolean {
    if (!a || !b) return false;
    const da = new Date(a);
    const db = new Date(b);
    if (Number.isNaN(da.getTime()) || Number.isNaN(db.getTime())) return false;
    return (
        da.getFullYear() === db.getFullYear() &&
        da.getMonth() === db.getMonth() &&
        da.getDate() === db.getDate()
    );
}

export default function PostHeader({
    title,
    date,
    lastEditedTime,
    syncedAt,
    tags,
    image,
    readingTime,
    authors,
    authorData,
    locale,
}: PostHeaderProps) {
    const publishedDate = formatDate(date, locale);
    const editedDate =
        lastEditedTime && !sameDay(lastEditedTime, date)
            ? formatDate(lastEditedTime, locale)
            : "";
    const fetchedDate = formatDateTime(syncedAt, locale);

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

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
                {publishedDate && (
                    <span className="font-sans">
                        {editedDate || fetchedDate ? (
                            <>
                                <span className="text-muted/70">Published </span>
                                {publishedDate}
                            </>
                        ) : (
                            publishedDate
                        )}
                    </span>
                )}
                {editedDate && (
                    <>
                        <span className="text-rim">·</span>
                        <span className="font-sans">
                            <span className="text-muted/70">Edited </span>
                            {editedDate}
                        </span>
                    </>
                )}
                {fetchedDate && (
                    <>
                        <span className="text-rim">·</span>
                        <span className="font-sans">
                            <span className="text-muted/70">Fetched </span>
                            <Tooltip
                                content={
                                    <>
                                        Synced from Notion by{" "}
                                        <span className="text-accent">SuperEye</span>
                                        , served via{" "}
                                        <span className="text-accent">Superbrain</span>{" "}
                                        — my Cloudflare Workers that cache blog content every 15&nbsp;minutes.
                                    </>
                                }
                            >
                                {fetchedDate}
                            </Tooltip>
                        </span>
                    </>
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
