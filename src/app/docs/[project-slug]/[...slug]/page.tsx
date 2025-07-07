import React from 'react';
import DocsLayout from '@/components/docs/DocsLayout';
import DocsSidebar from '@/components/docs/DocsSidebar';
import DocsContent from '@/components/docs/DocsContent';

interface DocsPageProps {
    params: {
        "project-slug": string;
        slug: string[];
    };
}

const DocDetailPage: React.FC<DocsPageProps> = ({ params }) => {
    const { "project-slug": projectSlug, slug } = params;
    const docPath = [projectSlug, ...slug].join('/');

    // Placeholder for fetching documentation content
    const docContent = `<h1>Documentation for ${projectSlug.replace(/-/g, ' ')}</h1><h2>Section: ${slug.join(' / ').replace(/-/g, ' ')}</h2><p>This is placeholder content for the documentation page.</p>`;

    // Placeholder for sidebar items
    const sidebarItems = [
        {
            title: "Introduction",
            path: `/docs/${projectSlug}/introduction`,
            children: [],
        },
        {
            title: "Getting Started",
            path: `/docs/${projectSlug}/getting-started`,
            children: [
                { title: "Installation", path: `/docs/${projectSlug}/getting-started/installation` },
                { title: "Configuration", path: `/docs/${projectSlug}/getting-started/configuration` },
            ],
        },
    ];

    return (
        <DocsLayout
            mainContent={<DocsContent content={docContent} />}
            sidebar={<DocsSidebar items={sidebarItems} currentPath={docPath} />}
        />
    );
};

export default DocDetailPage;
