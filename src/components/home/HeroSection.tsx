import React from 'react';
import Image from 'next/image';


const HeroSection: React.FC = () => {
    return (
        <section className="text-center py-16">
            <Image
                src="https://images.unsplash.com/photo-1526397751294-331021109fbd?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=2400"
                alt="Kunanon Srisuntiroj"
                width={150}
                height={150}
                className="rounded-full mx-auto mb-4"
            />
            <h1 className="text-4xl font-bold mb-2">Kunanon Srisuntiroj</h1>
            <p className="text-xl text-gray-600">IT Professional</p>
        </section>
    );
};

export default HeroSection;
