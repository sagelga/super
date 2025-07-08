'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Grid } from 'swiper/modules';
import { getIconClass } from '@/utils/iconMapping';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';
import styles from './SkillsList.module.css';

interface SkillsListProps {
    skills: string[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Skills</h2>
                <Swiper
                    modules={[Navigation, Pagination, A11y, Grid]}
                    spaceBetween={20}
                    slidesPerView={1}
                    grid={{
                        rows: 2,
                        fill: 'row',
                    }}
                    navigation
                    pagination={{ clickable: true }}
                    watchSlidesProgress={true}
                    observer={true}
                    observeParents={true}
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 2 },
                        768: { slidesPerView: 3, spaceBetween: 30, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 3 },
                        1024: { slidesPerView: 4, spaceBetween: 40, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 4 },
                        1280: { slidesPerView: 5, spaceBetween: 50, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 5 },
                    }}
                    className="mySwiper"
                >
                    {skills.map((skill, index) => {
                        const iconClass = getIconClass(skill);
                        return (
                            <SwiperSlide key={index}>
                                <div className={styles.skillCard}>
                                    {iconClass && (
                                        <i className={`${iconClass} ${styles.skillIcon}`}></i>
                                    )}
                                    <span className={`${styles.skillName} ${skill.length > 25 ? styles.skillNameSmall : styles.skillNameLarge}`}>{skill}</span>
                                </div>
                            </SwiperSlide>
                        );
                    })}
                </Swiper>
            </div>
        </section>
    );
};

export default SkillsList;
