import React from 'react';
import BlogPostCard from '@/components/cards/BlogPostCard'; // Import BlogPostCard component

import { Post } from '@/types/blog'; // Import Post type definition

// Define the props interface for the PostGrid component
interface PostGridProps {
    posts: Post[]; // An array of Post objects to display
    isFeatured?: boolean; // Optional prop to indicate if the grid is for featured posts
}

// PostGrid functional component responsible for displaying a grid of blog posts
const PostGrid: React.FC<PostGridProps> = ({ posts, isFeatured }) => {
    // If there are no posts, display a message
    if (!posts || posts.length === 0) {
        return <p>No blog posts found.</p>;
    }

    if (isFeatured) {
        const latestPost = posts[0];
        const nextTwoPosts = posts.slice(1, 3);

        return (
            <div className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr">
                    {latestPost && (
                        <div className="md:col-span-2 lg:col-span-2 row-span-2">
                            <BlogPostCard {...latestPost} date={new Date(latestPost.published_at).toLocaleDateString()} imageUrl={latestPost.feature_image} isLarge={true} isFeatured={true} />
                        </div>
                    )}
                    {nextTwoPosts.map((post, index) => (
                        <div key={index} className="col-span-1">
                            <BlogPostCard {...post} date={new Date(post.published_at).toLocaleDateString()} imageUrl={post.feature_image} isLarge={false} isFeatured={true} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {posts.map((post, index) => (
                <div key={index} className="col-span-1">
                    <BlogPostCard {...post} date={new Date(post.published_at).toLocaleDateString()} imageUrl={post.feature_image} isCompact={true} />
                </div>
            ))}
        </div>
    );
};

export default PostGrid;
