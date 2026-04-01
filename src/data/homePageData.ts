import { useTranslations } from "next-intl";

interface Project {
    title: string;
    description: string;
    stack?: string[];
    githubLink?: string;
    demoLink?: string;
}

interface Experience {
    title: string;
    company: string;
    duration: string;
    description: string[];
}

interface Certification {
    title: string;
    issuer?: string;
    date?: string;
    url?: string;
    skills: string[];
}

interface Volunteering {
    title: string;
    organization?: string;
    duration?: string;
    description: string[];
    year?: string;
    link?: {
        text: string;
        href: string;
    };
}

interface HomePageData {
    skills: { core: string[]; proficient: string[]; familiar: string[] };
    projects: Project[];
    experiences: Experience[];
    certifications: Certification[];
    volunteering: Volunteering[];
}

type TFunction = ReturnType<typeof useTranslations<"home">>;

export const getHomePageData = (t: TFunction): HomePageData => {
    return {
        skills: t.raw("skills"),
        projects: t.raw("projects"),
        experiences: t.raw("experiences"),
        certifications: t.raw("certifications"),
        volunteering: t.raw("volunteering"),
    };
};
