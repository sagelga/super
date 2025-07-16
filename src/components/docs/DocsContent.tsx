import React from 'react';
import Link from 'next/link';


interface DocsContentProps {
    content: string; // The HTML string content of the documentation
    prevPage?: { title: string; path: string }; // Optional object for the previous page link
    nextPage?: { title: string; path: string }; // Optional object for the next page link
}

// DocsContent functional component responsible for rendering documentation content
const DocsContent: React.FC<DocsContentProps> = ({ content, prevPage, nextPage }) => {
    return (
        <main className="flex-grow p-8">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            {/* Navigation links for previous and next pages */}
            <div className="mt-8 flex justify-between">
                {/* Previous page link (conditionally rendered) */}
                {prevPage && (
                    <Link href={prevPage.path} className="text-blue-600 hover:underline">
                        &larr; {prevPage.title}
                    </Link>
                )}
                {/* Next page link (conditionally rendered) */}
                {nextPage && (
                    <Link href={nextPage.path} className="text-blue-600 hover:underline ml-auto">
                        {nextPage.title} &rarr;
                    </Link>
                )}
            </div>
        </main>
    );
};

export default DocsContent;