import React from 'react';

// Define the props interface for the DocsProjectGrid component
interface DocsProjectGridProps {
    children: React.ReactNode; // React nodes to be rendered within the grid (e.g., DocsProjectCard components)
}

// DocsProjectGrid functional component responsible for displaying a grid of documentation projects
const DocsProjectGrid: React.FC<DocsProjectGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
        </div>
    );
};

export default DocsProjectGrid;
