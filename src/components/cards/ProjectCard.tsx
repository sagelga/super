import React from 'react';
import Link from 'next/link';
import styles from './ProjectCard.module.css';

interface ProjectCardProps {
    title: string;
    description: string;
    githubLink: string;
    demoLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, githubLink, demoLink }) => {
    return (
        <div className={styles.card}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <div className={styles.linksContainer}>
                {githubLink && (
                    <Link
                        href={githubLink}
                        className={styles.githubButton}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <svg className={styles.buttonIcon} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.089 2.91.833.091-.647.35-1.089.636-1.338-2.22-.253-4.555-1.119-4.555-4.934 0-1.096.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.701.114 2.503.331 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.202 2.398.099 2.65.64.7 1.028 1.592 1.028 2.688 0 3.822-2.339 4.67-4.566 4.925.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.523 2 12 2z" clipRule="evenodd" />
                        </svg>
                        GitHub
                    </Link>
                )}
                {demoLink && (
                    <Link
                        href={demoLink}
                        className={styles.demoButton}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Demo
                        <svg className={styles.demoButtonIcon} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6" />
                        </svg>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
