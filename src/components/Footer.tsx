'use client';

import React from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import Breadcrumb from './Breadcrumb';

// Define the interface for a link item, including optional icon properties
interface LinkItem {
    name: string;
    href: string;
    iconClass?: string; // Class for icon libraries (e.g., Devicon)
    icon?: string; // SVG path for custom icons
}


// Footer functional component
const Footer: React.FC = () => {
    const t = useTranslations('common'); // Keep t for translations
    const router = useRouter();
    const pathname = usePathname();
    const lang = useLocale();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLang = event.target.value;
        const segments = pathname.split('/');
        segments[1] = newLang; // Replace current locale segment with new one
        const newPath = segments.join('/');
        router.push(newPath);
    };
    // Define sitemap links categorized for display in the footer
    const sitemapLinks: { [key: string]: LinkItem[] } = {
        [t('footer.sitemap.kunanon_srisuntiroj')]: [
            { name: t('footer.sitemap.home'), href: `/${lang}` },
            { name: t('footer.sitemap.about'), href: `/${lang}/#about` },
            { name: t('footer.sitemap.skills'), href: `/${lang}/#skills` },
            { name: t('footer.sitemap.experience'), href: `/${lang}/#experience` },
            { name: t('footer.sitemap.certifications'), href: `/${lang}/#certifications` },
        ],
        [t('footer.sitemap.projects')]: [
            { name: t('footer.sitemap.todoist_notion_sync'), href: "#" }, // Placeholder for new project
            { name: t('footer.sitemap.learn_with_sagelga'), href: "https://learn.sagelga.com" },
            { name: t('footer.sitemap.documentation_website'), href: "https://docs.sagelga.com/" },
            { name: t('footer.sitemap.byteside_one'), href: "https://byteside.one/" },
            { name: t('footer.sitemap.the_sunny_side_publication'), href: "https://medium.com/the-sunny-side" },
        ],
        [t('footer.sitemap.connect')]: [
            { name: t('footer.sitemap.linkedin'), href: "https://www.linkedin.com/in/kunanon/", iconClass: "devicon-linkedin-plain" },
            { name: t('footer.sitemap.github'), href: "https://github.com/sagelga", iconClass: "devicon-github-plain" },
            { name: t('footer.sitemap.salesforce_trailblazer'), href: "https://www.salesforce.com/trailblazer/sagelga", iconClass: "devicon-salesforce-plain" },
        ],
    };

    // Define legal links for the footer
    const legalLinks = [
        { name: t('footer.legal.privacy_policy'), href: `/${lang}/privacy-policy` },
        { name: t('footer.legal.terms_of_service'), href: `/${lang}/terms-of-service` },

    ];

    // Function to scroll to the top of the page
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Breadcrumb />
            <footer className="bg-gray-100 dark:bg-gray-900 p-8 text-gray-900 dark:text-gray-100 text-sm">
                <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Render sitemap link categories and their links */}
                    {Object.entries(sitemapLinks).map(([category, links]) => (
                        <div key={category}>
                            <h3 className="text-lg font-semibold mb-4">{category}</h3>
                            <ul>
                                {links.map((link, index) => (
                                    <li key={index} className="mb-2">
                                        <Link href={link.href} className="hover:text-gray-700 dark:hover:text-gray-300" target={link.href.startsWith('/') ? '_self' : '_blank'} rel={link.href.startsWith('/') ? '' : 'noopener noreferrer'}>
                                            {/* Conditionally render icon based on iconClass or icon prop */}
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
                {/* Copyright and legal links section */}
                <div className="text-center mt-8 pt-4 border-t border-gray-200 dark:border-gray-700 text-xs flex flex-col md:flex-row justify-between items-center">
                    <p className="mb-2 md:mb-0">{t('footer.copyright', { year: new Date().getFullYear(), author: 'Kunanon Srisuntiroj' })} <Link href="https://github.com/sagelga" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline"></Link></p>
                    <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-2 md:mb-0">
                        {/* Render legal links with separators */}
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
                    <div className="flex items-center space-x-4">
                        {/* Language Switcher */}
                        <select
                            value={lang}
                            onChange={handleLanguageChange}
                            className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded-md px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="en">{t('footer.english')}</option>
                            <option value="th">{t('footer.thai')}</option>
                            <option value="zh">{t('footer.chinese')}</option>
                            <option value="ja">{t('footer.japanese')}</option>
                        </select>
                        {/* Back to Top button */}
                        <button onClick={scrollToTop} className="text-blue-600 dark:text-blue-400 hover:underline">
                            {t('footer.back_to_top')}
                        </button>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;
