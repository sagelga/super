'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the interface for a single certification item
interface CertificationItem {
    title: string;
    date?: string;
    skills: string[];
}

// Define the props interface for the CertificationsSection component
interface CertificationsSectionProps {
    certifications: CertificationItem[]; // An array of certification items
}

// CertificationsSection functional component
const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
    const { t } = useTranslation('home');
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">{t('certifications_section_title')}</h2>
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
            </div>
        </section>
    );
};

export default CertificationsSection;
