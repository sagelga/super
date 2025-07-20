'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import ProjectCard from '../cards/ProjectCard';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper modules
import { Navigation, Pagination, A11y } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Define the interface for a single project item
interface Project {
    title: string;
    description: string;
    stack?: string[]; // Added optional stack
    githubLink?: string; // Made optional
    demoLink?: string;
    imageUrl?: string; // Added optional imageUrl
}

// Define the props interface for the ProjectShowcase component
interface ProjectShowcaseProps {
    projects: Project[]; // An array of project items
}

// ProjectShowcase functional component
const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
    const t = useTranslations('home');
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">{t('projects_section_title')}</h2>
                {/* Swiper component for displaying projects in a carousel */}
                <Swiper
                    // Configure Swiper modules
                    modules={[Navigation, Pagination, A11y]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation // Enable navigation arrows
                    pagination={{ clickable: true }} // Enable pagination dots
                    // Responsive breakpoints for different screen sizes
                    breakpoints={{
                        640: { slidesPerView: 1, spaceBetween: 20 },
                        768: { slidesPerView: 2, spaceBetween: 30 },
                        1024: { slidesPerView: 3, spaceBetween: 40 },
                    }}
                    className="mySwiper"
                >
                    {/* Map through projects and render each as a SwiperSlide containing a ProjectCard */}
                    {projects.map((project, index) => (
                        <SwiperSlide key={index}>
                            <ProjectCard {...project} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default ProjectShowcase;
