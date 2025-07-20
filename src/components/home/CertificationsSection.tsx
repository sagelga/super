'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

import Section from '../common/Section'; // Import the new Section component

/**
 * Defines the structure for a single certification item.
 * @interface CertificationItem
 * @property {string} title - The title of the certification.
 * @property {string} [issuer] - The issuer of the certification (optional).
 * @property {string} [date] - The date the certification was issued (optional).
 * @property {string} [url] - The URL to the certification (optional).
 * @property {string[]} skills - An array of skills associated with the certification.
 */
interface CertificationItem {
    title: string;
    issuer?: string;
    date?: string;
    url?: string;
    skills: string[];
}

/**
 * Props for the CertificationsSection component.
 * @interface CertificationsSectionProps
 * @property {CertificationItem[]} certifications - An array of certification items to display.
 */
interface CertificationsSectionProps {
    certifications: CertificationItem[];
}

/**
 * CertificationsSection component displays a carousel of certifications.
 * It utilizes the reusable `Section` component for consistent layout and `Swiper` for the carousel functionality.
 *
 * @param {CertificationsSectionProps} props - The props for the CertificationsSection component.
 * @returns {React.FC} The CertificationsSection component.
 */
const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
    const t = useTranslations('home');
    return (
        <Section title={t('certifications_section_title')}>
            {/* Swiper component for displaying certifications in a carousel */}
            <Swiper
                // Configure Swiper modules
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={30}
                slidesPerView={1}
                navigation // Enable navigation arrows
                pagination={{ clickable: true }} // Enable pagination dots
                slidesPerGroup={1}
                // Responsive breakpoints for different screen sizes
                breakpoints={{
                    640: { slidesPerView: 2, spaceBetween: 20, slidesPerGroup: 2 },
                    1024: { slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3 },
                }}
                className="mySwiper"
            >
                {/* Map through certifications and render each as a SwiperSlide */}
                {certifications.map((cert, index) => (
                    <SwiperSlide key={index}>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 h-[250px] overflow-hidden">
                            <div>
                                {/* Certification Title */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                                {/* Certification Date (conditionally rendered) */}
                                {cert.date && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{t('issued_label')} {cert.date}</p>}
                            </div>
                            <div className="mt-4">
                                {/* Certification Skills */}
                                <strong className="text-gray-700 dark:text-gray-300">{t('skills_label')} </strong>
                                <span className="text-gray-600 dark:text-gray-400 text-sm">{cert.skills.join(', ')}</span>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </Section>
    );
};

export default CertificationsSection;
