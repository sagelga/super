'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Section from '../common/Section'; // Import the new Section component

/**
 * Defines the structure for a single volunteering experience item.
 * @interface VolunteeringItem
 * @property {string} title - The title of the volunteering experience.
 * @property {string} [year] - The year of the volunteering experience (optional).
 * @property {string[]} description - A list of descriptive points for the volunteering experience.
 * @property {{ text: string; href: string }} [link] - An optional link for more details about the volunteering experience.
 */
interface VolunteeringItem {
    title: string;
    year?: string;
    description: string[];
    link?: { text: string; href: string };
}

/**
 * Props for the VolunteeringSection component.
 * @interface VolunteeringSectionProps
 * @property {VolunteeringItem[]} volunteering - An array of volunteering experience items to display.
 */
interface VolunteeringSectionProps {
    volunteering: VolunteeringItem[];
}

/**
 * VolunteeringSection component displays a carousel of volunteering experiences.
 * It utilizes the reusable `Section` component for consistent layout and `Swiper` for the carousel functionality.
 *
 * @param {VolunteeringSectionProps} props - The props for the VolunteeringSection component.
 * @returns {React.FC} The VolunteeringSection component.
 */
const VolunteeringSection: React.FC<VolunteeringSectionProps> = ({ volunteering }) => {
    const t = useTranslations('home');
    return (
        <Section title={t('volunteering_section_title')}>
            {/* Swiper component for displaying volunteering experiences in a carousel */}
            <Swiper
                // Configure Swiper modules
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                navigation // Enable navigation arrows
                pagination={{ clickable: true }} // Enable pagination dots
                className="mySwiper"
            >
                {/* Map through volunteering items and render each as a SwiperSlide */}
                {volunteering.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 h-full flex flex-col">
                            {/* Volunteering Title */}
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                            {/* Volunteering Year */}
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{item.year}</p>
                            {/* Volunteering Description points */}
                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300 flex-grow">
                                {item.description.map((desc, descIndex) => (
                                    <li key={descIndex} className="leading-relaxed">{desc}</li>
                                ))}
                            </ul>
                            {/* Optional link for more details */}
                            {item.link && (
                                <div className="mt-6">
                                    <Link href={item.link.href} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400" target="_blank" rel="noopener noreferrer">
                                        {item.link.text}
                                        <svg className="ml-2 -mr-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6" />
                                        </svg>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
};

export default VolunteeringSection;
