import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

interface Skill {
    title: string;
    description: string;
    benefits: string[];
    audience: string;
    icon: string;
}

const LearnPage: React.FC = () => {
    const t = useTranslations('learn.discovery_paths');
    const skills = t.raw('skills') as unknown as Skill[];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                        {t('hero.description')}
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href="#learning-paths" className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                            {t('hero.explore_paths')}
                        </Link>
                        <Link href="https://notion.so" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300">
                            {t('hero.connect_with_me')}
                        </Link>
                    </div>
                </section>

                {/* Why Choose This Path? Section */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10">{t('why_choose_path.title')}</h2>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                {t('why_choose_path.introduction')}
                            </p>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2">{t('why_choose_path.young_learners_title')}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {t('why_choose_path.young_learners_description')}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2">{t('why_choose_path.adult_learners_title')}</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        {t('why_choose_path.adult_learners_description')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {/* Placeholder for professional headshot */}
                            <div className="w-64 h-64 bg-gray-300 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 text-sm">
                                [Your Professional Headshot Here]
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Discovery Paths (Courses/Services Offered) */}
                <section id="learning-paths" className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10">{t('discovery_paths.title')}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skills.map((skill, index) => (
                            <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
                                <div className="flex items-center mb-4">
                                    {skill.icon && <Image src={skill.icon} alt={skill.title} width={40} height={40} className="mr-4" />}
                                    <h3 className="text-2xl font-semibold">{skill.title}</h3>
                                </div>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">{skill.description}</p>
                                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
                                    {skill.benefits.map((benefit, i) => (
                                        <li key={i}>{benefit}</li>
                                    ))}
                                </ul>
                                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                    {skill.audience}
                                </span>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-300">
                                        {t('discovery_paths.learn_more')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How the Journey Works Section */}
                <section className="mb-16 text-center">
                    <h2 className="text-4xl font-bold mb-10">{t('how_journey_works.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 text-5xl mb-4">1</div>
                            <h3 className="text-2xl font-semibold mb-2">{t('how_journey_works.step1_title')}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{t('how_journey_works.step1_description')}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 text-5xl mb-4">2</div>
                            <h3 className="text-2xl font-semibold mb-2">{t('how_journey_works.step2_title')}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{t('how_journey_works.step2_description')}</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 text-5xl mb-4">3</div>
                            <h3 className="text-2xl font-semibold mb-2">{t('how_journey_works.step3_title')}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{t('how_journey_works.step3_description')}</p>
                        </div>
                    </div>
                </section>

                {/* Success Stories from the Path (Testimonials) */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10">{t('success_stories.title')}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Placeholder Testimonial 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <p className="italic text-gray-700 dark:text-gray-300 mb-4">{t('success_stories.testimonial1_text')}</p>
                            <p className="font-semibold">{t('success_stories.testimonial1_author')}</p>
                        </div>
                        {/* Placeholder Testimonial 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <p className="italic text-gray-700 dark:text-gray-300 mb-4">{t('success_stories.testimonial2_text')}</p>
                            <p className="font-semibold">{t('success_stories.testimonial2_author')}</p>
                        </div>
                    </div>
                </section>

                {/* Common Questions on the Path (FAQ) */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10">{t('common_questions.title')}</h2>
                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{t('common_questions.q1_title')}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{t('common_questions.q1_description')}</p>
                        </div>
                        {/* FAQ Item 2 */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{t('common_questions.q2_title')}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{t('common_questions.q2_description')}</p>
                        </div>
                        {/* FAQ Item 3 */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">{t('common_questions.q3_title')}</h3>
                            <p className="text-gray-700 dark:text-gray-300">{t('common_questions.q3_description')}</p>
                        </div>
                    </div>
                </section>

                {/* Final Call-to-Action / Contact */}
                <section className="text-center bg-blue-600 text-white p-10 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-bold mb-4">{t('call_to_action.title')}</h2>
                    <p className="text-xl mb-8">{t('call_to_action.description1')}</p>
                    <p className="text-lg mb-8">{t('call_to_action.description2')}</p>
                    <Link href="https://notion.so" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white text-blue-600 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors duration-300 shadow-md">
                        {t('call_to_action.button_text')}
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default LearnPage;
