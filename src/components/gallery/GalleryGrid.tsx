import React from 'react';

// Define the props interface for the GalleryGrid component
interface GalleryGridProps {
    children: React.ReactNode; // React nodes to be rendered within the grid (e.g., ImageCard components)
}

// GalleryGrid functional component responsible for displaying a responsive grid of gallery items
const GalleryGrid: React.FC<GalleryGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {children}
        </div>
    );
};

export default GalleryGrid;
