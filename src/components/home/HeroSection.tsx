import React from 'react';
import Image from 'next/image';

const HeroSection: React.FC = () => {
    return (
        <section className="text-center py-16">
            <Image
                src="/your-photo.jpg" // Placeholder for your photo
                alt="Your Photo"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold mb-2">Your Name</h1>
            <p className="text-xl text-gray-600">Your Professional Title</p>
        </section>
    );
};

export default HeroSection;
