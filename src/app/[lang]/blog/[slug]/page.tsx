
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import PostContent from '@/components/blog/PostContent';
import PostHeader from '@/components/blog/PostHeader';
import type { Post } from '@/types';
import { formatDate } from '@/utils/formatDate';

const baseUrl = 'https://super.sagelga.workers.dev';
const languages = ['en', 'th', 'zh'];

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

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lang?: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const languagesAlternates = Object.fromEntries(
    languages.map((l) => [l, `${baseUrl}/${l}/blog/${slug}`])
  );

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: 'Kunanon Srisuntiroj' }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `${baseUrl}/blog/${slug}`,
      siteName: 'Kunanon Srisuntiroj Portfolio',
      images: [
        {
          url: post.feature_image || '/og-image.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      type: 'article',
      publishedTime: post.published_at,
      authors: ['Kunanon Srisuntiroj'],
      tags: post.primary_tag?.name ? [post.primary_tag.name] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.feature_image || '/og-image.png'],
    },
    alternates: {
      canonical: `${baseUrl}/blog/${slug}`,
      languages: languagesAlternates,
    }
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string; lang?: string }> }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8">
      <PostHeader title={post.title} date={formatDate(post.published_at)} category={post.primary_tag?.name || 'General'} />
      <PostContent content={post.content} />
    </article>
  );
}
