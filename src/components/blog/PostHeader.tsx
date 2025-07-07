import React from 'react';

interface PostHeaderProps {
    title: string;
    date: string;
    category: string;
}

const PostHeader: React.FC<PostHeaderProps> = ({ title, date, category }) => {
    return (
        <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2">{title}</h1>
            <div className="text-gray-600 text-lg">
                <span>{date}</span> <span className="mx-2">|</span> <span>{category}</span>
            </div>
        </header>
    );
};

export default PostHeader;
