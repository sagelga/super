
// Import necessary React components and site configuration
import React from 'react';
import { siteConfig } from '@/config/site';

// Define the TermsOfServicePage component
const TermsOfServicePage: React.FC = () => {
  // Get website name and contact email from site configuration
  const websiteName = siteConfig.name;
  const contactEmail = siteConfig.email;

  // Define the sections of the terms of service for navigation
  const sections = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'acceptance-of-terms', title: '2. Acceptance of Terms' },
    { id: 'changes-to-terms', title: '3. Changes to Terms' },
    { id: 'user-obligations', title: '4. User Obligations' },
    { id: 'intellectual-property', title: '5. Intellectual Property Rights' },
    { id: 'disclaimer-of-warranties', title: '6. Disclaimer of Warranties' },
    { id: 'limitation-of-liability', title: '7. Limitation of Liability' },
    { id: 'indemnification', title: '8. Indemnification' },
    { id: 'governing-law', title: '9. Governing Law' },
    { id: 'contact-us', title: '10. Contact Us' },
  ];

  // Render the TermsOfServicePage component
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 dark:text-gray-100">Terms of Service</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="grow lg:w-3/4">
          {/* Introduction Section */}
          <section id="introduction" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[0].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              Welcome to {websiteName} (the &quot;Website&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Website and its content, features, and services (collectively, the &quot;Service&quot;). By accessing or using the Service, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, please do not use the Service.
            </p>
          </section>

          {/* Acceptance of Terms Section */}
          <section id="acceptance-of-terms" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[1].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              By using our Service, you confirm that you are at least 18 years of age or have reached the age of majority in your jurisdiction, and that you are legally capable of entering into a binding agreement. If you are using the Service on behalf of an entity, you represent that you have the authority to bind that entity to these Terms.
            </p>
          </section>

          {/* Changes to Terms Section */}
          <section id="changes-to-terms" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[2].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              We reserve the right to modify or update these Terms at any time, at our sole discretion. We will notify you of any changes by posting the new Terms on this page and updating the &quot;Last updated&quot; date. Your continued use of the Service after any such changes constitutes your acceptance of the new Terms. It is your responsibility to review these Terms periodically for changes.
            </p>
          </section>

          {/* User Obligations Section */}
          <section id="user-obligations" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[3].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              As a user of the Service, you agree not to:
            </p>
            <ul className="list-disc list-inside ml-6 space-y-2 text-gray-700 dark:text-gray-300">
              <li>Use the Service for any unlawful purpose or in any way that violates these Terms.</li>
              <li>Infringe upon our intellectual property rights or the intellectual property rights of others.</li>
              <li>Upload or transmit viruses or any other type of malicious code.</li>
              <li>Harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate based on gender, sexual orientation, religion, ethnicity, race, age, national origin, or disability.</li>
              <li>Collect or track the personal information of others.</li>
              <li>Spam, phish, pharm, pretext, spider, crawl, or scrape.</li>
              <li>Interfere with or circumvent the security features of the Service.</li>
            </ul>
          </section>

          {/* Intellectual Property Section */}
          <section id="intellectual-property" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[4].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              All content on the Website, including text, graphics, logos, images, and software, is our property or the property of our licensors and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our Service, except as generally permitted by the Service.
            </p>
          </section>

          {/* Disclaimer of Warranties Section */}
          <section id="disclaimer-of-warranties" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[5].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE. WE DISCLAIM ALL WARRANTIES, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTIES OF MERCHANTABILITY, NON-INFRINGEMENT, AND FITNESS FOR PARTICULAR PURPOSE.
            </p>
          </section>

          {/* Limitation of Liability Section */}
          <section id="limitation-of-liability" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[6].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              IN NO EVENT WILL WE BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
            </p>
          </section>

          {/* Indemnification Section */}
          <section id="indemnification" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[7].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              You agree to defend, indemnify, and hold harmless [Your Website Name] and its affiliates, licensors, and service providers, and its and their respective officers, directors, employees, contractors, agents, licensors, suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms or your use of the Service.
            </p>
          </section>

          {/* Governing Law Section */}
          <section id="governing-law" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[8].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              These Terms shall be governed and construed in accordance with the laws of [Your Country/State], without regard to its conflict of law provisions.
            </p>
          </section>

          {/* Contact Us Section */}
          <section id="contact-us" className="mb-10">
            <h2 className="text-3xl font-bold mb-5 text-gray-800 dark:text-gray-200">{sections[9].title}</h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="text-blue-600 dark:text-blue-400 font-semibold text-lg">
              {contactEmail}
            </p>
          </section>

          {/* Last Updated Section */}
          <section className="text-center mt-12">
            <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </section>
        </div>

        {/* Table of Contents Area */}
        <nav className="lg:w-1/4 lg:sticky lg:top-20 h-fit p-6 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Table of Contents</h2>
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

// Export the TermsOfServicePage component
export default TermsOfServicePage;
