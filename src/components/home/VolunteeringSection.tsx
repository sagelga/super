'use client';

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import styles from './VolunteeringSection.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface VolunteeringItem {
    title: string;
    year: string;
    description: string[];
    link?: { text: string; href: string };
}

interface VolunteeringSectionProps {
    volunteering: VolunteeringItem[];
}

const VolunteeringSection: React.FC<VolunteeringSectionProps> = ({ volunteering }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Volunteering</h2>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className="mySwiper"
                >
                    {volunteering.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>{item.title}</h3>
                                <p className={styles.cardYear}>{item.year}</p>
                                <ul className={styles.descriptionList}>
                                    {item.description.map((desc, descIndex) => (
                                        <li key={descIndex} className={styles.descriptionItem}>{desc}</li>
                                    ))}
                                </ul>
                                {item.link && (
                                    <div className={styles.linkContainer}>
                                        <Link href={item.link.href} className={styles.linkButton} target="_blank" rel="noopener noreferrer">
                                            {item.link.text}
                                            <svg className={styles.linkIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6" />
                                            </svg>
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default VolunteeringSection;
