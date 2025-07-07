import React from 'react';

interface PostGridProps {
    children: React.ReactNode;
}

const PostGrid: React.FC<PostGridProps> = ({ children }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
        </div>
    );
};

export default PostGrid;
