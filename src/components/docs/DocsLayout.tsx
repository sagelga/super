import React from 'react';


interface DocsLayoutProps {
    mainContent: React.ReactNode;
    sidebar: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ mainContent, sidebar }) => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="flex-grow lg:w-3/4 p-8">
                {mainContent}
            </div>
            <aside className="w-full lg:w-1/4 p-8">
                {sidebar}
            </aside>
        </div>
    );
};

export default DocsLayout;
