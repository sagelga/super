import React from 'react';
import Link from 'next/link';


interface ProjectCardProps {
    title: string;
    description: string;
    githubLink: string;
    demoLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, githubLink, demoLink }) => {
    return (
        <div className="flex h-full transform flex-col rounded-xl bg-white p-8 shadow-lg transition-shadow duration-300 ease-in-out hover:-translate-y-1 hover:shadow-xl dark:bg-gray-800">
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{title}</h3>
            <p className="mb-6 flex-grow leading-relaxed text-gray-700 dark:text-gray-300">{description}</p>
            <div className="mt-auto flex flex-wrap gap-4">
                {githubLink && (
                    <Link
                        href={githubLink}
                        className="inline-flex items-center rounded-md border border-transparent bg-gray-700 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-400"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg className="mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.338-2.22-.253-4.555-1.119-4.555-4.934 0-1.096.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.701.114 2.503.331 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.099 2.65.64.7 1.028 1.592 1.028 2.688 0 3.822-2.339 4.67-4.566 4.925.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                    </Link>
                )}
                {demoLink && (
                    <Link
                        href={demoLink}
                        className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-5 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-400"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Demo
                        <svg className="-mr-0.5 ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6" />
                        </svg>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
