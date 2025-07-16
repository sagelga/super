'use client';

import React, { useState, useEffect, useMemo } from 'react';

import FilterBar from '@/components/blog/FilterBar';
import PostGrid from '@/components/blog/PostGrid';

import { BlogPost } from '@/types/blog';

const BlogPage: React.FC = () => {
    // State variables for managing blog posts, filters, and UI status
    const [allBlogPosts, setAllBlogPosts] = useState<BlogPost[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // useEffect hook to fetch blog posts from the API when the component mounts
    useEffect(() => {
        const fetchBlogPosts = async () => {
            try {
                // Fetch data from the API
                const response = await fetch('https://superbrain.sagelga.workers.dev/api/posts');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                // Log the fetched data for debugging
                console.log(data);

                // Update the state with the fetched posts, ensuring data.posts is an array
                setAllBlogPosts(data.posts || []);

            } catch (e: unknown) {
                // Handle any errors that occur during the fetch
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                // Set loading to false once the fetch is complete
                setLoading(false);
            }
        };

        fetchBlogPosts();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    // useMemo hook to calculate the list of unique categories from the blog posts
    const categories = useMemo(() => {
        // Create a Set of unique categories from all blog posts
        const uniqueCategories = new Set((allBlogPosts || []).map(post => post.category));
        // Return an array with 'All' followed by the unique categories
        return ['All', ...Array.from(uniqueCategories)];
    }, [allBlogPosts]); // Recalculate only when allBlogPosts changes

    // useMemo hook to filter the blog posts based on the search term and selected category
    const filteredPosts = useMemo(() => {
        return (allBlogPosts || [])
            .filter(post => {
                // Filter by category
                return selectedCategory === 'All' || post.category === selectedCategory;
            })
            .filter(post => {
                // Filter by search term (case-insensitive)
                const term = searchTerm.toLowerCase();
                return post.title.toLowerCase().includes(term) || post.excerpt.toLowerCase().includes(term);
            });
    }, [searchTerm, selectedCategory, allBlogPosts]); // Recalculate when filters or posts change

    // Event handler for the search input field
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    // Event handler for selecting a category
    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
    };

    // Render the component's UI
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4 py-12 max-w-3xl">
                {/* Search input field */}
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
                {/* Conditional rendering based on loading and error states */}
                {loading && <p>Loading blog posts...</p>}
                {error && <p className="text-red-500">Error: {error}</p>}
                {!loading && !error && (
                    <>
                        {/* Filter bar for categories */}
                        <FilterBar categories={categories} onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
                        {/* Grid of filtered blog posts */}
                        <PostGrid posts={filteredPosts} />
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
