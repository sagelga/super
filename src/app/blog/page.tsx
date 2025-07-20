'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useTranslations } from 'next-intl';

import FilterBar from '@/components/blog/FilterBar';
import PostGrid from '@/components/blog/PostGrid';

import { Post } from '@/types/blog';

const BlogPage: React.FC = () => {
    const t = useTranslations('common');
    // State variables for managing blog posts, filters, and UI status
    const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
    const [otherBlogPosts, setOtherBlogPosts] = useState<Post[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const postsPerPage = 10; // Number of posts per page for 'other' posts

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            setError(null);
            try {
                // Fetch featured posts (first 3)
                const featuredResponse = await fetch('https://superbrain.sagelga.workers.dev/api/posts?limit=3');
                if (!featuredResponse.ok) {
                    throw new Error(`HTTP error! status: ${featuredResponse.status}`);
                }
                const featuredData = await featuredResponse.json();
                setFeaturedPosts(featuredData.posts || []);

                // Fetch paginated 'other' posts
                const otherResponse = await fetch(`https://superbrain.sagelga.workers.dev/api/posts?page=${currentPage}&limit=${postsPerPage}`);
                if (!otherResponse.ok) {
                    throw new Error(`HTTP error! status: ${otherResponse.status}`);
                }
                const otherData = await otherResponse.json();
                setOtherBlogPosts(otherData.posts || []);
                setTotalPages(otherData.totalPages || 1);

            } catch (e: unknown) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [currentPage]);

    const categories = useMemo(() => {
        const allPosts = [...featuredPosts, ...otherBlogPosts];
        const uniqueCategories = new Set((allPosts || []).map(post => post.primary_tag?.name));
        return ['All', ...Array.from(uniqueCategories)];
    }, [featuredPosts, otherBlogPosts]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        setCurrentPage(1); // Reset to first page on category change
    };

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const filteredFeaturedPosts = useMemo(() => {
        return featuredPosts.filter(post => {
            const matchesCategory = selectedCategory === 'All' || post.primary_tag?.name === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [featuredPosts, searchTerm, selectedCategory]);

    const filteredOtherBlogPosts = useMemo(() => {
        return otherBlogPosts.filter(post => {
            const matchesCategory = selectedCategory === 'All' || post.primary_tag?.name === selectedCategory;
            const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearch;
        });
    }, [otherBlogPosts, searchTerm, selectedCategory]);

    // Render the component's UI
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <div className="container mx-auto px-4">
                {/* Search input field */}
                <div className="mb-8 relative">
                    <input
                        type="text"
                        placeholder={t('blog.search_placeholder')}
                        className="w-full px-4 py-3 pl-10 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                {/* Conditional rendering based on loading and error states */}
                {loading && <p>{t('blog.loading_posts')}</p>}
                {error && <p className="text-red-500">{t('blog.error_loading_posts', { message: error })}</p>}
                {!loading && !error && (
                    <>
                        {/* Filter bar for categories */}
                        <FilterBar categories={categories} onSelectCategory={handleCategorySelect} selectedCategory={selectedCategory} />
                        {/* Featured Posts */}
                        {filteredFeaturedPosts.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('blog.featured_posts_title')}</h2>
                                <PostGrid posts={filteredFeaturedPosts} isFeatured={true} />
                            </div>
                        )}

                        {/* Other Blog Posts */}
                        {filteredOtherBlogPosts.length > 0 && (
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('blog.other_posts_title')}</h2>
                                <PostGrid posts={filteredOtherBlogPosts} />
                            </div>
                        )}

                        {/* Pagination Controls */}
                        {totalPages > 1 && (
                            <div className="flex justify-center items-center space-x-4 mt-8">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                                >
                                    {t('blog.previous_button')}
                                </button>
                                <span>
                                    {t('blog.page_of', { currentPage, totalPages })}
                                </span>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50"
                                >
                                    {t('blog.next_button')}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
