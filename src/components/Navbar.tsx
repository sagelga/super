import React from 'react';
import Link from 'next/link';

const Navbar: React.FC = () => {
    return (
        <nav className="bg-gray-800 p-4 text-white">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    My Portfolio
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
