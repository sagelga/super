import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Kunanon Srisuntiroj Portfolio',
        short_name: 'Portfolio',
        description: 'Full-Stack Developer & Cloud Enthusiast - Personal portfolio website',
        start_url: '/',
        display: 'standalone',
        background_color: '#1a1a1a',
        theme_color: '#f59e0b',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
            },
        ],
        categories: ['portfolio', 'personal', 'developer'],
        lang: 'en',
        dir: 'ltr',
        scope: '/',
        prefer_related_applications: false,
    };
}
