import React, { useState } from 'react';
import Image from 'next/image';
import styles from './ImageCard.module.css';

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
        <div className={styles.card} onClick={onClick}>
            {isLoading && (
                <div className={styles.loadingOverlay}></div>
            )}
            <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={`${styles.image} ${isLoading ? styles.imageLoading : styles.imageLoaded}`}
                onLoad={() => setIsLoading(false)}
            />
            <div className={styles.overlay}>
                <p className={styles.overlayText}>{alt}</p>
            </div>
        </div>
    );
};

export default ImageCard;
