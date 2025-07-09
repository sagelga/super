import React, { useState } from 'react';
import Image from 'next/image';


interface ImageCardProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, width, height, onClick }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="group relative cursor-pointer overflow-hidden rounded-xl" onClick={onClick}>
            {isLoading && (
                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
            />
            <div className="bg-opacity-50 absolute inset-0 flex items-end bg-black p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-lg font-semibold text-white">{alt}</p>
            </div>
        </div>
    );
};

export default ImageCard;
