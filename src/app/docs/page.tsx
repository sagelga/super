import React from 'react';
import DocsProjectCard from '@/components/cards/DocsProjectCard';
import DocsProjectGrid from '@/components/docs/DocsProjectGrid';

const DocsPage: React.FC = () => {
    const docProjects = [
        {
            title: "Todoist Notion Sync",
            description: "Documentation for the Todoist Notion Sync project, detailing setup and usage.",
            docsLink: "/docs/todoist-notion-sync/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Super",
            description: "Documentation for the Super personal portfolio website, covering its features and development.",
            docsLink: "/docs/super/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Superbrain",
            description: "API documentation for Superbrain, detailing endpoints and data structures.",
            docsLink: "/docs/superbrain/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Learn with sagelga",
            description: "Guides and resources for learning Python and SQL on the Learn with sagelga platform.",
            docsLink: "/docs/learn-with-sagelga/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Documentation Website",
            description: "Documentation for the documentation website itself, explaining its structure and how to contribute.",
            docsLink: "/docs/documentation-website/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Byteside.one",
            description: "Information about Byteside.one, a tech, gaming, and news publication.",
            docsLink: "/docs/byteside-one/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "The Sunny Side Publication",
            description: "Details about The Sunny Side Publication on Medium, its content, and history.",
            docsLink: "/docs/the-sunny-side-publication/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Approval Workflow on Google Apps Script",
            description: "Documentation for the automated approval workflow built with Google Apps Script.",
            docsLink: "/docs/approval-workflow-google-apps-script/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Essilor Asia Supplier Deduplication Report",
            description: "Documentation for the Oracle SQL and PL/SQL scripts used for supplier deduplication.",
            docsLink: "/docs/essilor-asia-supplier-deduplication-report/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Data Analytics on Body Fat",
            description: "Documentation for the data analytics project on body fat using IBM SPSS Statistics.",
            docsLink: "/docs/data-analytics-body-fat/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Lecture sharing System (Oh Sheet!)",
            description: "Documentation for the 'Oh Sheet!' lecture sharing system.",
            docsLink: "/docs/oh-sheet/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Online Space Reservation System",
            description: "Documentation for the online space reservation system.",
            docsLink: "/docs/online-space-reservation-system/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Thai restaurant analysis",
            description: "Documentation for the analysis of Thai restaurants in the United States.",
            docsLink: "/docs/thai-restaurant-analysis/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Trash Melody",
            description: "Documentation for the 'Trash Melody' OSU!-inspired Java game.",
            docsLink: "/docs/trash-melody/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
        {
            title: "Point of Sales (POS) System",
            description: "Documentation for the comprehensive Point-of-Sale (POS) system built in C.",
            docsLink: "/docs/pos-system/introduction",
            imageUrl: "/images/placeholder-docs.png", // Placeholder image
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
            <section className="py-20 text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md">
                <div className="container mx-auto px-4">
                    <h1 className="text-5xl font-extrabold mb-4">Comprehensive Documentation</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Explore detailed guides, API references, and project insights for all my work.
                    </p>
                </div>
            </section>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Projects Documentation</h2>
                    <DocsProjectGrid>
                        {docProjects.map((project, index) => (
                            <DocsProjectCard key={index} {...project} />
                        ))}
                    </DocsProjectGrid>
                </div>
            </section>
        </div>
    );
};

export default DocsPage;
