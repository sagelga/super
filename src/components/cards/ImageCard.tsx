import React from 'react';
import Image from 'next/image';

interface ImageCardProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    onClick: () => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ src, alt, width, height, onClick }) => {
    return (
        <div className="cursor-pointer border rounded-lg shadow-md overflow-hidden" onClick={onClick}>
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className="w-full h-auto object-cover"
            />
            <div className="p-2 text-sm text-gray-700">{alt}</div>
        </div>
    );
};

export default ImageCard;
