import React from 'react';
import DocsProjectCard from '@/components/cards/DocsProjectCard';
import DocsProjectGrid from '@/components/docs/DocsProjectGrid';

const DocsPage: React.FC = () => {
    const docProjects = [
        {
            title: "Project Alpha Documentation",
            description: "Comprehensive documentation for Project Alpha.",
            docsLink: "/docs/project-alpha/introduction",
        },
        {
            title: "Project Beta Guide",
            description: "User guide and API reference for Project Beta.",
            docsLink: "/docs/project-beta/getting-started",
        },
    ];

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Documentation</h1>
            <DocsProjectGrid>
                {docProjects.map((project, index) => (
                    <DocsProjectCard key={index} {...project} />
                ))}
            </DocsProjectGrid>
        </div>
    );
};

export default DocsPage;
