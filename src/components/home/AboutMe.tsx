import React from 'react';

const AboutMe: React.FC = () => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">About Me</h2>
                <div className="max-w-3xl mx-auto text-lg text-gray-700">
                    <p className="mb-4">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <h3 className="text-2xl font-semibold mb-4">Education</h3>
                    <ul className="list-disc list-inside">
                        <li>University Name, Degree, Year</li>
                        <li>Another University/Course, Certification, Year</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default AboutMe;
