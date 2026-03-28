import type { Metadata } from 'next';

const baseUrl = 'https://sagelga.com';
const languages = ['en', 'th', 'zh'];

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
    const { lang } = await params;
    // Thai is default (no prefix)
    const currentLang = lang ?? 'th';
    const currentUrl = currentLang === 'th' ? `${baseUrl}` : `${baseUrl}/${currentLang}`;

    return {
        title: 'Blog',
        description: 'Read the latest articles and tutorials from Kunanon Srisuntiroj on web development, cloud computing, and technology.',
        keywords: ['blog', 'articles', 'tutorials', 'web development', 'cloud computing', 'Kunanon Srisuntiroj'],
        alternates: {
            canonical: `${currentUrl}/blog`,
            languages: Object.fromEntries(
                languages.map((l) => [l, l === 'th' ? `${baseUrl}/blog` : `${baseUrl}/${l}/blog`])
            ),
        },
        openGraph: {
            title: 'Blog | Kunanon Srisuntiroj',
            description: 'Read the latest articles and tutorials on web development, cloud computing, and technology.',
            url: `${currentUrl}/blog`,
            siteName: 'Kunanon Srisuntiroj Portfolio',
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Blog' }],
            locale: currentLang === 'th' ? 'th_TH' : currentLang === 'zh' ? 'zh_CN' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Blog | Kunanon Srisuntiroj',
            description: 'Read the latest articles and tutorials on web development, cloud computing, and technology.',
            images: ['/og-image.png'],
        },
    };
}
