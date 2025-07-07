import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface BlogPostCardProps {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
    imageUrl: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, date, category, slug, imageUrl }) => {
    return (
        <Link href={`/blog/${slug}`} className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 overflow-hidden group">
            <div className="relative w-full h-56 overflow-hidden">
                <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className="transition-transform duration-300 group-hover:scale-105" />
            </div>
            <div className="p-6">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{date} &bull; {category}</p>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{title}</h2>
                <p className="text-gray-700 dark:text-gray-300 text-base line-clamp-3 leading-relaxed">{excerpt}</p>
            </div>
        </Link>
    );
};

export default BlogPostCard;
