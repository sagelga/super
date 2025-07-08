import React from 'react';
import Link from 'next/link';
import { getIconClass } from '@/utils/iconMapping';
import styles from './OnlineProfilesSection.module.css';

interface ProfileLink {
    name: string;
    url: string;
    iconClass?: string; // Added for Devicon or other icon libraries
}

interface OnlineProfilesSectionProps {
    profiles: ProfileLink[];
}

const OnlineProfilesSection: React.FC<OnlineProfilesSectionProps> = ({ profiles }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Online Profiles</h2>
                <div className={styles.grid}>
                    {profiles.map((profile, index) => {
                        const iconClass = getIconClass(profile.name);
                        return (
                            <Link key={index} href={profile.url} target="_blank" rel="noopener noreferrer" className={styles.profileCard}>
                                {iconClass && (
                                    <i className={`${iconClass} ${styles.profileIcon}`}></i>
                                )}
                                <span className={styles.profileName}>
                                    {profile.name}
                                </span>
                                <svg className={styles.profileLinkIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0l-6 6" />
                                </svg>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OnlineProfilesSection;
