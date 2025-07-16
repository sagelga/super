import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Navbar functional component
const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 dark:bg-gray-900 p-4 text-white fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                {/* Logo and Site Title */}
                <Link href="/" className="text-xl font-bold flex items-center">
                    <Image src="/globe.svg" alt="Website Icon" width={24} height={24} className="mr-2" />
                    Kunanon Srisuntiroj
                </Link>
                {/* Navigation Links */}
                <div>
                    <Link href="/" className="mr-4 hover:text-gray-300">
                        Home
                    </Link>
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
        </nav>
    );
};

export default Navbar;
