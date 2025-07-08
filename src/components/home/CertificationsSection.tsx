'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './CertificationsSection.module.css';

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
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Licenses & Certifications</h2>
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
                            <div className={styles.card}>
                                <div>
                                    <h3 className={styles.cardTitle}>{cert.title}</h3>
                                    {cert.date && <p className={styles.cardDate}>Issued: {cert.date}</p>}
                                </div>
                                <div className={styles.cardSkills}>
                                    <strong className={styles.cardSkillsStrong}>Skills: </strong>
                                    <span className={styles.cardSkillsSpan}>{cert.skills.join(', ')}</span>
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
