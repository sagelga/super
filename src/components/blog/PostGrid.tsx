import React from 'react';
import BlogPostCard from '@/components/cards/BlogPostCard'; // Import BlogPostCard component

import { BlogPost } from '@/types/blog'; // Import BlogPost type definition

// Define the props interface for the PostGrid component
interface PostGridProps {
    posts: BlogPost[]; // An array of BlogPost objects to display
}

// PostGrid functional component responsible for displaying a grid of blog posts
const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
    // If there are no posts, display a message
    if (!posts || posts.length === 0) {
        return <p>No blog posts found.</p>;
    }

    // Destructure posts for different sections of the grid
    const latestPost = posts[0]; // The first post is considered the latest
    const nextTwoPosts = posts.slice(1, 3); // The next two posts after the latest
    const remainingPosts = posts.slice(3); // All remaining posts

    return (
        <div className="space-y-10">
            {/* Main grid for the latest and next two posts */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 auto-rows-fr">
                {/* Latest Post (Large Bento Item) */}
                <div className="md:col-span-2 lg:col-span-2 row-span-2">
                    <BlogPostCard {...latestPost} isLarge={true} />
                </div>

                {/* Next Two Posts (Smaller Bento Items) */}
                {nextTwoPosts.map((post, index) => (
                    <div key={index} className="col-span-1">
                        <BlogPostCard {...post} isLarge={false} />
                    </div>
                ))}
            </div>

            {/* Render remaining posts if any */}
            {remainingPosts.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {remainingPosts.slice(0, 6).map((post, index) => (
                        <div key={index} className="col-span-1">
                            <BlogPostCard {...post} isCompact={true} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PostGrid;
