import React from 'react';
import styles from './PostContent.module.css';

interface PostContentProps {
    content: string; // HTML string or Markdown converted to HTML
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
    return (
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default PostContent;