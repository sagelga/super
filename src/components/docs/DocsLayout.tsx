import React from 'react';
import styles from './DocsLayout.module.css';

interface DocsLayoutProps {
    mainContent: React.ReactNode;
    sidebar: React.ReactNode;
}

const DocsLayout: React.FC<DocsLayoutProps> = ({ mainContent, sidebar }) => {
    return (
        <div className={styles.layoutContainer}>
            <div className={styles.mainContent}>
                {mainContent}
            </div>
            <aside className={styles.sidebar}>
                {sidebar}
            </aside>
        </div>
    );
};

export default DocsLayout;