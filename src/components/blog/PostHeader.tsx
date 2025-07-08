import React from 'react';
import styles from './PostHeader.module.css';

interface PostHeaderProps {
    title: string;
    date: string;
    category: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, date, category }) => {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>{title}</h1>
            <div className={styles.meta}>
                <span>{date}</span> <span className={styles.separator}>|</span> <span>{category}</span>
            </div>
        </header>
    );
};

export default PostHeader;