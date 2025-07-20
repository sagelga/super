import { DocsProjectCardProps } from "@/components/cards/DocsProjectCard";

// Define the structure for common.json
export interface CommonMessages {
    greeting: string;
    blog: {
        search_placeholder: string;
        loading_posts: string;
        error_loading_posts: string;
        featured_posts_title: string;
        other_posts_title: string;
        previous_button: string;
        next_button: string;
        page_of: string;
        no_posts_found: string;
        all_categories: string;
        table_of_contents: string;
    };
    footer: {
        copyright: string;
        back_to_top: string;
        english: string;
        thai: string;
        chinese: string;
        japanese: string;
        sitemap: {
            kunanon_srisuntiroj: string;
            home: string;
            about: string;
            skills: string;
            experience: string;
            certifications: string;
            projects: string;
            todoist_notion_sync: string;
            learn_with_sagelga: string;
            documentation_website: string;
            byteside_one: string;
            the_sunny_side_publication: string;
            connect: string;
            linkedin: string;
            github: string;
            salesforce_trailblazer: string;
        };
    };
    github_label: string;
    demo_label: string;
    metadata: {
        title: string;
        description: string;
        site_name: string;
        image_alt: string;
    };
    docs: {
        sidebar_title: string;
    };
    navbar: {
        name: string;
        home: string;
        blog: string;
        gallery: string;
        learn: string;
        docs: string;
        experience: string;
        certifications: string;
        projects: string;
        volunteering: string;
    };
    breadcrumb: {
        home: string;
        blog: string;
        gallery: string;
        docs: string;
        experience: string;
        certifications: string;
        volunteering: string;
        projects: string;
        privacy_policy: string;
        terms_of_service: string;
    };
    not_found: {
        title: string;
        description: string;
        go_home: string;
    };
    gallery: {
        title: string;
        image_alt: string;
    };
    no_image_available: string;
    read_documentation: string;
    site: {
        name: string;
    };
}

// Define the structure for docs.json
export interface DocsMessages {
    docs_page_title: string;
    docs_page_description: string;
    projects_documentation_title: string;
    projects: DocsProjectCardProps[];
    doc_detail_page_title: string;
}

// Extend the next-intl messages
declare module "next-intl" {
    interface IntlMessages extends CommonMessages, DocsMessages {
        // Add other message interfaces here if needed
    }
}
