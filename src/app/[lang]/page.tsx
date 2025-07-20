'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import HeroSection from '../../components/home/HeroSection';
import AboutMe from '../../components/home/AboutMe';
import SkillsList from '../../components/home/SkillsList';
import ProjectShowcase from '../../components/home/ProjectShowcase';
import ExperienceSection from '../../components/home/ExperienceSection';
import CertificationsSection from '../../components/home/CertificationsSection';
import VolunteeringSection from '../../components/home/VolunteeringSection';
import { getHomePageData } from '../../data/homePageData';


export default function Home() {
    const t = useTranslations('home');
    const { skills, projects, experiences, certifications, volunteering } = getHomePageData(t);

    return (
        <main>
            <HeroSection />
            <AboutMe />
            <SkillsList skills={skills} />
            <ProjectShowcase projects={projects} />
            <ExperienceSection experiences={experiences} />
            <CertificationsSection certifications={certifications} />
            <VolunteeringSection volunteering={volunteering} />
        </main>
    );
}
