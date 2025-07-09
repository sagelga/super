import React from 'react';
import Image from 'next/image';


interface LightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose}
        >
            <div className="relative max-w-3xl max-h-full">
                <Image src={src} alt={alt} layout="intrinsic" width={1200} height={800} objectFit="contain" />
                <button
                    className="absolute top-4 right-4 text-white text-2xl font-bold"
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Lightbox;
