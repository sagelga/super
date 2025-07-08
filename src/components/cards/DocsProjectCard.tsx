import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './DocsProjectCard.module.css';

interface DocsProjectCardProps {
    title: string;
    description: string;
    docsLink: string;
    imageUrl?: string; // Added imageUrl prop
}

const DocsProjectCard: React.FC<DocsProjectCardProps> = ({ title, description, docsLink, imageUrl }) => {
    return (
        <Link href={docsLink} className={styles.card}>
            {imageUrl && (
                <div className={styles.imageContainer}>
                    <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className={styles.image} />
                </div>
            )}
            <div className={styles.content}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.description}>{description}</p>
            </div>
            <div className={styles.readMore}>
                Read Documentation
                <svg className={styles.readMoreIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </div>
        </Link>
    );
};

export default DocsProjectCard;
