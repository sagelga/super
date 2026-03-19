import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://super.sagelga.workers.dev';
    const languages = ['en', 'th', 'zh'];

    // Static routes
    const staticRoutes = [
        { path: '', priority: 1.0 },
        { path: 'blog', priority: 0.9 },
        { path: 'gallery', priority: 0.7 },
        { path: 'learn', priority: 0.8 },
        { path: 'docs', priority: 0.8 },
        { path: 'home/certifications', priority: 0.6 },
        { path: 'home/experience', priority: 0.6 },
        { path: 'home/projects', priority: 0.6 },
        { path: 'home/volunteering', priority: 0.6 },
    ];

    // Fetch blog posts from API
    let blogPosts: Array<{ slug: string; updated_at: string }> = [];
    try {
        const response = await fetch('https://superbrain.sagelga.workers.dev/api/posts?limit=100');
        if (response.ok) {
            const data = await response.json();
            blogPosts = data.posts?.map((post: { slug: string; updated_at: string }) => ({
                slug: post.slug,
                updated_at: post.updated_at,
            })) || [];
        }
    } catch (error) {
        console.error('Failed to fetch blog posts for sitemap:', error);
    }

    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Generate URLs for each language
    for (const lang of languages) {
        // Static routes
        for (const route of staticRoutes) {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}${route.path === '' ? '' : `/${route.path}`}`,
                lastModified: new Date(),
                changeFrequency: route.path === '' ? 'daily' : 'weekly',
                priority: route.priority,
                alternates: {
                    languages: Object.fromEntries(
                        languages.map(l => [l, `${baseUrl}/${l}${route.path === '' ? '' : `/${route.path}`}`])
                    ),
                },
            });
        }

        // Blog posts
        for (const post of blogPosts) {
            sitemapEntries.push({
                url: `${baseUrl}/${lang}/blog/${post.slug}`,
                lastModified: new Date(post.updated_at),
                changeFrequency: 'monthly' as const,
                priority: 0.8,
                alternates: {
                    languages: Object.fromEntries(
                        languages.map(l => [l, `${baseUrl}/${l}/blog/${post.slug}`])
                    ),
                },
            });
        }
    }

    return sitemapEntries;
}
