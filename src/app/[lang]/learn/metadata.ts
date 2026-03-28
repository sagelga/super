import type { Metadata } from 'next';

const baseUrl = 'https://sagelga.com';
const languages = ['en', 'th', 'zh'];

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
    const { lang } = await params;
    // Thai is default (no prefix)
    const currentLang = lang ?? 'th';
    const currentUrl = currentLang === 'th' ? `${baseUrl}` : `${baseUrl}/${currentLang}`;

    return {
        title: 'Learn',
        description: 'Discover learning paths and mentorship opportunities with Kunanon Srisuntiroj. From web development to cloud computing and productivity tools.',
        keywords: ['learn', 'tutorial', 'mentorship', 'web development', 'Kunanon Srisuntiroj', 'education'],
        alternates: {
            canonical: `${currentUrl}/learn`,
            languages: Object.fromEntries(
                languages.map((l) => [l, l === 'th' ? `${baseUrl}/learn` : `${baseUrl}/${l}/learn`])
            ),
        },
        openGraph: {
            title: 'Learn with Kunanon | Kunanon Srisuntiroj',
            description: 'Discover learning paths and mentorship opportunities.',
            url: `${currentUrl}/learn`,
            siteName: 'Kunanon Srisuntiroj Portfolio',
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Learn' }],
            locale: currentLang === 'th' ? 'th_TH' : currentLang === 'zh' ? 'zh_CN' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Learn with Kunanon | Kunanon Srisuntiroj',
            description: 'Discover learning paths and mentorship opportunities.',
            images: ['/og-image.png'],
        },
    };
}
