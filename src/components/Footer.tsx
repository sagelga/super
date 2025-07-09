'use client';

import React from 'react';
import Link from 'next/link';


interface LinkItem {
    name: string;
    href: string;
    iconClass?: string;
    icon?: string;
}

const Footer: React.FC = () => {
    const sitemapLinks: { [key: string]: LinkItem[] } = {
        "Kunanon Srisuntiroj": [
            { name: "Home", href: "/" },
            { name: "About", href: "/#about" },
            { name: "Skills", href: "/#skills" },
            { name: "Experience", href: "/#experience" },
            { name: "Certifications", href: "/#certifications" },
        ],
        "Projects": [
            { name: "Todoist Notion Sync", href: "#" }, // Placeholder for new project
            { name: "Learn with sagelga", href: "https://learn.sagelga.com" },
            { name: "Documentation Website", href: "https://docs.sagelga.com/" },
            { name: "Byteside.one", href: "https://byteside.one/" },
            { name: "The Sunny Side Publication", href: "https://medium.com/the-sunny-side" },
        ],
        "Connect": [
            { name: "LinkedIn", href: "https://www.linkedin.com/in/kunanon/", iconClass: "devicon-linkedin-plain" },
            { name: "GitHub", href: "https://github.com/sagelga", iconClass: "devicon-github-plain" },
            { name: "Salesforce Trailblazer", href: "https://www.salesforce.com/trailblazer/sagelga", iconClass: "devicon-salesforce-plain" },
        ],
    };

    const legalLinks = [
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms-of-service" },

    ];

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <footer className="bg-gray-100 dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100 text-sm">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(sitemapLinks).map(([category, links]) => (
                    <div key={category}>
                        <h3 className="text-lg font-semibold mb-4">{category}</h3>
                        <ul>
                            {links.map((link, index) => (
                                <li key={index} className="mb-2">
                                    <Link href={link.href} className="hover:text-gray-700 dark:hover:text-gray-300" target={link.href.startsWith('/') ? '_self' : '_blank'} rel={link.href.startsWith('/') ? '' : 'noopener noreferrer'}>
                                        {link.iconClass ? (
                                            <i className={`${link.iconClass} colored text-lg mr-2`}></i>
                                        ) : link.icon ? (
                                            <svg className="inline-block w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                                <path d={link.icon} />
                                            </svg>
                                        ) : null}
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs">
                <p className="mb-2">สงวนลิขสิทธิ์ © 2019-{new Date().getFullYear()} สร้างด้วย ❤️ โดย <Link href="https://github.com/sagelga" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">Kunanon Srisuntiroj</Link></p>
                <div className="flex flex-wrap justify-center space-x-2 md:space-x-4">
                    {legalLinks.map((link, index) => (
                        <React.Fragment key={index}>
                            <Link href={link.href} className="text-gray-600 dark:text-gray-400 hover:underline whitespace-nowrap">
                                {link.name}
                            </Link>
                            {index < legalLinks.length - 1 && (
                                <span className="text-gray-600 dark:text-gray-400">|</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <button onClick={scrollToTop} className="mt-4 text-blue-600 dark:text-blue-400 hover:underline">
                    Back to Top
                </button>
            </div>
        </footer>
    );
};

export default Footer;
