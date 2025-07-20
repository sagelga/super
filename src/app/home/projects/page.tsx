'use client';

import ProjectShowcase from "../../../components/home/ProjectShowcase";
import { getHomePageData } from "../../../data/homePageData";
import { useTranslations } from "next-intl";

export default function ProjectsPage() {
  const t = useTranslations('home');
  const { projects } = getHomePageData(t);
  return (
    <div className="container mx-auto py-8">
      <ProjectShowcase projects={projects} />
    </div>
  );
}
