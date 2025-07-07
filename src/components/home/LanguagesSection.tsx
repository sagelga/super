'use client';
import React from 'react';

interface LanguageItem {
    name: string;
    proficiency: string;
    iconClass?: string; // Add iconClass for Devicon
}

interface LanguagesSectionProps {
    languages: LanguageItem[];
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Languages</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {languages.map((lang, index) => (
                        <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex items-center space-x-4">
                            {lang.iconClass && (
                                <i className={`${lang.iconClass} text-4xl text-gray-700 dark:text-gray-300`}></i>
                            )}
                            <div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{lang.name}</h3>
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
