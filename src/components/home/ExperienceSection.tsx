'use client';

import React from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the interface for a single experience item
interface ExperienceItem {
    title: string;
    company: string;
    duration: string;
    description: string[];
}

// Define the props interface for the ExperienceSection component
interface ExperienceSectionProps {
    experiences: ExperienceItem[]; // An array of experience items
}

// ExperienceSection functional component
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Experience</h2>
                {/* Swiper component for displaying experiences in a carousel */}
                <Swiper
                    // Configure Swiper modules
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation // Enable navigation arrows
                    pagination={{ clickable: true }} // Enable pagination dots
                    className="mySwiper"
                >
                    {/* Map through experiences and render each as a SwiperSlide */}
                    {experiences.map((exp, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col">
                                {/* Experience Title */}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{exp.title}</h3>
                                {/* Company Name */}
                                <p className="text-lg text-gray-700 dark:text-gray-300 mb-1">{exp.company}</p>
                                {/* Duration of the experience */}
                                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{exp.duration}</p>
                                {/* Description points of the experience */}
                                <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 flex-grow">
                                    {exp.description.map((desc, descIndex) => (
                                        <li key={descIndex} className="leading-relaxed">{desc}</li>
                                    ))}
                                </ul>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ExperienceSection;
