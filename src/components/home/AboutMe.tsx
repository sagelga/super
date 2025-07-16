import React from 'react';

// AboutMe functional component
const AboutMe: React.FC = () => {
    return (
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                {/* Section Title */}
                <h2 className="text-4xl font-extrabold text-center mb-12 text-gray-800 dark:text-white">About Me</h2>
                <div className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {/* Personal Introduction */}
                    <p className="mb-6 text-center">
                        Beyond his professional life, Kunanon cherishes his travels to Kumamoto, Japan. It&apos;s his personality that drives his creativity, straightforwardness, and self-awareness, reflecting his values of confident humility and innovation.
                    </p>
                    {/* Education Section */}
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Education</h3>
                        <ul className="list-none space-y-3">
                            <li className="flex items-start">
                                {/* Icon for education item */}
                                <svg className="flex-shrink-0 w-6 h-6 text-blue-500 mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <div>
                                    {/* University Name */}
                                    <p className="font-semibold text-gray-900 dark:text-white">King Mongkut&apos;s Institute of Technology Ladkrabang</p>
                                    {/* School and Years */}
                                    <p className="text-gray-600 dark:text-gray-400">School of Information Technology, 2016 - 2020</p>
                                    {/* Grade */}
                                    <p className="text-gray-600 dark:text-gray-400">Grade: 3.07</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
