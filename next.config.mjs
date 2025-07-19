const nextConfig = {
  i18n: {
    locales: ['th', 'en'],
    defaultLocale: 'th',
  },
  experimental: {
    optimizePackageImports: ['@cloudflare/next-on-pages'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.jsdelivr.net',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
      },
    ],
  },
};

export default nextConfig;
