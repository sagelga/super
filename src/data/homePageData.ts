// Array of skills with their names
export const skills = [
    "JavaScript",
    "TypeScript",
    "Salesforce Apex",
    "Salesforce SOQL",
    "Python",
    "MySQL",
    "PostgreSQL",
    "Oracle SQL",
    "Microsoft T-SQL",
    "Oracle PL/SQL",
    "HTML",
    "CSS",
    "Vue",
    "React",
    "MongoDB",
    "Salesforce CRM (SFDC)",
    "Salesforce Marketing Cloud (SFMC)",
    "Amazon Web Services (AWS)",
    "Git",
    "Google Analytics",
    "Microsoft Office",
    "Figma",
    "Jira",
    "GitHub",
    "Postman",
    "Bing Webmaster Tools",
    "Google Search Console",
    "Meta Business Suite",
    "WordPress",
    "Visual Studio Code",
    "Jupyter Notebook",
    "DataGrip",
    "Cloudinary",
    "Notion",
    "Netlify",
    "Docker",
    "Algolia",
    "Hotjar",
    "Canva",
    "Ahrefs",
    "ChatGPT",
    "DALL·E",
    "Perplexity",
    "Cloudflare Worker",
    "Webhook",
    "Next.js",
    "Cloudflare Pages",
    "API Integration",
    "Google AI Studio",
    "Cloudflare D2",
    "Docusaurus",
    "SEO",
    "Content Monetization",
    "Content Creation",
    "Google Apps Script",
    "Google Forms",
    "Workflow Automation",
    "Oracle ERP",
    "Data Quality",
    "Data Normalization",
    "IBM SPSS Statistics",
    "Regression Analysis",
    "Statistical Modeling",
    "Parse Platform",
    "Node.js",
    "Express.js",
    "Digital Ocean Spaces",
    "Data Analysis",
    "Java",
    "Game Development",
    "C (Programming Language)",
];

// Array of projects with their details
export const projects = [
    {
        title: "Super",
        description:
            "Personal portfolio website built with Next.js and Cloudflare Pages, integrating with Superbrain API. Orchestrated development using Gemini 2.5 Flash/Pro models for code generation and task execution.",
        githubLink: "https://github.com/sagelga/super",
        demoLink: "https://super.sagelga.workers.dev",
    },
    {
        title: "Superbrain",
        description:
            "API for blog content, retrieving Notion changes and storing them in Cloudflare D2 for fast retrieval. Fully runs on Cloudflare Workers; orchestrated development using Gemini models.",
        githubLink: "https://github.com/sagelga/superbrain",
        demoLink: "", // Assuming no direct demo link as it's an API
    },
    {
        title: "Todoist Notion Sync",
        description:
            "Utilizes Cloudflare Worker to listen to Webhook from Todoist and create a new task in Notion.",
        githubLink: "https://github.com/sagelga/todoist-tagging", // Placeholder, add actual link if available
        demoLink: "", // Placeholder, add actual link if available
        imageUrl: "/images/placeholder-project.png", // Placeholder image
    },
    {
        title: "Learn with sagelga",
        description:
            "Rebuilt learn.sagelga.com with Docusaurus, React, and TypeScript, enhancing search and speed to empower Python and SQL learners.",
        githubLink: "https://github.com/sagelga/learn-with-sagelga", // Assuming a GitHub repo exists for this
        demoLink: "https://learn.sagelga.com",
    },
    {
        title: "Byteside.one",
        description:
            "Founded ByteSide.one, a tech, gadget, and gaming news publication, achieving 2.79 million Google Search impressions and 200k+ monthly Facebook impressions by Jan 2023.",
        githubLink: "", // No GitHub link provided
        demoLink: "https://byteside.one/",
    },
    {
        title: "The Sunny Side Publication",
        description:
            "Pioneered 'The Sunny Side' publication on Medium, a precursor to ByteSide.one, showcasing early content creation and publishing expertise.",
        githubLink: "", // No GitHub link provided
        demoLink: "https://medium.com/the-sunny-side",
    },
    {
        title: "Approval Workflow on Google Apps Script",
        description:
            "Developed an automated approval workflow for IMST using Google Apps Script, streamlining IT, Requisition, and Procurement processes with automated email triggers and Google Forms integration.",
        githubLink: "https://github.com/sagelga/approval-workflow",
        demoLink: "https://docs.sagelga.com/approval-workflow/", // Using documentation as demo
    },
    {
        title: "Essilor Asia Supplier Deduplication Report",
        description:
            "Developed Oracle SQL and PL/SQL scripts for Essilor Asia and Europe, generating supplier deduplication reports to enhance data quality in production Oracle ERP, including similarity scoring and normalization.",
        githubLink: "", // No GitHub link provided
        demoLink: "", // No demo link provided
    },
    {
        title: "Data Analytics on Body Fat",
        description:
            "Conducted multi-regression analysis on body fat and body part size relationships using IBM SPSS Statistics to create statistical models.",
        githubLink: "https://github.com/sagelga/bodyfat-regression",
        demoLink: "", // No demo link provided
    },
    {
        title: "Lecture sharing System (Oh Sheet!)",
        description:
            "Developed 'Oh Sheet!', a lecture sharing system using Vue, Parse, NodeJS, ExpressJS, and Digital Ocean Spaces, designed for easy sharing and discovery of educational content.",
        githubLink: "https://github.com/sagelga/oh-sheet",
        demoLink: "https://docs.sagelga.com/oh-sheet/", // Using documentation as demo
    },
    {
        title: "Online Space Reservation System",
        description:
            "Designed and implemented an online space reservation system with PostgreSQL, Scala, GraphQL, and NodeJS, managing user requirements and approvals for building administrators.",
        githubLink: "https://github.com/itforge-eros/panda-website",
        demoLink: "https://docs.sagelga.com/project-panda/", // Using documentation as demo
    },
    {
        title: "Thai restaurant analysis",
        description:
            "Analyzed the prevalence of Thai restaurants in the United States, investigating underlying causes and trends.",
        githubLink: "https://github.com/sagelga/data-journal",
        demoLink: "", // No demo link provided
    },
    {
        title: "Trash Melody",
        description:
            "Developed 'Trash Melody', a fast-paced OSU!-inspired Java game, combining entertainment with education on trash categorization.",
        githubLink: "https://github.com/sagelga/trashmelody",
        demoLink: "https://docs.sagelga.com/trash-melody/", // Using documentation as demo
    },
    {
        title: "Point of Sales (POS) System",
        description:
            "Engineered a comprehensive Point-of-Sale (POS) system in C, featuring analytics, stock/profit management, sales forecasting (Linear Regression), customer loyalty, and barcode scanner support, with data stored in CSV format.",
        githubLink: "https://github.com/sagelga/ComPro_Project",
        demoLink: "https://docs.sagelga.com/compro-project/", // Using documentation as demo
    },
];

// Array of professional experiences with their details
export const experiences = [
    {
        title: "Salesforce Marketing Cloud Developer",
        company: "Digital Vanguard Co., Ltd.",
        duration: "September 2023 - May 2024",
        description: [
            "Collaborated with Thailand's leading oil and retail enterprise to maintain and develop Salesforce Marketing Cloud with Knowesis solutions (Sift and Opolo), thereby facilitating data-driven, omnichannel marketing campaigns.",
            "Developed automation for personalized customer campaign journeys using Salesforce’s Journey Builder and Automation Studio, importing and exporting data between customer engagement and analytics platforms such as Informatica, Cloudera, and Knowesis Sift.",
            "Optimized SQL queries to efficiently retrieve campaign leads from analytics platforms, to reduce data retrieval time and enable faster campaign execution.",
            "Developed campaign summary reports such as email open rates, click-through rates, campaign offerings, and automation status.",
            "Improved email templates and landing pages using HTML, CSS, JavaScript, and Salesforce AMPScript, enhancing responsiveness and compatibility across devices and modern email clients.",
            "Initiated a proactive contingency plan to handle Marketing Cloud’s maintenance periods, ensuring no disruptions to critical marketing campaigns and data flow automations.",
        ],
    },
    {
        title: "Web Developer, Administrator, and Content Creator",
        company: "ByteSide.one",
        duration: "September 2021 - September 2023",
        description: [
            "Founded a technology, gadget, and gaming news publication, reaching 125,000 website visits and 400,000 monthly post impressions on Facebook.",
            "Architected and implemented scalable website infrastructure using WordPress, Cloudflare, AWS Lightsail and AWS CloudFront, ensuring optimal content delivery and security.",
            "Executed omnichannel content monetization strategies, including Google AdSense and affiliate marketing across multiple mediums and affiliate networks, ensuring a sustainable business model for the publication.",
        ],
    },
    {
        title: "Cooperative Studies Student",
        company: "EssilorLuxottica",
        duration: "May 2019 - November 2019",
        description: [
            "Developed Approval Workflow, built-in to Google Sheets using Google Apps Script (JavaScript-based language), reducing costs and streamlining Essilor Shared Service's Approval Request workflow.",
            "Gathering business requirements from users and maintainers.",
            "Coordinating with the Master Data Management (MDM) team for maintaining the service.",
            "Approval Workflow is currently being used in Essilor Shared Service's Requisition Department and IT Procurement Team.",
            "Knowledge sharing and created documentation for Approval Workflow.",
            "also developed Data Duplication and Cleaning Reports using OracleSQL and PL/SQL, improving Essilor's global supplier data quality.",
            "Developed Approval Workflow using Google Apps Script (JavaScript-based language), Google Sheets, Google Forms, and Gmail.",
            "Developed Duplication Report using OracleSQL and PL/SQL and deployed it to Oracle ERP.",
            "Taught OracleSQL and Git to the team.",
            "Created documentation for Duplication Reports.",
        ],
    },
];

// Array of certifications with their details
export const certifications = [
    {
        title: "Badge 1: Data Warehousing Workshop",
        skills: [
            "Snowflake",
            "Data Engineering",
            "SQL",
            "Data Modeling",
            "ETL Processes",
        ],
    },
    {
        title: "Building Language Models on AWS",
        skills: [
            "Large Language Models (LLM)",
            "Amazon Web Services (AWS)",
            "Deep Learning",
            "AWS SageMaker",
            "Retrieval-Augmented Generation",
        ],
    },
    {
        title: "Foundations of Prompt Engineering",
        skills: [
            "Prompt Engineering",
            "Amazon Web Services (AWS)",
            "AWS SageMaker",
            "Generative AI",
            "Large Language Models (LLM)",
        ],
    },
    {
        title: "Introduction to Generative AI",
        skills: [
            "Generative AI",
            "Google Cloud Platform (GCP)",
            "Vector Databases",
            "Machine Learning",
            "AI Ethics",
        ],
    },
    {
        title: "Lightning Experience Reports & Dashboards Specialist Superbadge",
        skills: [
            "Salesforce.com",
            "Report Building",
            "Dashboard Design",
            "Data Visualization",
            "Salesforce Analytics",
        ],
    },
    {
        title: "Business Administration Specialist Superbadge",
        skills: [
            "Salesforce.com",
            "Business Administration",
            "Process Automation",
            "CRM Management",
            "Data Security",
        ],
    },
    {
        title: "Flow Data Collections Specialist Superbadge",
        date: "June 2023",
        skills: [
            "Salesforce Flow",
            "Data Collection",
            "Automation",
            "Salesforce Integration",
            "Data Management",
        ],
    },
    {
        title: "Flow Elements and Resources Specialist Superbadge",
        skills: [
            "Salesforce Flow",
            "Resource Management",
            "Process Builder",
            "Workflow Automation",
            "Salesforce Configuration",
        ],
    },
    {
        title: "Flow Management Specialist Superbadge",
        skills: [
            "Salesforce Flow",
            "Process Automation",
            "CRM Optimization",
            "Data Handling",
            "Salesforce Maintenance",
        ],
    },
    {
        title: "React - The Complete Guide 2023 (incl. React Router & Redux)",
        skills: [
            "React.js",
            "Redux.js",
            "JavaScript",
            "Web Development",
            "Front-End Architecture",
        ],
    },
    {
        title: "MERN Stack Front To Back: Full Stack React, Redux & Node.js",
        skills: [
            "MERN Stack",
            "React.js",
            "TypeScript",
            "JavaScript",
            "Node.js",
            "Redux Thunk",
        ],
    },
    {
        title: "Salesforce Marketing Cloud Administrator Certification",
        skills: [
            "Salesforce Marketing Cloud",
            "Email Marketing",
            "Automation Studio",
            "Journey Builder",
            "Data Management",
        ],
    },
    {
        title: "The Complete Salesforce Certified Administrator Course",
        skills: [
            "Salesforce.com",
            "Salesforce Administration",
            "Data Management",
            "User Management",
            "Process Automation",
        ],
    },
    {
        title: "Databases for Developers: Next Level",
        skills: [
            "OracleSQL",
            "SQL",
            "PL/SQL",
            "Database Optimization",
            "Advanced Querying",
        ],
    },
    {
        title: "Databases for Developers: Foundations",
        skills: [
            "OracleSQL",
            "SQL",
            "Database Design",
            "Querying",
            "Data Management",
        ],
    },
];

// Array of volunteering experiences with their details
export const volunteering = [
    {
        title: "Senior advisor and referee",
        year: "2018",
        description: [
            "Advisor and refereee in 'PHP and JavaScript' competition on IT Open House 2018.",
        ],
    },
    {
        title: "Education Team Member",
        year: "2017",
        description: [
            "In practicing new student to learn how to code in Python3, practicing Problem Solving skills.",
            "Starts for IT KMITL Python Pre-programming course on YouTube for on-demand online Python course, provisionned for infinite learning possibilities.",
        ],
        link: {
            text: "IT KMITL Python Pre-programming course on YouTube",
            href: "https://www.youtube.com/c/PreProgrammingITKMITL",
        },
    },
    {
        title: "Teaching Director",
        year: "2017",
        description: [
            "Teaching new students on how the Cloud Service using Amazon Web Service.",
        ],
    },
];

// Array of languages with proficiency and optional icon class
export const languages = [
    {
        name: "English",
        proficiency: "Professional proficiency",
        iconClass: "devicon-english-plain",
    }, // Placeholder, Devicon doesn't have an English icon
    {
        name: "Thai",
        proficiency: "Native proficiency",
        iconClass: "devicon-thai-plain",
    }, // Placeholder, Devicon doesn't have a Thai icon
];

// Array of online profiles with their names, URLs, and icon classes
export const onlineProfiles = [
    {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/kunanon/",
        iconClass: "devicon-linkedin-plain",
    },
    {
        name: "GitHub",
        url: "https://github.com/sagelga",
        iconClass: "devicon-github-plain",
    },
    {
        name: "Salesforce Trailblazer",
        url: "https://www.salesforce.com/trailblazer/sagelga",
        iconClass: "devicon-salesforce-plain",
    },
];
