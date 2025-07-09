'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


interface CertificationItem {
    title: string;
    date?: string;
    skills: string[];
}

interface CertificationsSectionProps {
    certifications: CertificationItem[];
}

const CertificationsSection: React.FC<CertificationsSectionProps> = ({ certifications }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Licenses & Certifications</h2>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    slidesPerGroup={1}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20, slidesPerGroup: 2 },
                        1024: { slidesPerView: 3, spaceBetween: 30, slidesPerGroup: 3 },
                    }}
                    className="mySwiper"
                >
                    {certifications.map((cert, index) => (
                        <SwiperSlide key={index}>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col justify-between h-[250px] overflow-hidden">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{cert.title}</h3>
                                    {cert.date && <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Issued: {cert.date}</p>}
                                </div>
                                <div className="mt-4">
                                    <strong className="text-gray-700 dark:text-gray-300">Skills: </strong>
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
