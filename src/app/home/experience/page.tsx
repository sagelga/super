'use client';

import ExperienceSection from "../../../components/home/ExperienceSection";
import { experiences } from "../../../data/homePageData";

export default function ExperiencePage() {
  return (
    <div className="container mx-auto py-8">
      <ExperienceSection experiences={experiences} />
    </div>
  );
}
