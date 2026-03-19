/**
 * SEO Implementation Tests
 * Tests to verify SEO metadata and structured data are properly configured
 */

describe('SEO Configuration', () => {
    describe('Sitemap', () => {
        it('should have sitemap.ts file', async () => {
            // Verify sitemap configuration exists
            const sitemap = await import('../app/sitemap');
            expect(sitemap.default).toBeDefined();
        });
    });

    describe('Robots', () => {
        it('should have robots.ts file', async () => {
            // Verify robots configuration exists
            const robots = await import('../app/robots');
            expect(robots.default).toBeDefined();
        });
    });

    describe('Manifest', () => {
        it('should have manifest.ts file', async () => {
            // Verify PWA manifest exists
            const manifest = await import('../app/manifest');
            expect(manifest.default).toBeDefined();
            expect(manifest.default.name).toBe('Kunanon Srisuntiroj Portfolio');
            expect(manifest.default.theme_color).toBe('#f59e0b');
        });
    });

    describe('Metadata Configuration', () => {
        it('should have proper site configuration', async () => {
            const siteConfig = await import('../config/site');
            const config = siteConfig.siteConfig();
            
            expect(config.name).toBeDefined();
            expect(config.url).toContain('https://');
            expect(config.email).toContain('@');
        });
    });

    describe('Root Layout Metadata', () => {
        it('should have JSON-LD structured data in layout', async () => {
            // Read layout file to verify JSON-LD
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            // Check for JSON-LD script tag
            expect(layoutContent).toContain('application/ld+json');
            expect(layoutContent).toContain('@context');
            expect(layoutContent).toContain('@graph');
        });

        it('should have Twitter card metadata in layout', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('twitter:card');
            expect(layoutContent).toContain('summary_large_image');
        });

        it('should have OpenGraph metadata in layout', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('openGraph');
            expect(layoutContent).toContain('og-image.png');
        });

        it('should have hreflang configuration', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('alternates');
            expect(layoutContent).toContain('languages');
        });
    });

    describe('Blog Post Metadata', () => {
        it('should have metadata for blog posts', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const blogPostPath = path.join(process.cwd(), 'src/app/[lang]/blog/[slug]/page.tsx');
            const blogPostContent = fs.readFileSync(blogPostPath, 'utf-8');
            
            expect(blogPostContent).toContain('generateMetadata');
            expect(blogPostContent).toContain('@type');
        });
    });

    describe('Public Assets', () => {
        it('should have OG image', () => {
            const fs = await import('fs');
            const path = await import('path');
            const ogImagePath = path.join(process.cwd(), 'public/og-image.svg');
            expect(fs.existsSync(ogImagePath)).toBe(true);
        });

        it('should have favicon', () => {
            const fs = await import('fs');
            const path = await import('path');
            const faviconPath = path.join(process.cwd(), 'public/favicon.ico');
            expect(fs.existsSync(faviconPath)).toBe(true);
        });

        it('should have SVG icon', () => {
            const fs = await import('fs');
            const path = await import('path');
            const iconPath = path.join(process.cwd(), 'public/icon.svg');
            expect(fs.existsSync(iconPath)).toBe(true);
        });

        it('should have robots.txt', () => {
            const fs = await import('fs');
            const path = await import('path');
            const robotsPath = path.join(process.cwd(), 'public/robots.txt');
            expect(fs.existsSync(robotsPath)).toBe(true);
        });
    });
});

describe('SEO Best Practices', () => {
    describe('Schema.org Structured Data', () => {
        it('should include Person schema', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('"@type": "Person"');
            expect(layoutContent).toContain('Kunanon Srisuntiroj');
        });

        it('should include WebSite schema', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('"@type": "WebSite"');
            expect(layoutContent).toContain('SearchAction');
        });

        it('should include Organization schema', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('"@type": "Organization"');
        });
    });

    describe('Multi-language Support', () => {
        it('should support en, th, zh languages', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('en');
            expect(layoutContent).toContain('th');
            expect(layoutContent).toContain('zh');
        });

        it('should have proper locale formatting', async () => {
            const fs = await import('fs');
            const path = await import('path');
            const layoutPath = path.join(process.cwd(), 'src/app/layout.tsx');
            const layoutContent = fs.readFileSync(layoutPath, 'utf-8');
            
            expect(layoutContent).toContain('en_US');
            expect(layoutContent).toContain('th_TH');
        });
    });
});
