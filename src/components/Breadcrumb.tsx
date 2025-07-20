'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';


const Breadcrumb: React.FC = () => {
  const pathname = usePathname();
  const t = useTranslations('common');
  const pathSegments = pathname.split('/').filter(segment => segment !== '');

  // Define a mapping for display names (e.g., 'home' -> 'Home', 'blog' -> 'Blog')
  const displayNameMap: { [key: string]: string } = {
    'home': t('breadcrumb.home'),
    'blog': t('breadcrumb.blog'),
    'gallery': t('breadcrumb.gallery'),
    'docs': t('breadcrumb.docs'),
    'experience': t('breadcrumb.experience'),
    'certifications': t('breadcrumb.certifications'),
    'volunteering': t('breadcrumb.volunteering'),
    'projects': t('breadcrumb.projects'),
    'privacy-policy': t('breadcrumb.privacy_policy'),
    'terms-of-service': t('breadcrumb.terms_of_service'),
    // Add more mappings as needed
  };

  return (
    <nav className="flex py-3 px-5 text-gray-700 bg-gray-50 dark:bg-gray-800 dark:border-gray-700" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="text-sm text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
            {t('breadcrumb.home')}
          </Link>
        </li>
        {pathSegments.map((segment, index) => {
          const href = '/' + pathSegments.slice(0, index + 1).join('/');
          const isLast = index === pathSegments.length - 1;
          const displayName = displayNameMap[segment] || segment.replace(/-/g, ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

          return (
            <li key={href} aria-current={isLast ? 'page' : undefined}>
              <div className="flex items-center">
                <svg className="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>
                {isLast ? (
                  <span className="ml-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                    {displayName}
                  </span>
                ) : (
                  <Link href={href} className="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">
                    {displayName}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
