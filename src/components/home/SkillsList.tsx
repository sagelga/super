import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Grid } from 'swiper/modules';
import { getIconClass } from '@/utils/iconMapping';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

interface SkillsListProps {
    skills: string[];
}

const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Skills</h2>
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
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-row items-center space-x-2 w-full h-20">
                                    {iconClass && (
                                        <i className={`${iconClass} text-5xl text-blue-500 dark:text-blue-400`}></i>
                                    )}
                                    <span className={`${skill.length > 25 ? 'text-sm' : 'text-base'}`}>{skill}</span>
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
