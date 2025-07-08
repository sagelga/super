import React from 'react';
import styles from './PostGrid.module.css';

interface PostGridProps {
    children: React.ReactNode;
}

const PostGrid: React.FC<PostGridProps> = ({ children }) => {
    return (
        <div className={styles.gridContainer}>
            {children}
        </div>
    );
};

export default PostGrid;
