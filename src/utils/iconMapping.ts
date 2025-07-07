// src/utils/iconMapping.ts

export const getIconClass = (name: string): string => {
    switch (name) {
        // Skills
        case "JavaScript": return "devicon-javascript-plain";
        case "TypeScript": return "devicon-typescript-plain";
        case "Salesforce Apex": return "devicon-salesforce-plain";
        case "Salesforce SOQL": return "devicon-salesforce-plain";
        case "Python": return "devicon-python-plain";
        case "Oracle PL/SQL": return "devicon-oracle-plain";
        case "HTML": return "devicon-html5-plain";
        case "CSS": return "devicon-css3-plain";
        case "Vue": return "devicon-vuejs-plain";
        case "React": return "devicon-react-plain";
        case "SQL (MySQL, PostgreSQL, Oracle SQL, Microsoft T-SQL)": return "devicon-sqldeveloper-plain";
        case "MySQL": return "devicon-mysql-plain";
        case "PostgreSQL": return "devicon-postgresql-plain";
        case "Oracle SQL": return "devicon-oracle-plain";
        case "Microsoft T-SQL": return "devicon-microsoftsqlserver-plain";
        case "NoSQL (MongoDB)": return "devicon-mongodb-plain";
        case "Salesforce CRM (SFDC)": return "devicon-salesforce-plain";
        case "Salesforce Marketing Cloud (SFMC)": return "devicon-salesforce-plain";
        case "Amazon Web Services (AWS)": return "devicon-amazonwebservices-plain";
        case "Microsoft Office": return "devicon-microsoft-plain";
        case "Cloudflare": return "devicon-cloudflare-plain";
        case "CI/CD Tools (GitHub Actions, CircleCI, Travis CI, CloudFlare Pages)": return "devicon-jenkins-plain"; // Generic CI/CD icon
        case "GitHub Actions": return "devicon-githubactions-plain";
        case "CircleCI": return "devicon-circleci-plain";
        case "Travis CI": return "devicon-travisci-plain";
        case "CloudFlare Pages": return "devicon-cloudflare-plain";
        case "Git": return "devicon-git-plain";
        case "Google Analytics": return "devicon-google-plain";
        case "Figma": return "devicon-figma-plain";
        case "Jira": return "devicon-jira-plain";
        case "GitHub": return "devicon-github-plain";
        case "Postman": return "devicon-postman-plain";
        case "Bing Webmaster Tools": return "devicon-microsoft-plain";
        case "Google Search Console": return "devicon-google-plain";
        case "Meta Business Suite": return "devicon-facebook-plain";
        case "WordPress": return "devicon-wordpress-plain";
        case "Visual Studio Code": return "devicon-vscode-plain";
        case "Jupyter Notebook": return "devicon-jupyter-plain";
        case "DataGrip": return "devicon-datagrip-plain";
        case "Cloudinary": return "devicon-cloudinary-plain";
        case "Notion": return "devicon-notion-plain";
        case "Netlify": return "devicon-netlify-plain";
        case "Docker": return "devicon-docker-plain";
        case "Algolia": return "devicon-algolia-plain";
        case "Hotjar": return "devicon-hotjar-plain";
        case "Canva": return "devicon-canva-plain";
        case "Ahrefs": return "devicon-ahrefs-plain";
        case "ChatGPT": return "devicon-openai-plain";
        case "DALL·E": return "devicon-openai-plain";
        case "Perplexity": return ""; // No direct Devicon for Perplexity
        case "Duolingo": return "devicon-duolingo-plain";
        case "Cloudflare Worker": return "devicon-cloudflare-plain";
        case "Webhook": return "devicon-webhooks-plain"; // Placeholder, no direct devicon
        case "Todoist API": return "devicon-todoist-plain"; // Placeholder, no direct devicon
        case "Notion API": return "devicon-notion-plain";
        case "Next.js": return "devicon-nextjs-plain";
        case "Cloudflare Pages": return "devicon-cloudflare-plain";
        case "API Integration": return "devicon-rest-plain"; // Placeholder, no direct devicon
        case "Gemini API": return "devicon-google-plain"; // Using google icon as a placeholder
        case "Code Generation": return "devicon-github-plain"; // Using github icon as a placeholder
        case "Cloudflare D2": return "devicon-cloudflare-plain";
        case "Serverless Database": return "devicon-amazonwebservices-plain"; // Using AWS as a placeholder
        case "Docusaurus": return "devicon-docusaurus-plain"; // Placeholder, no direct devicon
        case "Documentation": return "devicon-markdown-plain"; // Using markdown as a placeholder
        case "SEO": return "devicon-google-plain"; // Using google icon as a placeholder
        case "Content Monetization": return "devicon-dollar-plain"; // Placeholder, no direct devicon
        case "Content Creation": return "devicon-wordpress-plain"; // Using wordpress as a placeholder
        case "Publishing": return "devicon-wordpress-plain"; // Using wordpress as a placeholder
        case "Google Apps Script": return "devicon-google-plain";
        case "Google Forms": return "devicon-google-plain";
        case "Workflow Automation": return "devicon-jira-plain"; // Using Jira as a placeholder
        case "Oracle ERP": return "devicon-oracle-plain";
        case "Data Quality": return "devicon-postgresql-plain"; // Using postgresql as a placeholder
        case "Data Normalization": return "devicon-postgresql-plain"; // Using postgresql as a placeholder
        case "IBM SPSS Statistics": return "devicon-ibm-plain"; // Placeholder, no direct devicon
        case "Regression Analysis": return "devicon-r-plain"; // Using R as a placeholder
        case "Statistical Modeling": return "devicon-r-plain"; // Using R as a placeholder
        case "Parse Platform": return "devicon-parse-plain"; // Placeholder, no direct devicon
        case "Node.js": return "devicon-nodejs-plain";
        case "Express.js": return "devicon-express-plain";
        case "Digital Ocean Spaces": return "devicon-digitalocean-plain";
        case "PostgreSQL": return "devicon-postgresql-plain";
        case "Scala": return "devicon-scala-plain";
        case "GraphQL": return "devicon-graphql-plain";
        case "Data Analysis": return "devicon-r-plain"; // Using R as a placeholder
        case "Java": return "devicon-java-plain";
        case "Game Development": return "devicon-unity-plain"; // Using Unity as a placeholder
        case "C (Programming Language)": return "devicon-c-plain";
        case "POS Systems": return "devicon-dot-net-plain"; // Placeholder, no direct devicon
        case "Linear Regression": return "devicon-r-plain"; // Using R as a placeholder
        case "CSV": return "devicon-file-plain"; // Placeholder, no direct devicon

        // Online Profiles
        case "LinkedIn": return "devicon-linkedin-plain";
        case "GitHub": return "devicon-github-plain";
        case "Salesforce Trailblazer": return "devicon-salesforce-plain";
        case "Medium": return "devicon-medium-plain";
        case "X (Twitter)": return "devicon-twitter-plain";
        case "Facebook": return "devicon-facebook-plain";
        case "Instagram": return "devicon-instagram-plain";
        case "YouTube": return "devicon-youtube-plain";
        case "Stack Overflow": return "devicon-stackoverflow-plain";
        case "Dev.to": return "devicon-devicon-plain"; // Dev.to uses the devicon logo itself
        case "Hashnode": return "devicon-hashnode-plain"; // Placeholder, no direct devicon
        case "Personal Website": return "devicon-chrome-plain"; // Generic web icon
        default: return "";
    }
};
