import HeroSection from "../components/home/HeroSection";
import AboutMe from "../components/home/AboutMe";
import SkillsList from "../components/home/SkillsList";
import ProjectShowcase from "../components/home/ProjectShowcase";

export default function Home() {
  const skills = [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "Express.js",
    "MongoDB",
    "SQL",
    "Git",
    "Docker",
  ];

  const projects = [
    {
      title: "Project One",
      description: "A brief description of project one.",
      githubLink: "https://github.com/your-username/project-one",
      demoLink: "#",
    },
    {
      title: "Project Two",
      description: "A brief description of project two.",
      githubLink: "https://github.com/your-username/project-two",
    },
    {
      title: "Project Three",
      description: "A brief description of project three.",
      githubLink: "https://github.com/your-username/project-three",
      demoLink: "#",
    },
  ];

  return (
    <div className="container mx-auto">
      <HeroSection />
      <AboutMe />
      <SkillsList skills={skills} />
      <ProjectShowcase projects={projects} />
    </div>
  );
}
