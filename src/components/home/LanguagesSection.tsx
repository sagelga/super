'use client';
import React from 'react';
import styles from './LanguagesSection.module.css';

interface LanguageItem {
    name: string;
    proficiency: string;
    iconClass?: string; // Add iconClass for Devicon
}

interface LanguagesSectionProps {
    languages: LanguageItem[];
}

const LanguagesSection: React.FC<LanguagesSectionProps> = ({ languages }) => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>Languages</h2>
                <div className={styles.grid}>
                    {languages.map((lang, index) => (
                        <div key={index} className={styles.languageCard}>
                            {lang.iconClass && (
                                <i className={`${lang.iconClass} ${styles.languageIcon}`}></i>
                            )}
                            <div>
                                <h3 className={styles.languageName}>{lang.name}</h3>
                                <p className={styles.languageProficiency}>{lang.proficiency}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default LanguagesSection;
