/**
 * Project item for homepage showcase
 */
export interface Project {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
}

/**
 * Experience item for work history
 */
export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills: string[];
}

/**
 * Certification item
 */
export interface Certification {
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  credentialId?: string;
}

/**
 * Volunteering experience item
 */
export interface Volunteering {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string[];
  cause: string;
}

/**
 * Skill item
 */
export type Skill = string;

/**
 * Combined homepage data structure
 */
export interface HomePageData {
  skills: Skill[];
  projects: Project[];
  experiences: Experience[];
  certifications: Certification[];
  volunteering: Volunteering[];
}
