'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Post } from '@/types/blog';

// Define the props interface for the BlogPostCard component
interface BlogPostCardProps extends Post {
    date: string;
    imageUrl: string;
    isLarge?: boolean; // Optional prop to render a larger card layout
    isCompact?: boolean; // Optional prop to render a compact card layout
    isFeatured?: boolean; // Optional prop to indicate if the post is featured
}

// BlogPostCard functional component
const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, date, primary_tag, slug, imageUrl, isLarge = false, isCompact = false, isFeatured = false }) => {
    const t = useTranslations('common');
    // State to handle image loading errors
    const [imageError, setImageError] = useState(false);

    // Conditional rendering for the compact layout
    if (isCompact) {
        return (
            <Link href={`/blog/${slug}`} className="group flex items-center space-x-4 p-4 bg-white rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:shadow-xl dark:bg-gray-800">
                <div className="flex-shrink-0 w-20 h-20 relative overflow-hidden rounded-lg">
                    {/* Render image or a placeholder if image fails to load */}
                    {(imageUrl && !imageError) ? (
                        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" onError={() => setImageError(true)} />
                    ) : (
                        <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs">
                            {t('no_image_available')}
                        </div>
                    )}
                </div>
                <div className="flex-grow">
                    {/* Display date and category */}
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{date} &bull; {primary_tag?.name}</p>
                    {/* Display post title */}
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 line-clamp-2">{title}</h3>
                    {/* Display post excerpt */}
                    <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-3">{excerpt}</p>
                </div>
            </Link>
        );
    }

    // Determine image height, title size, and excerpt line clamp based on isLarge prop
    const imageHeightClass = isLarge ? 'h-96' : 'h-56';
    const titleSizeClass = isLarge ? 'text-4xl' : 'text-2xl';
    const excerptLineClampClass = isLarge ? 'line-clamp-5' : 'line-clamp-3';

    return (
        <Link href={`/blog/${slug}`} className={`group block transform overflow-hidden rounded-xl shadow-lg transition-shadow duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl ${isFeatured ? 'bg-blue-50 dark:bg-blue-950' : 'bg-white dark:bg-gray-800'}`}>
            <div className={`relative w-full overflow-hidden ${imageHeightClass}`}>
                {/* Render image or a placeholder if image fails to load */}
                {(imageUrl && !imageError) ? (
                    <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" onError={() => setImageError(true)} />
                ) : (
                    <div className="w-full h-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400">
                        {t('no_image_available')}
                    </div>
                )}
            </div>
            <div className="p-6">
                {/* Display date and category */}
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">{date} &bull; {primary_tag?.name}</p>
                {/* Display post title */}
                <h2 className={`mb-3 leading-tight font-bold text-gray-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 ${titleSizeClass}`}>{title}</h2>
                {/* Display post excerpt */}
                <p className={`${excerptLineClampClass} text-base leading-relaxed text-gray-700 dark:text-gray-300`}>{excerpt}</p>
            </div>
        </Link>
    );
};

export default BlogPostCard;
