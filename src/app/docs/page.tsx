import React from 'react';
import DocsProjectCard, { DocsProjectCardProps } from '@/components/cards/DocsProjectCard';
import DocsProjectGrid from '@/components/docs/DocsProjectGrid';
import { useTranslations } from 'next-intl';

// Define the DocsPage component
const DocsPage: React.FC = () => {
    const t = useTranslations('docs');
    // Array of documentation projects with their details
    const docProjects = JSON.parse(t.raw('projects')) as DocsProjectCardProps[];

    // Render the DocsPage component
    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            {/* Hero section with a title and description */}
            <section className="py-20 text-center bg-linear-to-r from-blue-500 to-purple-600 text-white shadow-md">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-extrabold mb-4">{t('docs_page_title')}</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        {t('docs_page_description')}
                    </p>
                </div>
            </section>

            {/* Section to display the documentation projects */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">{t('projects_documentation_title')}</h2>
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
