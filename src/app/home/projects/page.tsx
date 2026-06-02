import { getTranslations } from "next-intl/server";
import ProjectShowcase from "../../../components/home/ProjectShowcase";
import { getDocProjects } from "../../../lib/content";
import "@/styles/devicons.css";

export default async function ProjectsPage() {
    const t = await getTranslations("home");
    const projects = t.raw("projects") as Array<{
        title: string;
        description: string;
        stack?: string[];
        githubLink?: string;
        demoLink?: string;
        docsSlug?: string;
    }>;
    const docProjects = (await getDocProjects()).sort(
        (a, b) => b.pageCount - a.pageCount,
    );

    return (
        <div className="container mx-auto py-8">
            <ProjectShowcase projects={projects} docProjects={docProjects} />
        </div>
    );
}
