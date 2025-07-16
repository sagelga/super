import React from 'react';

// Define the props interface for the PostContent component
interface PostContentProps {
    content: string; // The HTML string content of the blog post
}

// PostContent functional component responsible for rendering the HTML content of a blog post
const PostContent: React.FC<PostContentProps> = ({ content }) => {
    return (
        // Render the content using dangerouslySetInnerHTML.
        // This is used when you have HTML content as a string and want to render it directly.
        // Be cautious when using this prop, as it can expose your application to XSS attacks
        // if the content is not sanitized or comes from untrusted sources.
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
    );
};

export default PostContent;