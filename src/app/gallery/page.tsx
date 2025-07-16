"use client";

// Import necessary React components and hooks
import React, { useState } from 'react';
import ImageCard from '@/components/cards/ImageCard';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';

// Define the structure of an image item
interface ImageItem {
    src: string;
    alt: string;
    width: number;
    height: number;
}

// Define the GalleryPage component
const GalleryPage: React.FC = () => {
    // State to keep track of the currently selected image for the lightbox
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

    // Generate an array of 20 placeholder images
    const images: ImageItem[] = [...Array(20).keys()].map((index) => ({
        src: `https://picsum.photos/seed/${index}/1200/800`, // Landscape images
        alt: `Gallery image ${index + 1}`,
        width: 1200,
        height: 800,
    }));

    // Function to open the lightbox with the selected image
    const openLightbox = (image: ImageItem) => {
        setSelectedImage(image);
    };

    // Function to close the lightbox
    const closeLightbox = () => {
        setSelectedImage(null);
    };

    // Render the GalleryPage component
    return (
        <div className="px-4 py-4">
            <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>
            {/* Grid layout for the gallery images */}
            <GalleryGrid>
                {/* Map through the images array and render an ImageCard for each */}
                {images.map((image, index) => (
                    <ImageCard key={index} {...image} onClick={() => openLightbox(image)} />
                ))}
            </GalleryGrid>
            {/* Render the Lightbox component if an image is selected */}
            {selectedImage && (
                <Lightbox
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    onClose={closeLightbox}
                />
            )}
        </div>
    );
};

// Export the GalleryPage component
export default GalleryPage;
