import React from 'react';

// Define the props interface for the DocsLayout component
interface DocsLayoutProps {
    mainContent: React.ReactNode; // The main content to be displayed
    sidebar: React.ReactNode; // The sidebar content to be displayed
}

// DocsLayout functional component responsible for structuring documentation pages
const DocsLayout: React.FC<DocsLayoutProps> = ({ mainContent, sidebar }) => {
    return (
        <div className="flex flex-col lg:flex-row">
            {/* Main content area */}
            <div className="flex-grow lg:w-3/4 p-8">
                {mainContent}
            </div>
            {/* Sidebar area */}
            <aside className="w-full lg:w-1/4 p-8">
                {sidebar}
            </aside>
        </div>
    );
};

export default DocsLayout;
