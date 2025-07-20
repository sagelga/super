'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import Section from '../common/Section'; // Import the new Section component

/**
 * Defines the structure for a single experience item.
 * @interface ExperienceItem
 * @property {string} title - The title of the experience (e.g., "Software Engineer").
 * @property {string} company - The company where the experience was gained.
 * @property {string} duration - The duration of the experience (e.g., "Jan 2020 - Dec 2022").
 * @property {string[]} description - A list of descriptive points for the experience.
 */
interface ExperienceItem {
    title: string;
    company: string;
    duration: string;
    description: string[];
}

/**
 * Props for the ExperienceSection component.
 * @interface ExperienceSectionProps
 * @property {ExperienceItem[]} experiences - An array of experience items to display.
 */
interface ExperienceSectionProps {
    experiences: ExperienceItem[];
}

/**
 * ExperienceSection component displays a carousel of professional experiences.
 * It utilizes the reusable `Section` component for consistent layout and `Swiper` for the carousel functionality.
 *
 * @param {ExperienceSectionProps} props - The props for the ExperienceSection component.
 * @returns {React.FC} The ExperienceSection component.
 */
const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
    const t = useTranslations('home');
    return (
        <Section title={t('experience_section_title')}>
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
        </Section>
    );
};

export default ExperienceSection;
