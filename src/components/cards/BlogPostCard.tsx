'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';


interface BlogPostCardProps {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
    imageUrl: string;
    isLarge?: boolean; // Add isLarge prop
    isCompact?: boolean; // Add isCompact prop for new layout
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, date, category, slug, imageUrl, isLarge = false, isCompact = false }) => {
    const [imageError, setImageError] = useState(false);

    if (isCompact) {
        return (
            <Link href={`/blog/${slug}`} className="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800">
                <div className="flex-shrink-0 w-24 h-24 relative overflow-hidden rounded-lg">
                    {(imageUrl && !imageError) ? (
                        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" onError={() => setImageError(true)} />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                            No Image
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    <p className="text-sm text-gray-500 dark:text-gray-400">{date} &bull; {category}</p>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{excerpt}</p>
                </div>
            </Link>
        );
    }

    const imageHeightClass = isLarge ? 'h-96' : 'h-56';
    const titleSizeClass = isLarge ? 'text-4xl' : 'text-2xl';
    const excerptLineClampClass = isLarge ? 'line-clamp-5' : 'line-clamp-3';

    return (
        <Link href={`/blog/${slug}`} className="group block transform overflow-hidden rounded-xl bg-white shadow-lg transition-shadow duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
            <div className={`relative w-full overflow-hidden ${imageHeightClass}`}>
                {(imageUrl && !imageError) ? (
                    <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" onError={() => setImageError(true)} />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        No Image
                    </div>
                )}
            </div>
            <div className="p-6">
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{date} &bull; {category}</p>
                <h2 className={`mb-3 leading-tight font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 ${titleSizeClass}`}>{title}</h2>
                <p className={`${excerptLineClampClass} text-base leading-relaxed text-gray-700 dark:text-gray-300`}>{excerpt}</p>
            </div>
        </Link>
    );
};

export default BlogPostCard;
