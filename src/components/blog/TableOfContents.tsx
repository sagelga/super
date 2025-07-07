"use client";
import React, { useEffect, useState } from 'react';

interface TableOfContentsProps {
    content: string; // HTML string
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const [headings, setHeadings] = useState<Heading[]>([]);

    useEffect(() => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(content, 'text/html');
        const extractedHeadings: Heading[] = Array.from(doc.querySelectorAll('h2, h3, h4, h5, h6')).map((heading) => {
            const id = heading.id || heading.textContent!.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
            heading.id = id; // Ensure the heading has an ID
            return {
                id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName.substring(1)),
            };
        });
        setHeadings(extractedHeadings);
    }, [content]);

    return (
        <div className="p-4 border rounded-lg shadow-md sticky top-4">
            <h3 className="text-xl font-semibold mb-4">Table of Contents</h3>
            <ul>
                {headings.map((heading) => (
                    <li key={heading.id} className={`mb-2 ml-${(heading.level - 2) * 4}`}>
                        <a href={`#${heading.id}`} className="text-blue-600 hover:underline">
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TableOfContents;
