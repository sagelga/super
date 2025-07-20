import { useTranslations } from "next-intl";

interface Project {
    title: string;
    description: string;
    stack?: string[];
    githubLink?: string;
    demoLink?: string;
    imageUrl?: string;
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

interface Language {
    name: string;
    proficiency: string;
    iconClass?: string;
}

interface OnlineProfile {
    name: string;
    url: string;
    iconClass: string;
}

interface HomePageData {
    skills: string[];
    projects: Project[];
    experiences: Experience[];
    certifications: Certification[];
    volunteering: Volunteering[];
    languages: Language[];
    onlineProfiles: OnlineProfile[];
}

// Define a TFunction type that is compatible with next-intl's useTranslations hook
// This type allows for the 'returnObjects' option and correctly handles the return type.

// Define a TFunction type that is compatible with next-intl's useTranslations hook
type TFunction = ReturnType<typeof useTranslations<"home">>;

export const getHomePageData = (t: TFunction): HomePageData => {
    return {
        skills: t.raw("skills"),
        projects: t.raw("projects"),
        experiences: t.raw("experiences"),
        certifications: t.raw("certifications"),
        volunteering: t.raw("volunteering"),
        languages: t.raw("languages"),
        onlineProfiles: t.raw("onlineProfiles"),
    };
};
