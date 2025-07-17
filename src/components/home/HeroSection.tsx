import React from 'react';
import Image from 'next/image';

// HeroSection functional component
const HeroSection: React.FC = () => {
    return (
        <section
            className="relative min-h-screen flex items-center justify-center bg-cover bg-center text-white"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400')" }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text readability */}
            <div className="relative z-10 text-center">
                {/* Profile Image */}
                <Image
                    src="https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=150"
                    alt="Kunanon Srisuntiroj"
                    width={150}
                    height={150}
                    className="rounded-full mx-auto mb-4 border-4 border-white shadow-lg"
                />
                {/* Name */}
                <h1 className="text-5xl md:text-6xl font-extrabold mb-2 drop-shadow-lg">Kunanon Srisuntiroj</h1>
                {/* Title/Profession */}
                <p className="text-2xl md:text-3xl text-gray-200 drop-shadow-md">IT Professional</p>
            </div>
        </section>
    );
};

export default HeroSection;
