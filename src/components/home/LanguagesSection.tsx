import React from 'react';
import { useTranslation } from 'react-i18next';

// Define the interface for a single language item
interface LanguageItem {
    name: string;
    proficiency: string;
    iconClass?: string; // Add iconClass for Devicon
}

// Define the props interface for the LanguagesSection component
interface LanguagesSectionProps {
    languages: LanguageItem[]; // An array of language items
}

// LanguagesSection functional component
const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => {
    const { t } = useTranslation('home');
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">{t('languages_section_title')}</h2>
                {/* Grid for displaying language cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Map through languages and render each as a card */}
                    {languages.map((lang, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex items-center space-x-4">
                            {/* Conditionally render language icon */}
                            {lang.iconClass && (
                                <i className={`${lang.iconClass} text-5xl text-blue-500 dark:text-blue-400`}></i>
                            )}
                            <div>
                                {/* Language Name */}
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{lang.name}</h3>
                                {/* Language Proficiency */}
                                <p className="text-gray-600 dark:text-gray-400 text-sm">{lang.proficiency}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LanguagesSection;
