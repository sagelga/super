import React from 'react';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';

// Define the PrivacyPolicyPage component
const PrivacyPolicyPage: React.FC = () => {
  const t = useTranslations('privacy-policy');
  const { name: websiteName, email: contactEmail } = siteConfig();

  // Define the sections of the privacy policy for navigation
  const sections = t.raw('sections') as unknown as { id: string; title: string; }[];

  // Render the PrivacyPolicyPage component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-gray-100">{t('title')}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="grow lg:w-3/4">
          {/* Introduction Section */}
          <section id="introduction" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[0].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.0.paragraphs.0', { websiteName })}
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.0.paragraphs.1')}
            </p>
          </section>

          {/* Data We Collect Section */}
          <section id="data-we-collect" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[1].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.1.paragraphs.0')}
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('sections.1.subsections.0.title')}</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.1.subsections.0.paragraph')}
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('sections.1.subsections.1.title')}</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.1.subsections.1.paragraph')}
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.1.subsections.1.additional_paragraph')}
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('sections.1.subsections.2.title')}</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.1.subsections.2.paragraph')}
            </p>
          </section>

          {/* How We Use Your Information Section */}
          <section id="how-we-use-your-information" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[2].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.2.paragraphs.0')}
            </p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('sections.2.list_items.0')}</li>
              <li>{t('sections.2.list_items.1')}</li>
              <li>{t('sections.2.list_items.2')}</li>
              <li>{t('sections.2.list_items.3')}</li>
            </ul>
          </section>

          {/* Disclosure of Your Information Section */}
          <section id="disclosure-of-your-information" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[3].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.3.paragraphs.0')}
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.3.paragraphs.1')}
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('sections.3.subsections.0.title')}</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.3.subsections.0.paragraph')}
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">{t('sections.3.subsections.1.title')}</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.3.subsections.1.paragraph')}
            </p>
          </section>

          {/* Security of Your Information Section */}
          <section id="security-of-your-information" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[4].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.4.paragraphs.0')}
            </p>
          </section>

          {/* Your Rights Section */}
          <section id="your-rights" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[5].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.5.paragraphs.0')}
            </p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>{t('sections.5.list_items.0')}</li>
              <li>{t('sections.5.list_items.1')}</li>
              <li>{t('sections.5.list_items.2')}</li>
              <li>{t('sections.5.list_items.3')}</li>
              <li>{t('sections.5.list_items.4')}</li>
              <li>{t('sections.5.list_items.5')}</li>
              <li>{t('sections.5.list_items.6')}</li>
            </ul>
            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.5.additional_paragraph')}
            </p>
          </section>

          {/* Contact Us Section */}
          <section id="contact-us" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[6].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {t('sections.6.paragraphs.0')}
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              {contactEmail}
            </p>
          </section>

          {/* Last Updated Section */}
          <section className="text-center mt-12">
            <p className="text-sm text-gray-500">{t('last_updated', { date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) })}</p>
          </section>
        </div>

        {/* Table of Contents Area */}
        <nav className="lg:w-1/4 lg:sticky lg:top-20 h-fit p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">{t('table_of_contents_title')}</h2>
          <ul className="list-none p-0 space-y-2">
            {/* Map through the sections array to create the table of contents */}
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-lg"
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

// Export the PrivacyPolicyPage component
export default PrivacyPolicyPage;
