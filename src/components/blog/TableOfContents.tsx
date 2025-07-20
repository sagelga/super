"use client";
import React, { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

// Define the props interface for the TableOfContents component
interface TableOfContentsProps {
    content: string; // The HTML string content from which to extract headings
}

// Define the structure for a heading object
interface Heading {
    id: string; // The ID of the heading element
    text: string; // The text content of the heading
    level: number; // The heading level (e.g., 2 for <h2>, 3 for <h3>)
}

// TableOfContents functional component
const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
    const t = useTranslations('common');
    // State to store the extracted headings
    const [headings, setHeadings] = useState<Heading[]>([]);

    // useEffect hook to parse the content and extract headings when the content changes
    useEffect(() => {
        const parser = new DOMParser();
        // Parse the HTML content string into a DOM document
        const doc = parser.parseFromString(content, 'text/html');
        // Query all heading elements (h2 to h6) from the parsed document
        const extractedHeadings: Heading[] = Array.from(doc.querySelectorAll('h2, h3, h4, h5, h6')).map((heading) => {
            // Generate a slug-like ID from the heading text if it doesn't already have one
            const id = heading.id || heading.textContent!.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-*|-*$/g, '');
            // Assign the generated/existing ID back to the heading element in the DOM (for linking)
            heading.id = id;
            return {
                id,
                text: heading.textContent || '',
                level: parseInt(heading.tagName.substring(1)), // Extract heading level (e.g., H2 -> 2)
            };
        });
        // Update the state with the extracted headings
        setHeadings(extractedHeadings);
    }, [content]); // Re-run effect when content prop changes

    return (
        <div className="py-4 sticky top-4">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('blog.table_of_contents')}</h3>
            <ul>
                {/* Map through the headings and render a list item for each */}
                {headings.map((heading) => (
                    <li key={heading.id} className="mb-2">
                        {/* Link to the corresponding section on the page, with indentation based on heading level */}
                        <a
                            href={`#${heading.id}`}
                            className={`block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 ${heading.level === 2 ? 'ml-0 font-medium' : `ml-${(heading.level - 1) * 4}`}`}
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
