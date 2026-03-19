/**
 * Docs Projects Tests
 * Tests to verify docs projects are properly configured
 */

describe('Docs Projects Configuration', () => {
    const expectedProjects = [
        'statuspage-pulse',
        'mahjong-hands',
        'todoist-notion-sync',
        'todoist-to-cloudflarekv',
        'cloudflarekv-to-notion',
        'byteside-fetcher',
    ];

    describe('English Docs', () => {
        it('should have all expected projects in English docs', async () => {
            const enDocs = await import('../locales/en/docs.json');
            
            expectedProjects.forEach((projectSlug) => {
                const project = enDocs.projects.find(
                    (p) => p.docsLink === '/docs/' + projectSlug
                );
                expect(project).toBeDefined();
                expect(project.title).toBeDefined();
                expect(project.description).toBeDefined();
                expect(project.docsLink).toBe('/docs/' + projectSlug);
            });
        });

        it('should have correct project count', async () => {
            const enDocs = await import('../locales/en/docs.json');
            // Original 15 projects + 6 new projects = 21
            expect(enDocs.projects.length).toBeGreaterThanOrEqual(20);
        });
    });

    describe('Thai Docs', () => {
        it('should have all expected projects in Thai docs', async () => {
            const thDocs = await import('../locales/th/docs.json');
            
            expectedProjects.forEach((projectSlug) => {
                const project = thDocs.projects.find(
                    (p) => p.docsLink === '/docs/' + projectSlug
                );
                expect(project).toBeDefined();
                expect(project.title).toBeDefined();
                expect(project.description).toBeDefined();
                expect(project.docsLink).toBe('/docs/' + projectSlug);
            });
        });

        it('should have correct project count', async () => {
            const thDocs = await import('../locales/th/docs.json');
            expect(thDocs.projects.length).toBeGreaterThanOrEqual(20);
        });
    });

    describe('Chinese Docs', () => {
        it('should have all expected projects in Chinese docs', async () => {
            const zhDocs = await import('../locales/zh/docs.json');
            
            expectedProjects.forEach((projectSlug) => {
                const project = zhDocs.projects.find(
                    (p) => p.docsLink === '/docs/' + projectSlug
                );
                expect(project).toBeDefined();
                expect(project.title).toBeDefined();
                expect(project.description).toBeDefined();
                expect(project.docsLink).toBe('/docs/' + projectSlug);
            });
        });

        it('should have correct project count', async () => {
            const zhDocs = await import('../locales/zh/docs.json');
            expect(zhDocs.projects.length).toBeGreaterThanOrEqual(20);
        });
    });

    describe('Project Data Structure', () => {
        it('should have all required fields for each project', async () => {
            const enDocs = await import('../locales/en/docs.json');
            
            enDocs.projects.forEach((project) => {
                expect(typeof project.title).toBe('string');
                expect(project.title.length).toBeGreaterThan(0);
                expect(typeof project.description).toBe('string');
                expect(project.description.length).toBeGreaterThan(0);
                expect(project.docsLink).toMatch(/^\/docs\//);
                expect(project.imageUrl).toBeDefined();
            });
        });

        it('should have unique docsLink for each project', async () => {
            const enDocs = await import('../locales/en/docs.json');
            const docsLinks = enDocs.projects.map((p) => p.docsLink);
            const uniqueLinks = [...new Set(docsLinks)];
            expect(uniqueLinks.length).toBe(docsLinks.length);
        });
    });

    describe('New Projects Content', () => {
        it('should have correct Statuspage Pulse project', async () => {
            const enDocs = await import('../locales/en/docs.json');
            const project = enDocs.projects.find(
                (p) => p.docsLink === '/docs/statuspage-pulse'
            );
            expect(project.title).toBe('Statuspage Pulse');
            expect(project.description).toContain('status page');
        });

        it('should have correct Mahjong Hands project', async () => {
            const enDocs = await import('../locales/en/docs.json');
            const project = enDocs.projects.find(
                (p) => p.docsLink === '/docs/mahjong-hands'
            );
            expect(project.title).toBe('Mahjong Hands');
            expect(project.description).toContain('mahjong');
        });

        it('should have correct Todoist to Cloudflare KV project', async () => {
            const enDocs = await import('../locales/en/docs.json');
            const project = enDocs.projects.find(
                (p) => p.docsLink === '/docs/todoist-to-cloudflarekv'
            );
            expect(project.title).toBe('Todoist to Cloudflare KV');
            expect(project.description).toContain('Cloudflare');
        });

        it('should have correct Cloudflare KV to Notion project', async () => {
            const enDocs = await import('../locales/en/docs.json');
            const project = enDocs.projects.find(
                (p) => p.docsLink === '/docs/cloudflarekv-to-notion'
            );
            expect(project.title).toBe('Cloudflare KV to Notion');
            expect(project.description).toContain('Notion');
        });

        it('should have correct Byteside Fetcher project', async () => {
            const enDocs = await import('../locales/en/docs.json');
            const project = enDocs.projects.find(
                (p) => p.docsLink === '/docs/byteside-fetcher'
            );
            expect(project.title).toBe('Byteside Fetcher');
            expect(project.description).toContain('Notion');
        });
    });
});
