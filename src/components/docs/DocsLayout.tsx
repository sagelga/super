import React from 'react';

interface DocsLayoutProps {
    children: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            {children}
        </div>
    );
};

export default DocsLayout;
