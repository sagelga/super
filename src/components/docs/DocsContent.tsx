import React from 'react';
import Link from 'next/link';

interface DocsContentProps {
    content: string; // HTML string
    prevPage?: { title: string; path: string };
    nextPage?: { title: string; path: string };
}

const DocsContent: React.FC<DocsContentProps> = ({ content, prevPage, nextPage }) => {
    return (
        <main className="flex-grow p-8">
            <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            <div className="mt-8 flex justify-between">
                {prevPage && (
                    <Link href={prevPage.path} className="text-blue-600 hover:underline">
                        &larr; {prevPage.title}
                    </Link>
                )}
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
