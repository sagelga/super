import React from 'react';

interface DocsProjectGridProps {
    children: React.ReactNode;
}

const DocsProjectGrid: React.FC<DocsProjectGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
        </div>
    );
};

export default DocsProjectGrid;
