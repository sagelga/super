import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface DocsProjectCardProps {
    title: string;
    description: string;
    docsLink: string;
    imageUrl?: string; // Added imageUrl prop
}

const DocsProjectCard: React.FC<DocsProjectCardProps> = ({ title, description, docsLink, imageUrl }) => {
    return (
        <Link href={docsLink} className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col justify-between group">
            {imageUrl && (
                <div className="relative w-full h-48 rounded-t-xl overflow-hidden mb-4">
                    <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
                </div>
            )}
            <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{title}</h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{description}</p>
            </div>
            <div className="mt-4 p-6 pt-0 text-blue-600 dark:text-blue-400 font-semibold flex items-center group-hover:underline">
                Read Documentation
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
        </Link>
    );
};

export default DocsProjectCard;
