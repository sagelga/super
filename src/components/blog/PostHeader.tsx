import React from "react";

// Define the props interface for the PostHeader component
interface PostHeaderProps {
    title: string;
    date: string;
    category: string;
}

// PostHeader functional component responsible for displaying the header of a blog post
const PostHeader: React.FC<PostHeaderProps> = ({ title, date, category }) => {
    return (
        <header className="mb-8 text-center">
            <h1 className="mb-4 text-5xl font-extrabold leading-tight text-cream sm:text-6xl">
                {title}
            </h1>
            <div className="text-base text-muted sm:text-lg">
                <span>{date}</span> <span className="mx-2">&bull;</span>{" "}
                <span>{category}</span>
            </div>
        </header>
    );
};

export default PostHeader;
