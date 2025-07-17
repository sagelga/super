
import { notFound } from 'next/navigation';
import PostContent from '@/components/blog/PostContent';
import PostHeader from '@/components/blog/PostHeader';
import { Post } from '@/types/blog';

async function getPost(slug: string): Promise<Post | null> {
  try {
    const res = await fetch(`https://superbrain.sagelga.workers.dev/api/posts/${slug}`);
    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    console.error('Failed to fetch post:', error);
    return null;
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <PostHeader title={post.title} date={new Date(post.published_at).toLocaleDateString()} category={post.primary_tag?.name || 'General'} />
      <PostContent content={post.content} />
    </article>
  );
}
