'use client';

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

interface LinkItem {
    name: string;
    href: string;
    iconClass?: string;
    icon?: string;
}

const Footer: React.FC = () => {
    const sitemapLinks: { [key: string]: LinkItem[] } = {
        "Quick Links": [
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
        <footer className={styles.footer}>
            <div className={styles.container}>
                {Object.entries(sitemapLinks).map(([category, links]) => (
                    <div key={category}>
                        <h3 className={styles.categoryTitle}>{category}</h3>
                        <ul>
                            {links.map((link, index) => (
                                <li key={index} className={styles.linkItem}>
                                    <Link href={link.href} className={styles.link} target={link.href.startsWith('/') ? '_self' : '_blank'} rel={link.href.startsWith('/') ? '' : 'noopener noreferrer'}>
                                        {link.iconClass ? (
                                            <i className={`${link.iconClass} colored text-lg mr-2`}></i>
                                        ) : link.icon ? (
                                            <svg className={styles.icon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
            <div className={styles.bottomSection}>
                <p className={styles.copyrightText}>สงวนลิขสิทธิ์ © 2019-{new Date().getFullYear()} สร้างด้วย ❤️ โดย <Link href="https://github.com/sagelga" target="_blank" rel="noopener noreferrer" className={styles.copyrightLink}>Kunanon Srisuntiroj</Link></p>
                <div className={styles.legalLinksContainer}>
                    {legalLinks.map((link, index) => (
                        <React.Fragment key={index}>
                            <Link href={link.href} className={styles.legalLink}>
                                {link.name}
                            </Link>
                            {index < legalLinks.length - 1 && (
                                <span className={styles.legalLinkSeparator}>|</span>
                            )}
                        </React.Fragment>
                    ))}
                </div>
                <button onClick={scrollToTop} className={styles.backToTopButton}>
                    Back to Top
                </button>
            </div>
        </footer>
    );
};

export default Footer;
