import React from 'react';
import PostHeader from '@/components/blog/PostHeader';
import PostContent from '@/components/blog/PostContent';
import TableOfContents from '@/components/blog/TableOfContents';

interface BlogPostPageProps {
    params: { slug: string };
}

const BlogPostPage: React.FC<BlogPostPageProps> = ({ params }) => {
    const { slug } = params;

    // Placeholder for fetching blog post data based on slug
    const post = {
        title: `Blog Post: ${slug.replace(/-/g, ' ')}`,
        date: "2023-XX-XX",
        category: "Placeholder",
        content: `<p>This is the content for the blog post titled "${slug.replace(/-/g, ' ')}".</p><h2>Section 1</h2><p>Content for section 1.</p><h3>Subsection 1.1</h3><p>Content for subsection 1.1.</p><h2>Section 2</h2><p>Content for section 2.</p>`,
    };

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col lg:flex-row gap-8">
                <main className="lg:w-3/4">
                    <PostHeader title={post.title} date={post.date} category={post.category} />
                    <PostContent content={post.content} />
                </main>
                <aside className="lg:w-1/4">
                    <TableOfContents content={post.content} />
                </aside>
            </div>
        </div>
    );
};

export default BlogPostPage;
