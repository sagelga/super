import React from 'react';

// Define the props interface for the PostHeader component
interface PostHeaderProps {
    title: string; // The title of the blog post
    date: string; // The publication date of the blog post
    category: string; // The category of the blog post
}

// PostHeader functional component responsible for displaying the header of a blog post
const PostHeader: React.FC<PostHeaderProps> = ({ title, date, category }) => {
    return (
        <header className="mb-8 text-center">
            {/* Display the blog post title */}
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-4 leading-tight text-gray-900 dark:text-white">{title}</h1>
            {/* Display the date and category */}
            <div className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">
                <span>{date}</span> <span className="mx-2">•</span> <span>{category}</span>
            </div>
        </header>
    );
};

export default PostHeader;
