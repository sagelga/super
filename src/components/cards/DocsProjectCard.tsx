'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Define the props interface for the DocsProjectCard component
interface DocsProjectCardProps {
    title: string; // The title of the documentation project
    description: string; // A brief description of the project
    docsLink: string; // The link to the project's documentation page
    imageUrl?: string; // Optional URL for the project's image
}

// DocsProjectCard functional component
const DocsProjectCard: React.FC<DocsProjectCardProps> = ({ title, description, docsLink, imageUrl }) => {
    // State to handle image loading errors
    const [imageError, setImageError] = useState(false);

    return (
        <Link href={docsLink} className="group block flex h-full transform flex-col justify-between rounded-xl bg-white shadow-lg transition-shadow duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
            {/* Image section of the card */}
            <div className="relative mb-4 h-48 w-full overflow-hidden rounded-t-xl">
                {/* Conditionally render the image or a placeholder if image fails to load */}
                {(imageUrl && !imageError) ? (
                    <Image
                        src={imageUrl}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-300 group-hover:scale-105"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            {/* Content section of the card (title and description) */}
            <div className="flex-grow p-6">
                <h3 className="mb-2 text-2xl font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">{title}</h3>
                <p className="leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>
            </div>
            {/* Call to action section */}
            <div className="mt-4 flex items-center p-6 pt-0 font-semibold text-blue-600 group-hover:underline dark:text-blue-400">
                Read Documentation
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
        </Link>
    );
};

export default DocsProjectCard;
