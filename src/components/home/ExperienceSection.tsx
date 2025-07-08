'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import styles from './ExperienceSection.module.css';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ExperienceItem {
    title: string;
    company: string;
    duration: string;
    description: string[];
}

interface ExperienceSectionProps {
    experiences: ExperienceItem[];
}

const ExperienceSection: React.FC<ExperienceSectionProps> = ({ experiences }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Experience</h2>
                <Swiper
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    className="mySwiper"
                >
                    {experiences.map((exp, index) => (
                        <SwiperSlide key={index}>
                            <div className={styles.card}>
                                <h3 className={styles.cardTitle}>{exp.title}</h3>
                                <p className={styles.cardCompany}>{exp.company}</p>
                                <p className={styles.cardDuration}>{exp.duration}</p>
                                <ul className={styles.descriptionList}>
                                    {exp.description.map((desc, descIndex) => (
                                        <li key={descIndex} className={styles.descriptionItem}>{desc}</li>
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
