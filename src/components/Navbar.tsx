'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Navbar functional component
const Navbar: React.FC = () => {
    const [isHomeHovered, setIsHomeHovered] = useState(false);
    return (
        <nav className="bg-gray-800 dark:bg-gray-900 p-4 text-white fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Site Title */}
                <Link href="/" className="text-xl font-bold flex items-center">
                    <Image src="/globe.svg" alt="Website Icon" width={24} height={24} className="mr-2" />
                    Kunanon Srisuntiroj
                </Link>
                {/* Navigation Links */}
                <div
                    className="relative"
                    onMouseEnter={() => setIsHomeHovered(true)}
                    onMouseLeave={() => setIsHomeHovered(false)}
                >
                    <Link href="/" className="mr-4 hover:text-gray-300">
                        Home
                    </Link>
                </div>
                <div>
                    <Link href="/blog" className="mr-4 hover:text-gray-300">
                        Blog
                    </Link>
                    <Link href="/gallery" className="mr-4 hover:text-gray-300">
                        Gallery
                    </Link>
                    <Link href="/docs" className="mr-4 hover:text-gray-300">
                        Docs
                    </Link>
                </div>
            </div>
            {isHomeHovered && (
                <div className="absolute top-full left-0 w-full bg-gray-700 dark:bg-gray-800 shadow-lg py-1 z-40"> {/* z-40 to be below main nav's z-50 */}
                    <div className="container mx-auto flex justify-center space-x-8">
                        <Link href="/home/experience" className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            Experience
                        </Link>
                        <Link href="/home/certifications" className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            Certifications
                        </Link>
                        <Link href="/home/projects" className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            Projects
                        </Link>
                        <Link href="/home/volunteering" className="px-4 py-2 text-sm text-white hover:bg-gray-600 dark:hover:bg-gray-700">
                            Volunteering
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
