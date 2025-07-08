import React from 'react';
import Image from 'next/image';
import styles from './Lightbox.module.css';

interface LightboxProps {
    src: string;
    alt: string;
    onClose: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ src, alt, onClose }) => {
    return (
        <div
            className={styles.lightboxOverlay}
            onClick={onClose}
        >
            <div className={styles.lightboxContent}>
                <Image src={src} alt={alt} layout="intrinsic" width={1200} height={800} objectFit="contain" />
                <button
                    className={styles.closeButton}
                    onClick={onClose}
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default Lightbox;
