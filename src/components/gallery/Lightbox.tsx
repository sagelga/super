import React from 'react';
import Image from 'next/image';

// Define the props interface for the Lightbox component
interface LightboxProps {
    src: string; // Source URL of the image to display in the lightbox
    alt: string; // Alt text for the image
    onClose: () => void; // Callback function to close the lightbox
}

// Lightbox functional component
const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
    return (
        // Overlay that covers the entire screen, acting as the lightbox background
        <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={onClose} // Close lightbox when clicking on the overlay
        >
            {/* Container for the image within the lightbox */}
            <div className="relative max-w-3xl max-h-full">
                {/* Next.js Image component to display the full-size image */}
                <Image src={src} alt={alt} layout="intrinsic" width={1200} height={800} objectFit="contain" />
                {/* Close button for the lightbox */}
                <button
                    className="absolute top-4 right-4 text-white text-2xl font-bold"
                    onClick={onClose} // Close lightbox when clicking the button
                >
                    &times; {/* Multiplication sign for close icon */}
                </button>
            </div>
        </div>
    );
};

export default Lightbox;
