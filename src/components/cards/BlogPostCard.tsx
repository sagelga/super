import React from 'react';
import Link from 'next/link';

interface BlogPostCardProps {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, date, category, slug }) => {
    return (
        <div className="border p-4 rounded-lg shadow-md">
            <Link href={`/blog/${slug}`}>
                <h3 className="text-xl font-semibold mb-2 hover:underline">{title}</h3>
            </Link>
            <p className="text-gray-600 mb-2">{excerpt}</p>
            <div className="text-sm text-gray-500">
                <span>{date}</span> <span className="mx-2">|</span> <span>{category}</span>
            </div>
        </div>
    );
};

export default BlogPostCard;
