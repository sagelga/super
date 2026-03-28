"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

// Define the props interface for the TableOfContents component
interface TableOfContentsProps {
    content: string;
}

// Define the structure for a heading object
interface Heading {
    id: string;
    text: string;
    level: number;
}

// TableOfContents functional component
const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const t = useTranslations("common");
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, "text/html");
        const extractedHeadings: Heading[] = Array.from(
            doc.querySelectorAll("h2, h3, h4, h5, h6"),
        ).map((heading) => {
            const id =
                heading.id ||
                heading
                    .textContent!.toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-*|-*$/g, "");
            heading.id = id;
            return {
                id,
                text: heading.textContent || "",
                level: parseInt(heading.tagName.substring(1)),
            };
        });
        setHeadings(extractedHeadings);
    }, [content]);

    return (
        <div className="sticky top-4 py-4">
            <h3 className="mb-4 text-lg font-semibold text-cream">
                {t("blog.table_of_contents")}
            </h3>
            <ul>
                {headings.map((heading) => (
                    <li key={heading.id} className="mb-2">
                        <a
                            href={`#${heading.id}`}
                            className={`block text-muted hover:text-accent ${heading.level === 2 ? "ml-0 font-medium" : `ml-${(heading.level - 1) * 4}`}`}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;
