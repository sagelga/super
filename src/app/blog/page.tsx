import React from 'react';
import BlogPostCard from '@/components/cards/BlogPostCard';
import FilterBar from '@/components/blog/FilterBar';
import PostGrid from '@/components/blog/PostGrid';

const BlogPage: React.FC = () => {
    const blogPosts = [
        {
            title: "My First Blog Post",
            excerpt: "This is a short excerpt from my first blog post.",
            date: "2023-01-15",
            category: "Technology",
            slug: "my-first-blog-post",
        },
        {
            title: "Learning Next.js",
            excerpt: "A journey into the world of Next.js development.",
            date: "2023-02-20",
            category: "Web Development",
            slug: "learning-nextjs",
        },
        {
            title: "Design Principles",
            excerpt: "Exploring fundamental design principles for better UIs.",
            date: "2023-03-10",
            category: "Design",
            slug: "design-principles",
        },
    ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Blog</h1>
            <FilterBar />
            <PostGrid>
                {blogPosts.map((post, index) => (
                    <BlogPostCard key={index} {...post} />
                ))}
            </PostGrid>
        </div>
    );
};

export default BlogPage;
