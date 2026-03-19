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
    const t = useTranslations('learn');
    const skills = t.raw('discovery_paths.skills') as unknown as Skill[];

    return (
        <div className="bg-canvas min-h-screen text-cream">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        {t('hero.title')}
                    </h1>
                    <p className="text-xl text-muted mb-8">
                        {t('hero.description')}
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href="#learning-paths" className="px-8 py-3 bg-brand text-cream rounded-lg text-lg font-semibold hover:bg-brand-600 transition-colors duration-300">
                            {t('hero.explore_paths')}
                        </Link>
                        <Link href="https://notion.so" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border-2 border-brand text-brand rounded-lg text-lg font-semibold hover:bg-brand-50 dark:hover:bg-brand-900 transition-colors duration-300">
                            {t('hero.connect_with_me')}
                        </Link>
                    </div>
                </section>

                {/* Why Choose This Path? Section */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10 text-cream">{t('why_choose_path.title')}</h2>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <p className="text-lg text-muted mb-6">
                                {t('why_choose_path.introduction')}
                            </p>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2 text-cream">{t('why_choose_path.young_learners_title')}</h3>
                                    <p className="text-muted">
                                        {t('why_choose_path.young_learners_description')}
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2 text-cream">{t('why_choose_path.adult_learners_title')}</h3>
                                    <p className="text-muted">
                                        {t('why_choose_path.adult_learners_description')}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            {/* Placeholder for professional headshot */}
                            <div className="w-64 h-64 bg-surface rounded-full flex items-center justify-center text-muted text-sm border border-rim">
                                [Your Professional Headshot Here]
                            </div>
                        </div>
                    </div>
                </section>

                {/* Our Discovery Paths (Courses/Services Offered) */}
                <section id="learning-paths" className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10 text-cream">{t('discovery_paths.title')}</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {skills.map((skill, index) => (
                            <div key={index} className="bg-surface p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-rim">
                                <div className="flex items-center mb-4">
                                    {skill.icon && <Image src={skill.icon} alt={skill.title} width={40} height={40} className="mr-4" />}
                                    <h3 className="text-2xl font-semibold text-cream">{skill.title}</h3>
                                </div>
                                <p className="text-muted mb-4">{skill.description}</p>
                                <ul className="list-disc list-inside text-muted mb-4 space-y-1">
                                    {skill.benefits.map((benefit, i) => (
                                        <li key={i}>{benefit}</li>
                                    ))}
                                </ul>
                                <span className="inline-block bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                                    {skill.audience}
                                </span>
                                <div className="mt-6">
                                    <button className="w-full px-4 py-2 bg-brand text-cream rounded-lg hover:bg-brand-600 transition-colors duration-300">
                                        {t('discovery_paths.learn_more')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How the Journey Works Section */}
                <section className="mb-16 text-center">
                    <h2 className="text-4xl font-bold mb-10 text-cream">{t('how_journey_works.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-surface p-6 rounded-xl shadow-md border border-rim">
                            <div className="text-accent text-5xl mb-4 font-serif">1</div>
                            <h3 className="text-2xl font-semibold mb-2 text-cream">{t('how_journey_works.step1_title')}</h3>
                            <p className="text-muted">{t('how_journey_works.step1_description')}</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-md border border-rim">
                            <div className="text-accent text-5xl mb-4 font-serif">2</div>
                            <h3 className="text-2xl font-semibold mb-2 text-cream">{t('how_journey_works.step2_title')}</h3>
                            <p className="text-muted">{t('how_journey_works.step2_description')}</p>
                        </div>
                        <div className="bg-surface p-6 rounded-xl shadow-md border border-rim">
                            <div className="text-accent text-5xl mb-4 font-serif">3</div>
                            <h3 className="text-2xl font-semibold mb-2 text-cream">{t('how_journey_works.step3_title')}</h3>
                            <p className="text-muted">{t('how_journey_works.step3_description')}</p>
                        </div>
                    </div>
                </section>

                {/* Success Stories from the Path (Testimonials) */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10 text-cream">{t('success_stories.title')}</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Placeholder Testimonial 1 */}
                        <div className="bg-surface p-6 rounded-xl shadow-md border border-rim">
                            <p className="italic text-muted mb-4">{t('success_stories.testimonial1_text')}</p>
                            <p className="font-semibold text-accent">{t('success_stories.testimonial1_author')}</p>
                        </div>
                        {/* Placeholder Testimonial 2 */}
                        <div className="bg-surface p-6 rounded-xl shadow-md border border-rim">
                            <p className="italic text-muted mb-4">{t('success_stories.testimonial2_text')}</p>
                            <p className="font-semibold text-accent">{t('success_stories.testimonial2_author')}</p>
                        </div>
                    </div>
                </section>

                {/* Common Questions on the Path (FAQ) */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10 text-cream">{t('common_questions.title')}</h2>
                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-surface p-5 rounded-xl shadow-md border border-rim">
                            <h3 className="text-xl font-semibold mb-2 text-cream">{t('common_questions.q1_title')}</h3>
                            <p className="text-muted">{t('common_questions.q1_description')}</p>
                        </div>
                        {/* FAQ Item 2 */}
                        <div className="bg-surface p-5 rounded-xl shadow-md border border-rim">
                            <h3 className="text-xl font-semibold mb-2 text-cream">{t('common_questions.q2_title')}</h3>
                            <p className="text-muted">{t('common_questions.q2_description')}</p>
                        </div>
                        {/* FAQ Item 3 */}
                        <div className="bg-surface p-5 rounded-xl shadow-md border border-rim">
                            <h3 className="text-xl font-semibold mb-2 text-cream">{t('common_questions.q3_title')}</h3>
                            <p className="text-muted">{t('common_questions.q3_description')}</p>
                        </div>
                    </div>
                </section>

                {/* Final Call-to-Action / Contact */}
                <section className="text-center bg-brand text-cream p-10 rounded-xl shadow-lg">
                    <h2 className="text-4xl font-bold mb-4">{t('call_to_action.title')}</h2>
                    <p className="text-xl mb-8">{t('call_to_action.description1')}</p>
                    <p className="text-lg mb-8 text-cream-80">{t('call_to_action.description2')}</p>
                    <Link href="https://notion.so" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-accent text-canvas rounded-lg text-xl font-bold hover:bg-accent-400 transition-colors duration-300 shadow-md">
                        {t('call_to_action.button_text')}
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default LearnPage;
