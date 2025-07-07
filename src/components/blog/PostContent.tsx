import React from 'react';

interface PostContentProps {
    content: string; // HTML string or Markdown converted to HTML
}

const PostContent: React.FC<PostContentProps> = ({ content }) => {
    return (
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default PostContent;
