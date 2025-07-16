import React, { useState } from 'react';
import Image from 'next/image';

// Define the props interface for the ImageCard component
interface ImageCardProps {
    src: string; // Source URL of the image
    alt: string; // Alt text for the image
    width: number; // Width of the image
    height: number; // Height of the image
    onClick: () => void; // Callback function when the card is clicked
}

// ImageCard functional component
const ImageCard: React.FC<ImageCardProps> = ({ src, alt, width, height, onClick }) => {
    // State to manage image loading status
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div className="group relative cursor-pointer overflow-hidden rounded-xl" onClick={onClick}>
            {/* Show a loading pulse effect while the image is loading */}
            {isLoading && (
                <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700"></div>
            )}
            {/* Next.js Image component for optimized image display */}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                onLoad={() => setIsLoading(false)} // Set loading to false once image is loaded
            />
            {/* Overlay with alt text that appears on hover */}
            <div className="bg-opacity-50 absolute inset-0 flex items-end bg-black p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="text-lg font-semibold text-white">{alt}</p>
            </div>
        </div>
    );
};

export default ImageCard;
