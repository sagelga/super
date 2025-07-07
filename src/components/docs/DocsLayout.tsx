import React from 'react';

interface DocsLayoutProps {
    mainContent: React.ReactNode;
    sidebar: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ mainContent, sidebar }) => {
    return (
        <div className="flex flex-col lg:flex-row min-h-screen pt-16">
            <div className="flex-grow lg:w-3/4 p-8">
                {mainContent}
            </div>
            <aside className="lg:w-1/4 p-8 bg-gray-50 dark:bg-gray-800 lg:sticky lg:top-16 lg:h-screen overflow-y-auto">
                {sidebar}
            </aside>
        </div>
    );
};

export default DocsLayout;
