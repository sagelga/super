import React from 'react';
import { siteConfig } from '@/config/site';
import { useTranslations } from 'next-intl';

// Define the TermsOfServicePage component
const TermsOfServicePage: React.FC = () => {
  const t = useTranslations('terms-of-service');
  const { name: websiteName, email: contactEmail } = siteConfig();

  // Define the sections of the terms of service for navigation
  const sections = t.raw('sections') as unknown as { id: string; title: string; }[];

  // Render the TermsOfServicePage component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-cream">{t('title')}</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="grow lg:w-3/4">
          {/* Introduction Section */}
          <section id="introduction" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[0].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.0.paragraphs.0', { websiteName })}
            </p>
          </section>

          {/* Acceptance of Terms Section */}
          <section id="acceptance-of-terms" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[1].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.1.paragraphs.0')}
            </p>
          </section>

          {/* Changes to Terms Section */}
          <section id="changes-to-terms" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[2].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.2.paragraphs.0')}
            </p>
          </section>

          {/* User Obligations Section */}
          <section id="user-obligations" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[3].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.3.paragraphs.0')}
            </p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-muted">
              <li>{t('sections.3.list_items.0')}</li>
              <li>{t('sections.3.list_items.1')}</li>
              <li>{t('sections.3.list_items.2')}</li>
              <li>{t('sections.3.list_items.3')}</li>
              <li>{t('sections.3.list_items.4')}</li>
              <li>{t('sections.3.list_items.5')}</li>
              <li>{t('sections.3.list_items.6')}</li>
            </ul>
          </section>

          {/* Intellectual Property Section */}
          <section id="intellectual-property" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[4].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.4.paragraphs.0')}
            </p>
          </section>

          {/* Disclaimer of Warranties Section */}
          <section id="disclaimer-of-warranties" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[5].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.5.paragraphs.0')}
            </p>
          </section>

          {/* Limitation of Liability Section */}
          <section id="limitation-of-liability" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[6].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.6.paragraphs.0')}
            </p>
          </section>

          {/* Indemnification Section */}
          <section id="indemnification" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[7].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.7.paragraphs.0')}
            </p>
          </section>

          {/* Governing Law Section */}
          <section id="governing-law" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[8].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.8.paragraphs.0')}
            </p>
          </section>

          {/* Contact Us Section */}
          <section id="contact-us" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-cream">{sections[9].title}</h2>
            <p className="mb-4 leading-relaxed text-muted">
              {t('sections.9.paragraphs.0')}
            </p>
            <p className="text-accent font-semibold text-lg">
              {contactEmail}
            </p>
          </section>

          {/* Last Updated Section */}
          <section className="text-center mt-12">
            <p className="text-sm text-muted">{t('last_updated', { date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) })}</p>
          </section>
        </div>

        {/* Table of Contents Area */}
        <nav className="lg:w-1/4 lg:sticky lg:top-20 h-fit p-6 bg-surface rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-cream">{t('table_of_contents_title')}</h2>
          <ul className="list-none p-0 space-y-2">
            {/* Map through the sections array to create the table of contents */}
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className="text-accent hover:underline text-lg"
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

// Export the TermsOfServicePage component
export default TermsOfServicePage;
