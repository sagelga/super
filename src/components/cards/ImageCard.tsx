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
        <div className="relative cursor-pointer group rounded-xl overflow-hidden" onClick={onClick}>
            {isLoading && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-semibold">{alt}</p>
            </div>
        </div>
    );
};

export default ImageCard;
