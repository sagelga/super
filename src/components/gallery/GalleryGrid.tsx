import React from 'react';


interface GalleryGridProps {
    children: React.ReactNode;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-2">
            {children}
        </div>
    );
};

export default GalleryGrid;
