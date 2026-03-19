import React from 'react';
import DocsProjectCard, { DocsProjectCardProps } from '@/components/cards/DocsProjectCard';
import DocsProjectGrid from '@/components/docs/DocsProjectGrid';
import { useTranslations } from 'next-intl';

// Define the DocsPage component
const DocsPage: React.FC = () => {
    const t = useTranslations('docs');
    // Array of documentation projects with their details
    const docProjects = t.raw('projects') as unknown as DocsProjectCardProps[];

    // Render the DocsPage component
    return (
        <div className="bg-canvas min-h-screen">
            {/* Hero section with a title and description */}
            <section className="py-20 text-center bg-surface shadow-md">
                <div className="container mx-auto px-4">
                    <h1 className="font-display text-5xl font-extrabold mb-4 text-cream">{t('docs_page_title')}</h1>
                    <p className="text-xl max-w-2xl mx-auto text-muted">
                        {t('docs_page_description')}
                    </p>
                </div>
            </section>

            {/* Section to display the documentation projects */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="font-display text-4xl font-extrabold text-center mb-12 text-cream">{t('projects_documentation_title')}</h2>
                    {/* Grid layout for the documentation project cards */}
                    <DocsProjectGrid>
                        {/* Map through the docProjects array and render a card for each project */}
                        {docProjects.map((project, index) => (
                            <DocsProjectCard key={index} {...project} />
                        ))}
                    </DocsProjectGrid>
                </div>
            </section>
        </div>
    );
};

// Export the DocsPage component
export default DocsPage;
