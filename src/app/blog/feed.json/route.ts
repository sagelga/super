import { NextResponse } from 'next/server';
import { getBlogPosts, getAuthors } from '@/lib/content';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getBlogPosts();
  const authors = getAuthors();
  const BASE_URL = 'https://sagelga.com';

  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: 'Kunanon Srisuntiroj — Blog',
    home_page_url: `${BASE_URL}/blog`,
    feed_url: `${BASE_URL}/blog/feed.json`,
    description: 'Thoughts on technology, software development, and life.',
    authors: [{ name: 'Kunanon Srisuntiroj', url: BASE_URL }],
    items: posts.map(post => {
      const authorInfo = post.authors?.[0] ? authors[post.authors[0]] : null;
      return {
        id: `${BASE_URL}/blog/${post.slug}`,
        url: `${BASE_URL}/blog/${post.slug}`,
        title: post.title,
        summary: post.description,
        date_published: post.date ? new Date(post.date).toISOString() : undefined,
        tags: post.tags,
        ...(post.image && { image: post.image }),
        ...(authorInfo && { authors: [{ name: authorInfo.name, url: authorInfo.url }] }),
      };
    }),
  };

  return NextResponse.json(feed, {
    headers: {
      'Content-Type': 'application/feed+json; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600',
    },
  });
}
