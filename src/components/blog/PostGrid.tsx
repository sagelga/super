import React from 'react';
import BlogPostCard from '@/components/cards/BlogPostCard'; // Import BlogPostCard

import { BlogPost } from '@/types/blog'; // Import BlogPost type

interface PostGridProps {
    posts: BlogPost[]; // Use BlogPost type
}

const PostGrid: React.FC<PostGridProps> = ({ posts }) => {
    if (!posts || posts.length === 0) {
        return <p>No blog posts found.</p>;
    }

    const latestPost = posts[0];
    const nextTwoPosts = posts.slice(1, 3);
    const remainingPosts = posts.slice(3);

    return (
        <div className="space-y-10">
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
