'use client';

import ProjectShowcase from "../../../components/home/ProjectShowcase";
import { projects } from "../../../data/homePageData";

export default function ProjectsPage() {
  return (
    <div className="container mx-auto py-8">
      <ProjectShowcase projects={projects} />
    </div>
  );
}
