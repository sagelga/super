'use client';

import React, { useState, useEffect } from 'react';

import FilterBar from '@/components/blog/FilterBar';
import PostGrid from '@/components/blog/PostGrid';

const BlogPage: React.FC = () => {
    const allBlogPosts = React.useMemo(() => [
        {
            title: "My First Blog Post",
            excerpt: "This is a short excerpt from my first blog post.",
            date: "2023-01-15",
            category: "Technology",
            slug: "my-first-blog-post",
            imageUrl: "https://images.unsplash.com/photo-1682686581413-519e8f479892?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
        },
        {
            title: "Learning Next.js",
            excerpt: "A journey into the world of Next.js development.",
            date: "2023-02-20",
            category: "Web Development",
            slug: "learning-nextjs",
            imageUrl: "https://images.unsplash.com/photo-1682686581413-519e8f479892?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG00by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
        },
        {
            title: "Design Principles",
            excerpt: "Exploring fundamental design principles for better UIs.",
            date: "2023-03-10",
            category: "Design",
            slug: "design-principles",
            imageUrl: "https://images.unsplash.com/photo-1682686581413-519e8f479892?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Placeholder image
        },
    ], []);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [filteredPosts, setFilteredPosts] = useState(allBlogPosts);

    const categories = Array.from(new Set(allBlogPosts.map(post => post.category)));

    useEffect(() => {
        let posts = allBlogPosts;

        if (selectedCategory !== 'All') {
            posts = posts.filter(post => post.category === selectedCategory);
        }

        if (searchTerm) {
            posts = posts.filter(post =>
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        setFilteredPosts(posts);
    }, [searchTerm, selectedCategory, allBlogPosts]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            

            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-8 relative">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <FilterBar categories={categories} onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
                <PostGrid posts={filteredPosts} />
            </div>
        </div>
    );
};

export default BlogPage;
