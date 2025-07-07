import React from 'react';
import Link from 'next/link';
import { getIconClass } from '@/utils/iconMapping';

interface ProfileLink {
    name: string;
    url: string;
    iconClass?: string; // Added for Devicon or other icon libraries
}

interface OnlineProfilesSectionProps {
    profiles: ProfileLink[];
}

const OnlineProfilesSection: React.FC<OnlineProfilesSectionProps> = ({ profiles }) => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">Online Profiles</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {profiles.map((profile, index) => {
                        const iconClass = getIconClass(profile.name);
                        return (
                            <Link key={index} href={profile.url} target="_blank" rel="noopener noreferrer" className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out transform hover:-translate-y-1 flex flex-col items-center text-center group">
                                {iconClass && (
                                    <i className={`${iconClass} colored text-5xl mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300`}></i>
                                )}
                                <span className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                    {profile.name}
                                </span>
                                <svg className="mt-2 w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6" />
                                </svg>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OnlineProfilesSection;
