import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gray-800 p-4 text-white text-center">
            <div className="container mx-auto">
                <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
                <div className="mt-2">
                    <Link href="#" className="mx-2 hover:text-gray-300">
                        Facebook
                    </Link>
                    <Link href="#" className="mx-2 hover:text-gray-300">
                        Twitter
                    </Link>
                    <Link href="#" className="mx-2 hover:text-gray-300">
                        LinkedIn
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
