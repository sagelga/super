import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LearnPage: React.FC = () => {
    const skills = [
        {
            title: "Python Fundamentals Path",
            description: "A guided journey through the core concepts of Python, with practical exercises and real-world applications.",
            benefits: ["Master Python basics", "Build simple scripts", "Understand data structures"],
            audience: "Young Learners & Adults",
            icon: "/file.svg" // Placeholder icon
        },
        {
            title: "SQL Database Essentials",
            description: "Learn to design, query, and manage relational databases effectively.",
            benefits: ["Write complex SQL queries", "Database design principles", "Data manipulation"],
            audience: "Adult Learners",
            icon: "/file.svg" // Placeholder icon
        },
        {
            title: "TypeScript Web Development",
            description: "Build robust and scalable web applications using TypeScript and modern frameworks.",
            benefits: ["Strongly-typed JavaScript", "Frontend framework integration", "Scalable code architecture"],
            audience: "Adult Learners",
            icon: "/file.svg" // Placeholder icon
        },
        {
            title: "Notion Productivity & Organization",
            description: "Unlock Notion&apos;s full potential for personal organization, project management, and team collaboration.",
            benefits: ["Customizable workspaces", "Database management in Notion", "Workflow automation"],
            audience: "All Learners",
            icon: "/file.svg" // Placeholder icon
        },
        {
            title: "HTML & CSS: Building Blocks Path",
            description: "Start your web development journey by mastering the foundational languages of the internet.",
            benefits: ["Structure web content", "Style web pages", "Responsive design basics"],
            audience: "Young Learners & Adults",
            icon: "/file.svg" // Placeholder icon
        },
        {
            title: "React.js: Component Design Showcase",
            description: "Dive into React to build interactive and dynamic user interfaces.",
            benefits: ["Component-based architecture", "State management", "Hooks and functional components"],
            audience: "Adult Learners",
            icon: "/file.svg" // Placeholder icon
        },
        {
            title: "Git & GitHub: The Developer's Blueprint",
            description: "Learn essential version control for collaborative coding and project management.",
            benefits: ["Track code changes", "Collaborate with teams", "Manage project versions"],
            audience: "All Learners",
            icon: "/file.svg" // Placeholder icon
        },
    ];

    return (
        <div className="bg-gray-50 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Hero Section */}
                <section className="text-center mb-16">
                    <h1 className="text-5xl font-extrabold mb-4 leading-tight">
                        Personalized Tech Education: Your Path to Mastery Starts Here.
                    </h1>
                    <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
                        Discover tailored 1-on-1 teaching in Python, SQL, TypeScript, Notion, and more. I guide curious minds of all ages to unlock their full potential.
                    </p>
                    <div className="flex justify-center space-x-4">
                        <Link href="#learning-paths" className="px-8 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors duration-300">
                            Explore Learning Paths
                        </Link>
                        <Link href="https://notion.so" target="_blank" rel="noopener noreferrer" className="px-8 py-3 border border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 dark:hover:bg-gray-800 transition-colors duration-300">
                            Connect with Me
                        </Link>
                    </div>
                </section>

                {/* Why Choose This Path? Section */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10">Why Choose This Path?</h2>
                    <div className="grid md:grid-cols-2 gap-10 items-center">
                        <div>
                            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
                                My approach to teaching is centered on your unique learning style. I provide hands-on, project-based guidance, making complex topics accessible and enjoyable for every learner, from young beginners to seasoned professionals.
                            </p>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2">For Young Learners: Ignite Passion</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Engaging and interactive sessions designed to build foundational tech skills and foster a love for learning.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold mb-2">For Adult Learners: Accelerate Growth</h3>
                                    <p className="text-gray-700 dark:text-gray-300">
                                        Practical, in-depth mentorship to enhance your skills, solve real-world problems, and advance your career.
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
                    <h2 className="text-4xl font-bold text-center mb-10">Our Discovery Paths</h2>
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
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* How the Journey Works Section */}
                <section className="mb-16 text-center">
                    <h2 className="text-4xl font-bold mb-10">How the Journey Works</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 text-5xl mb-4">1</div>
                            <h3 className="text-2xl font-semibold mb-2">Identify Your Path</h3>
                            <p className="text-gray-700 dark:text-gray-300">Explore the diverse learning paths available and pinpoint the skills you want to master.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 text-5xl mb-4">2</div>
                            <h3 className="text-2xl font-semibold mb-2">Connect with Me</h3>
                            <p className="text-gray-700 dark:text-gray-300">Reach out via our contact form to discuss your goals and schedule an introductory chat.</p>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <div className="text-blue-600 text-5xl mb-4">3</div>
                            <h3 className="text-2xl font-semibold mb-2">Begin Your Learning</h3>
                            <p className="text-gray-700 dark:text-gray-300">Start your personalized 1-on-1 sessions and embark on your journey to expertise!</p>
                        </div>
                    </div>
                </section>

                {/* Success Stories from the Path (Testimonials) */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10">Success Stories from the Path</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Placeholder Testimonial 1 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <p className="italic text-gray-700 dark:text-gray-300 mb-4">&quot;Learning Python with [Your Name] was incredible! The lessons were so clear and fun, and I built my first game. Highly recommend for kids!&quot;</p>
                            <p className="font-semibold">- Alex (Age 12)</p>
                        </div>
                        {/* Placeholder Testimonial 2 */}
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                            <p className="italic text-gray-700 dark:text-gray-300 mb-4">&quot;I needed to pick up TypeScript for a new role, and [Your Name]&apos;s guidance was invaluable. The personalized approach helped me grasp complex concepts quickly. A true expert!&quot;</p>
                            <p className="font-semibold">- Sarah L. (Software Engineer)</p>
                        </div>
                    </div>
                </section>

                {/* Common Questions on the Path (FAQ) */}
                <section className="mb-16">
                    <h2 className="text-4xl font-bold text-center mb-10">Common Questions on the Path</h2>
                    <div className="space-y-4">
                        {/* FAQ Item 1 */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">What is the typical session format?</h3>
                            <p className="text-gray-700 dark:text-gray-300">Sessions are typically 1-on-1, conducted online via video call, and are highly interactive with a focus on hands-on coding and problem-solving.</p>
                        </div>
                        {/* FAQ Item 2 */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">Can I customize my learning path?</h3>
                            <p className="text-gray-700 dark:text-gray-300">Absolutely! While we have suggested paths, I work with each student to tailor the curriculum to their specific goals and interests.</p>
                        </div>
                        {/* FAQ Item 3 */}
                        <div className="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold mb-2">What age groups do you teach?</h3>
                            <p className="text-gray-700 dark:text-gray-300">I teach both young learners (typically 8+) and adults. My teaching style adapts to suit the age and experience level of the student.</p>
                        </div>
                    </div>
                </section>

                {/* Final Call-to-Action / Contact */}
                <section className="text-center bg-blue-600 text-white p-10 rounded-lg shadow-lg">
                    <h2 className="text-4xl font-bold mb-4">Ready to Start Your Journey?</h2>
                    <p className="text-xl mb-8">Take the first step towards mastering new skills. I&apos;m here to guide you.</p>
                    <p className="text-lg mb-8">Leave your contact details in the form below, and I&apos;ll get back to you to discuss your learning goals.</p>
                    <Link href="https://notion.so" target="_blank" rel="noopener noreferrer" className="px-10 py-4 bg-white text-blue-600 rounded-lg text-xl font-bold hover:bg-gray-100 transition-colors duration-300 shadow-md">
                        Connect with Me Now
                    </Link>
                </section>
            </div>
        </div>
    );
};

export default LearnPage;
