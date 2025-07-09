'use client';

import HeroSection from "../components/home/HeroSection";
import AboutMe from "../components/home/AboutMe";
import SkillsList from "../components/home/SkillsList";
import ProjectShowcase from "../components/home/ProjectShowcase";
import ExperienceSection from "../components/home/ExperienceSection";
import CertificationsSection from "../components/home/CertificationsSection";
import VolunteeringSection from "../components/home/VolunteeringSection";
import LanguagesSection from "../components/home/LanguagesSection";


import {
  skills,
  projects,
  experiences,
  certifications,
  volunteering,
  languages,
} from "../data/homePageData";

export default function Home() {
  return (
    <div className="container mx-auto">
      <HeroSection />
      <AboutMe />
      <ExperienceSection experiences={experiences} />
      <SkillsList skills={skills} />
      <CertificationsSection certifications={certifications} />
      <VolunteeringSection volunteering={volunteering} />
      <LanguagesSection languages={languages} />
      
      <ProjectShowcase projects={projects} />
    </div>
  );
}