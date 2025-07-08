import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './BlogPostCard.module.css';

interface BlogPostCardProps {
    title: string;
    excerpt: string;
    date: string;
    category: string;
    slug: string;
    imageUrl: string;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ title, excerpt, date, category, slug, imageUrl }) => {
    return (
        <Link href={`/blog/${slug}`} className={styles.card}>
            <div className={styles.imageContainer}>
                <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" className={styles.image} />
            </div>
            <div className={styles.content}>
                <p className={styles.meta}>{date} &bull; {category}</p>
                <h2 className={styles.title}>{title}</h2>
                <p className={styles.excerpt}>{excerpt}</p>
            </div>
        </Link>
    );
};

export default BlogPostCard;
