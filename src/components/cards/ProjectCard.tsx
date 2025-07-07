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
        <div className="border p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex justify-between">
                <Link href={githubLink} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    GitHub
                </Link>
                {demoLink && (
                    <Link href={demoLink} className="text-blue-500 hover:underline ml-4" target="_blank" rel="noopener noreferrer">
                        Demo
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
