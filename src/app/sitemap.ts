import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Fetch blog posts from your API here
  // For now, using dummy data similar to src/app/blog/page.tsx
  const blogPosts = [
    {
      slug: "my-first-blog-post",
      lastModified: "2023-01-15T00:00:00.000Z", // Replace with actual last modified date from your API
    },
    {
      slug: "learning-nextjs",
      lastModified: "2023-02-20T00:00:00.000Z",
    },
    {
      slug: "design-principles",
      lastModified: "2023-03-10T00:00:00.000Z",
    },
  ];

  const blogPostEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `https://super.sagelga.workers.dev/blog/${post.slug}`,
    lastModified: post.lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [
    {
      url: 'https://super.sagelga.workers.dev/',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: 'https://super.sagelga.workers.dev/blog',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: 'https://super.sagelga.workers.dev/gallery',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: 'https://super.sagelga.workers.dev/docs',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    ...blogPostEntries,
  ]
}
