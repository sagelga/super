import React from 'react';
import PostHeader from '@/components/blog/PostHeader';
import PostContent from '@/components/blog/PostContent';
import BlogPostCard from '@/components/cards/BlogPostCard';
import TableOfContents from '@/components/blog/TableOfContents';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PostPageProps {
    params: {
        slug: string;
    };
}

// Fetch data from the API
async function getPostData(slug: string) {
    try {
        const res = await fetch(`https://superbrain.sagelga.workers.dev/api/posts/${slug}`);
        if (!res.ok) {
            return null;
        }
        const post = await res.json();
        console.log("Fetched post data:", post);

        // Fetch all posts to find related ones
        const allPostsRes = await fetch('https://superbrain.sagelga.workers.dev/api/posts');
        if (!allPostsRes.ok) {
            console.error('Failed to fetch all posts for related articles');
            return { post, relatedPosts: [] };
        }
        const allPostsData = await allPostsRes.json();
        const allPosts = allPostsData.posts || [];

        // Filter related posts by category and exclude the current post
        const relatedPosts = allPosts
            .filter((p: any) => p.primary_tag?.name === post.primary_tag?.name && p.slug !== post.slug)
            .sort((a: any, b: any) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())
            .slice(0, 4);

        return { post, relatedPosts };
    } catch (error) {
        console.error('Failed to fetch post or related posts:', error);
        return null;
    }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const post = await getPostData(params.slug);

    if (!post) {
        return {
            title: 'Post Not Found',
        };
    }

    return {
        title: post.title,
        description: post.custom_excerpt || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.custom_excerpt || post.excerpt,
            images: [
                {
                    url: post.feature_image,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
    };
}

const PostPage: React.FC<PostPageProps> = async ({ params }) => {
    const data = await getPostData(params.slug);

    if (!data || !data.post) {
        notFound();
    }

    const { post, relatedPosts } = data;

    const formattedDate = new Date(post.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return (
        <div className="bg-gray-50 dark:bg-gray-900 py-12 sm:py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-3xl mx-auto">
                    <article className="mb-12">
                        <PostHeader
                            title={post.title}
                            date={formattedDate}
                            category={post.primary_tag?.name || 'General'}
                        />
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8">
                            <main className="md:col-span-3">
                                {post.feature_image && (
                                    <img
                                        src={post.feature_image}
                                        alt={post.title}
                                        className="w-full h-auto rounded-lg mb-8"
                                    />
                                )}
                                <div className="prose prose-lg max-w-none font-serif dark:prose-invert">
                                    <PostContent content={post.html || ''} />
                                </div>
                            </main>
                            <aside className="md:col-span-1">
                                <div className="sticky top-24">
                                    <TableOfContents content={post.html || ''} />
                                </div>
                            </aside>
                        </div>
                    </article>

                    {relatedPosts && relatedPosts.length > 0 && (
                        <section className="mb-12">
                            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">More from the Blog</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {relatedPosts.map((relatedPost: any) => (
                                    <BlogPostCard
                                        key={relatedPost.slug}
                                        title={relatedPost.title}
                                        excerpt={relatedPost.excerpt}
                                        date={new Date(relatedPost.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                        category={relatedPost.primary_tag?.name || 'General'}
                                        slug={relatedPost.slug}
                                        imageUrl={relatedPost.feature_image || ''}
                                        isCompact={true}
                                    />
                                ))}
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostPage;