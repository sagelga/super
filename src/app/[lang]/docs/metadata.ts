import type { Metadata } from 'next';

const baseUrl = 'https://super.sagelga.workers.dev';
const languages = ['en', 'th', 'zh'];

export async function generateMetadata({ params }: { params: Promise<{ lang?: string }> }): Promise<Metadata> {
    const { lang = 'en' } = await params;
    const currentUrl = lang === 'en' ? `${baseUrl}` : `${baseUrl}/${lang}`;

    return {
        title: 'Documentation',
        description: 'Explore documentation for Kunanon Srisuntiroj\'s projects including Todoist-Notion Sync, Byteside One, and more.',
        keywords: ['documentation', 'Kunanon Srisuntiroj', 'Todoist Notion', 'Byteside One', 'projects'],
        alternates: {
            canonical: `${currentUrl}/docs`,
            languages: Object.fromEntries(
                languages.map((l) => [l, l === 'en' ? `${baseUrl}/docs` : `${baseUrl}/${l}/docs`])
            ),
        },
        openGraph: {
            title: 'Documentation | Kunanon Srisuntiroj',
            description: 'Explore documentation for Kunanon Srisuntiroj\'s projects.',
            url: `${currentUrl}/docs`,
            siteName: 'Kunanon Srisuntiroj Portfolio',
            images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Documentation' }],
            locale: lang === 'th' ? 'th_TH' : lang === 'zh' ? 'zh_CN' : 'en_US',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: 'Documentation | Kunanon Srisuntiroj',
            description: 'Explore documentation for Kunanon Srisuntiroj\'s projects.',
            images: ['/og-image.png'],
        },
    };
}
