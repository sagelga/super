import React from 'react';
import Link from 'next/link';
import styles from './DocsContent.module.css';

interface DocsContentProps {
    content: string; // HTML string
    prevPage?: { title: string; path: string };
    nextPage?: { title: string; path: string };
}

const DocsContent: React.FC<DocsContentProps> = ({ content, prevPage, nextPage }) => {
    return (
        <main className={styles.mainContent}>
            <div className={styles.proseContent} dangerouslySetInnerHTML={{ __html: content }} />
            <div className={styles.pagination}>
                {prevPage && (
                    <Link href={prevPage.path} className={styles.paginationLink}>
                        &larr; {prevPage.title}
                    </Link>
                )}
                {nextPage && (
                    <Link href={nextPage.path} className={`${styles.paginationLink} ${styles.nextPageLink}`}>
                        {nextPage.title} &rarr;
                    </Link>
                )}
            </div>
        </main>
    );
};

export default DocsContent;