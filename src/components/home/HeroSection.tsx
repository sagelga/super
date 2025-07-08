import React from 'react';
import Image from 'next/image';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
    return (
        <section className={styles.heroSection}>
            <Image
                src="https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400"
                alt="Kunanon Srisuntiroj"
                width={150}
                height={150}
                className={styles.profileImage}
            />
            <h1 className={styles.title}>Kunanon Srisuntiroj</h1>
            <p className={styles.subtitle}>IT Professional</p>
        </section>
    );
};

export default HeroSection;
