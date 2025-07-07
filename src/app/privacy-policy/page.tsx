import React from 'react';
import { siteConfig } from '@/config/site';

const PrivacyPolicyPage: React.FC = () => {
  const websiteName = siteConfig.name;
  const contactEmail = siteConfig.email;
  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'data-we-collect', title: '2. Data We Collect' },
    { id: 'how-we-use-your-information', title: '3. How We Use Your Information' },
    { id: 'disclosure-of-your-information', title: '4. Disclosure of Your Information' },
    { id: 'security-of-your-information', title: '5. Security of Your Information' },
    { id: 'your-rights', title: '6. Your Rights (e.g., GDPR, CCPA)' },
    { id: 'contact-us', title: '7. Contact Us' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-gray-100">Privacy Policy</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-grow lg:w-3/4">
          <section id="introduction" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[0].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Welcome to {websiteName} (the &quot;Website&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site"). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the Site.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates. You will be deemed to have been made aware of, will be subject to, and will be deemed to have accepted the changes in any revised Privacy Policy by your continued use of the Site after the date such revised Privacy Policy is posted.
            </p>
          </section>

          <section id="data-we-collect" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[1].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We may collect information about you in a variety of ways. The information we may collect on the Site includes:
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Analytics Data (Cloudflare Metrics)</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We use Cloudflare Web Analytics to collect anonymous usage data about your visit to our website. This helps us understand how visitors interact with our site, which pages are popular, and how we can improve the user experience. Cloudflare Web Analytics does not use cookies or track individual users. It collects data such as the pages you visit, the time spent on those pages, and the general geographic location of your IP address (without storing the full IP address).
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Cookies and Tracking Technologies</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We use essential cookies to ensure the proper functioning of our website. These cookies are strictly necessary for the website to operate and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in, or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We do not currently use non-essential cookies for advertising or extensive tracking purposes. If this changes in the future, we will update this policy and provide appropriate consent mechanisms.
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Personal Data (if applicable)</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              As a portfolio, blog, and art gallery website, we generally do not collect personal data unless you voluntarily provide it to us, for example, by contacting us via an email form or subscribing to a newsletter (if available). If you choose to provide personal data, it may include your name, email address, and any other information you choose to provide. We will only use this data for the purpose for which it was provided.
            </p>
          </section>

          <section id="how-we-use-your-information" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[2].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Having accurate information about you permits us to provide you with a smooth, efficient, and customized experience. Specifically, we may use information collected about you via the Site to:
            </p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Monitor and analyze usage and trends to improve your experience with the Site.</li>
              <li>Improve the efficiency and operation of the Site.</li>
              <li>Respond to your inquiries or requests if you contact us.</li>
              <li>Perform other business activities as needed.</li>
            </ul>
          </section>

          <section id="disclosure-of-your-information" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[3].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We do not sell, trade, rent, or otherwise share your personal information with third parties without your consent, except as described in this Privacy Policy.
            </p>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We may disclose information we have collected about you in certain situations:
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">By Law or to Protect Rights</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
            </p>
            <h3 className="text-2xl font-semibold mb-3 text-gray-800 dark:text-gray-200">Third-Party Service Providers</h3>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We may share your information with third parties that perform services for us or on our behalf, including data analysis, email delivery, hosting services, and marketing assistance. For example, Cloudflare processes analytics data on our behalf as described above.
            </p>
          </section>

          <section id="security-of-your-information" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[4].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
          </section>

          <section id="your-rights" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[5].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Depending on your location, you may have certain rights regarding your personal data, including:
            </p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>The right to access your personal data.</li>
              <li>The right to request correction of inaccurate personal data.</li>
              <li>The right to request erasure of your personal data.</li>
              <li>The right to object to the processing of your personal data.</li>
              <li>The right to request restriction of processing your personal data.</li>
              <li>The right to data portability.</li>
              <li>The right to withdraw consent (where applicable).</li>
            </ul>
            <p className="mt-4 leading-relaxed text-gray-700 dark:text-gray-300">
              To exercise any of these rights, please contact us using the contact information provided below.
            </p>
          </section>

          <section id="contact-us" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[6].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              If you have questions or comments about this Privacy Policy, please contact us at:
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              {contactEmail}
            </p>
          </section>

          <section className="text-center mt-12">
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </section>
        </div>

        {/* Table of Contents Area */}
        <nav className="lg:w-1/4 lg:sticky lg:top-20 h-fit p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Table of Contents</h2>
          <ul className="list-none p-0 space-y-2">
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

export default PrivacyPolicyPage;
