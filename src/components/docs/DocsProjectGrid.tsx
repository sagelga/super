import React from 'react';
import styles from './DocsProjectGrid.module.css';

interface DocsProjectGridProps {
    children: React.ReactNode;
}

const DocsProjectGrid: React.FC<DocsProjectGridProps> = ({ children }) => {
    return (
        <div className={styles.gridContainer}>
            {children}
        </div>
    );
};

export default DocsProjectGrid;
