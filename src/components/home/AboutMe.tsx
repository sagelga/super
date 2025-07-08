import React from 'react';
import styles from './AboutMe.module.css';

const AboutMe: React.FC = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h2 className={styles.heading}>About Me</h2>
                <div className={styles.content}>
                    <p className={styles.paragraph}>
                        Beyond his professional life, Kunanon cherishes his travels to Kumamoto, Japan. It&apos;s his personality that drives his creativity, straightforwardness, and self-awareness, reflecting his values of confident humility and innovation.
                    </p>
                    <div className={styles.educationCard}>
                        <h3 className={styles.educationHeading}>Education</h3>
                        <ul className={styles.educationList}>
                            <li className={styles.educationItem}>
                                <svg className={styles.educationIcon} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                <div>
                                    <p className={styles.educationTitle}>King Mongkut&apos;s Institute of Technology Ladkrabang</p>
                                    <p className={styles.educationDetail}>School of Information Technology, 2016 - 2020</p>
                                    <p className={styles.educationDetail}>Grade: 3.07</p>
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
