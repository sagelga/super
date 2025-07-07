import React from 'react';
import Link from 'next/link';

interface DocsProjectCardProps {
    title: string;
    description: string;
    docsLink: string;
}

const DocsProjectCard: React.FC<DocsProjectCardProps> = ({ title, description, docsLink }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <Link href={docsLink}>
                <h3 className="text-xl font-semibold mb-2 hover:underline">{title}</h3>
            </Link>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

export default DocsProjectCard;
