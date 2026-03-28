import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
    const baseUrl = 'https://sagelga.com';
    const languages = ['en', 'th', 'zh'];
    const staticRoutes = [
        { path: '', priority: 1.0, changefreq: 'daily' },
        { path: '/blog', priority: 0.9, changefreq: 'weekly' },
        { path: '/gallery', priority: 0.7, changefreq: 'weekly' },
        { path: '/learn', priority: 0.8, changefreq: 'weekly' },
        { path: '/docs', priority: 0.8, changefreq: 'weekly' },
        { path: '/home/certifications', priority: 0.6, changefreq: 'weekly' },
        { path: '/home/experience', priority: 0.6, changefreq: 'weekly' },
        { path: '/home/projects', priority: 0.6, changefreq: 'weekly' },
        { path: '/home/volunteering', priority: 0.6, changefreq: 'weekly' },
    ];

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

    const urls: string[] = [];

    for (const lang of languages) {
        for (const route of staticRoutes) {
            // Thai (default) has no prefix, others do
            const langPrefix = lang === 'th' ? '' : `/${lang}`;
            const loc = `${baseUrl}${langPrefix}${route.path === '' ? '' : route.path}`;
            const lastMod = new Date().toISOString();
            // Generate alternate refs with Thai as default (no prefix)
            const alternateRefs = languages
                .map((l) => {
                    const altPrefix = l === 'th' ? '' : `/${l}`;
                    return `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}${altPrefix}${route.path === '' ? '' : route.path}"/>`;
                })
                .join('');
            urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    ${alternateRefs}
  </url>`);
        }

        for (const post of blogPosts) {
            // Thai (default) has no prefix, others do
            const langPrefix = lang === 'th' ? '' : `/${lang}`;
            const loc = `${baseUrl}${langPrefix}/blog/${post.slug}`;
            const lastMod = new Date(post.updated_at).toISOString();
            // Generate alternate refs with Thai as default (no prefix)
            const alternateRefs = languages
                .map((l) => {
                    const altPrefix = l === 'th' ? '' : `/${l}`;
                    return `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}${altPrefix}/blog/${post.slug}"/>`;
                })
                .join('');
            urls.push(`  <url>
    <loc>${loc}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
    ${alternateRefs}
  </url>`);
        }
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join('\n')}
</urlset>`;

    return new NextResponse(xml, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 'public, s-maxage=3600',
        },
    });
}
