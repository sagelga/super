import React from 'react';
import ProjectCard from '../cards/ProjectCard';

interface Project {
    title: string;
    description: string;
    githubLink: string;
    demoLink?: string;
}

interface ProjectShowcaseProps {
    projects: Project[];
}

const ProjectShowcase: React.FC<ProjectShowcaseProps> = ({ projects }) => {
    return (
        <section className="py-16 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">My Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectCard key={index} {...project} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectShowcase;
