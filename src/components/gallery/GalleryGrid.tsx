import React from 'react';
import styles from './GalleryGrid.module.css';

interface GalleryGridProps {
    children: React.ReactNode;
}

const GalleryGrid: React.FC<GalleryGridProps> = ({ children }) => {
    return (
        <div className={styles.gridContainer}>
            {children}
        </div>
    );
};

export default GalleryGrid;
