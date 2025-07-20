'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';



// Navbar functional component
const Navbar: React.FC = () => {
    const t = useTranslations('common');
    const lang = useLocale();
    const [isHomeHovered, setIsHomeHovered] = useState(false);

    return (
        <nav className="bg-gray-800 dark:bg-gray-900 p-4 text-white fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Site Title */}
                <Link href={`/${lang}`} className="text-xl font-bold flex items-center">
                    <Image src="/globe.svg" alt="Website Icon" width={24} height={24} className="mr-2" />
                    {t('navbar.name')}
                </Link>
                {/* Navigation Links */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHomeHovered(true)}
                    onMouseLeave={() => setIsHomeHovered(false)}
                >
                    <Link href={`/${lang}`} className="mr-4 hover:text-gray-300">
                        {t('navbar.home')}
                    </Link>
                </div>
                <div>
                    <Link href={`/${lang}/blog`} className="mr-4 hover:text-gray-300">
                        {t('navbar.blog')}
                    </Link>
                    <Link href={`/${lang}/gallery`} className="mr-4 hover:text-gray-300">
                        {t('navbar.gallery')}
                    </Link>
                    <Link href={`/${lang}/learn`} className="mr-4 hover:text-gray-300">
                        {t('navbar.learn')}
                    </Link>
                    <Link href={`/${lang}/docs`} className="mr-4 hover:text-gray-300">
                        {t('navbar.docs')}
                    </Link>
                </div>
            </div>
            {isHomeHovered && (
                <div className="absolute top-full left-0 w-full bg-gray-700 dark:bg-gray-800 shadow-lg py-1 z-40"> {/* z-40 to be below main nav's z-50 */}
                    <div className="container mx-auto flex justify-center space-x-8">
                        <Link href={`/${lang}/home/experience`} className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            {t('navbar.experience')}
                        </Link>
                        <Link href={`/${lang}/home/certifications`} className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            {t('navbar.certifications')}
                        </Link>
                        <Link href={`/${lang}/home/projects`} className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            {t('navbar.projects')}
                        </Link>
                        <Link href={`/${lang}/home/volunteering`} className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            {t('navbar.volunteering')}
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
