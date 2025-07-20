'use client';

import React from 'react';

/**
 * Props for the Section component.
 * @interface SectionProps
 * @property {string} title - The title of the section.
 * @property {React.ReactNode} children - The content to be rendered within the section.
 * @property {string} [id] - Optional ID for the section, useful for navigation.
 * @property {string} [className] - Optional additional CSS classes for the section.
 */
interface SectionProps {
    title: string;
    children: React.ReactNode;
    id?: string;
    className?: string;
}

/**
 * A reusable Section component for consistent layout across different sections of the application.
 * It provides a common structure with a centered title and a content area.
 *
 * @param {SectionProps} props - The props for the Section component.
 * @returns {React.FC} The Section component.
 */
const Section: React.FC<SectionProps> = ({ title, children, id, className }) => {
    return (
        <section id={id} className={`py-16 bg-gray-50 dark:bg-gray-900 ${className || ''}`}>
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">{title}</h2>
                {/* Section Content */}
                {children}
            </div>
        </section>
    );
};

export default Section;
