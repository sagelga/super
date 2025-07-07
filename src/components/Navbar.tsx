import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 dark:bg-gray-900 p-4 text-white fixed w-full top-0 z-50 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    Kunanon Srisuntiroj
                </Link>
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
                    <Link href="/docs" className="hover:text-gray-300">
                        Docs
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
