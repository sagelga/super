"use client";

import React, { useState } from 'react';
import ImageCard from '@/components/cards/ImageCard';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import Lightbox from '@/components/gallery/Lightbox';

interface ImageItem {
    src: string;
    alt: string;
    width: number;
    height: number;
}

const GalleryPage: React.FC = () => {
    const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

    const images: ImageItem[] = [
        { src: "/images/gallery1.jpg", alt: "Gallery Image 1", width: 800, height: 600 },
        { src: "/images/gallery2.jpg", alt: "Gallery Image 2", width: 1024, height: 768 },
        { src: "/images/gallery3.jpg", alt: "Gallery Image 3", width: 1200, height: 800 },
        { src: "/images/gallery4.jpg", alt: "Gallery Image 4", width: 900, height: 1200 },
    ];

    const openLightbox = (image: ImageItem) => {
        setSelectedImage(image);
    };

    const closeLightbox = () => {
        setSelectedImage(null);
    };

    return (
        <div className="container mx-auto py-8">
            <h1 className="text-4xl font-bold text-center mb-8">Gallery</h1>
            <GalleryGrid>
                {images.map((image, index) => (
                    <ImageCard key={index} {...image} onClick={() => openLightbox(image)} />
                ))}
            </GalleryGrid>
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

export default GalleryPage;
