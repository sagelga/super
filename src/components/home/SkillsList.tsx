import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, Grid } from 'swiper/modules';
import { getIconClass } from '@/utils/iconMapping';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/grid';

// Define the props interface for the SkillsList component
interface SkillsListProps {
    skills: string[]; // An array of skill strings
}

// SkillsList functional component
const SkillsList: React.FC<SkillsListProps> = ({ skills }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Skills</h2>
                {/* Swiper component for displaying skills in a grid carousel */}
                <Swiper
                    // Configure Swiper modules
                    modules={[Navigation, Pagination, A11y, Grid]}
                    spaceBetween={20}
                    slidesPerView={1}
                    grid={{
                        rows: 2,
                        fill: 'row',
                    }}
                    navigation // Enable navigation arrows
                    pagination={{ clickable: true }} // Enable pagination dots
                    watchSlidesProgress={true}
                    observer={true}
                    observeParents={true}
                    // Responsive breakpoints for different screen sizes
                    breakpoints={{
                        640: { slidesPerView: 2, spaceBetween: 20, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 2 },
                        768: { slidesPerView: 3, spaceBetween: 30, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 3 },
                        1024: { slidesPerView: 4, spaceBetween: 40, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 4 },
                        1280: { slidesPerView: 5, spaceBetween: 50, grid: { rows: 2, fill: 'row' }, slidesPerGroup: 5 },
                    }}
                    className="mySwiper pb-12"
                >
                    {/* Map through skills and render each as a SwiperSlide */}
                    {skills.map((skill, index) => {
                        const iconClass = getIconClass(skill);
                        return (
                            <SwiperSlide key={index}>
                                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-row items-center space-x-2 w-full h-16">
                                    {/* Conditionally render skill icon */}
                                    {iconClass && (
                                        <i className={`${iconClass} text-4xl text-gray-900 dark:text-white`}></i>
                                    )}
                                    {/* Display skill name, adjusting font size for longer names */}
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
