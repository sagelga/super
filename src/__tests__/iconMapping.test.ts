import { getIconClass } from '@/utils/iconMapping';

describe('getIconClass', () => {
    describe('programming languages', () => {
        it('returns correct class for JavaScript', () => {
            expect(getIconClass('JavaScript')).toBe('devicon-javascript-plain');
        });

        it('returns correct class for TypeScript', () => {
            expect(getIconClass('TypeScript')).toBe('devicon-typescript-plain');
        });

        it('returns correct class for Python', () => {
            expect(getIconClass('Python')).toBe('devicon-python-plain');
        });

        it('returns correct class for Java', () => {
            expect(getIconClass('Java')).toBe('devicon-java-plain');
        });

        it('returns correct class for Scala', () => {
            expect(getIconClass('Scala')).toBe('devicon-scala-plain');
        });

        it('returns correct class for GraphQL', () => {
            expect(getIconClass('GraphQL')).toBe('devicon-graphql-plain');
        });

        it('returns correct class for C', () => {
            expect(getIconClass('C (Programming Language)')).toBe('devicon-c-plain');
        });

        it('returns correct class for Oracle PL/SQL', () => {
            expect(getIconClass('Oracle PL/SQL')).toBe('devicon-oracle-plain');
        });
    });

    describe('web technologies', () => {
        it('returns correct class for HTML', () => {
            expect(getIconClass('HTML')).toBe('devicon-html5-plain');
        });

        it('returns correct class for CSS', () => {
            expect(getIconClass('CSS')).toBe('devicon-css3-plain');
        });

        it('returns correct class for React', () => {
            expect(getIconClass('React')).toBe('devicon-react-plain');
        });

        it('returns correct class for Vue', () => {
            expect(getIconClass('Vue')).toBe('devicon-vuejs-plain');
        });

        it('returns correct class for Next.js', () => {
            expect(getIconClass('Next.js')).toBe('devicon-nextjs-plain');
        });

        it('returns correct class for Node.js', () => {
            expect(getIconClass('Node.js')).toBe('devicon-nodejs-plain');
        });

        it('returns correct class for Express.js', () => {
            expect(getIconClass('Express.js')).toBe('devicon-express-plain');
        });

        it('returns correct class for WordPress', () => {
            expect(getIconClass('WordPress')).toBe('devicon-wordpress-plain');
        });

        it('returns correct class for Docusaurus', () => {
            expect(getIconClass('Docusaurus')).toBe('devicon-docusaurus-plain');
        });
    });

    describe('databases', () => {
        it('returns correct class for MySQL', () => {
            expect(getIconClass('MySQL')).toBe('devicon-mysql-plain');
        });

        it('returns correct class for PostgreSQL', () => {
            expect(getIconClass('PostgreSQL')).toBe('devicon-postgresql-plain');
        });

        it('returns correct class for MongoDB (NoSQL)', () => {
            expect(getIconClass('NoSQL (MongoDB)')).toBe('devicon-mongodb-plain');
        });

        it('returns correct class for Oracle SQL', () => {
            expect(getIconClass('Oracle SQL')).toBe('devicon-oracle-plain');
        });

        it('returns correct class for Microsoft T-SQL', () => {
            expect(getIconClass('Microsoft T-SQL')).toBe('devicon-microsoftsqlserver-plain');
        });

        it('returns correct class for SQL combo string', () => {
            expect(getIconClass('SQL (MySQL, PostgreSQL, Oracle SQL, Microsoft T-SQL)')).toBe('devicon-sqldeveloper-plain');
        });
    });

    describe('cloud and devops', () => {
        it('returns correct class for Docker', () => {
            expect(getIconClass('Docker')).toBe('devicon-docker-plain');
        });

        it('returns correct class for Git', () => {
            expect(getIconClass('Git')).toBe('devicon-git-plain');
        });

        it('returns correct class for GitHub Actions', () => {
            expect(getIconClass('GitHub Actions')).toBe('devicon-githubactions-plain');
        });

        it('returns correct class for CircleCI', () => {
            expect(getIconClass('CircleCI')).toBe('devicon-circleci-plain');
        });

        it('returns correct class for Travis CI', () => {
            expect(getIconClass('Travis CI')).toBe('devicon-travisci-plain');
        });

        it('returns correct class for Cloudflare', () => {
            expect(getIconClass('Cloudflare')).toBe('devicon-cloudflare-plain');
        });

        it('returns correct class for Cloudflare Pages', () => {
            expect(getIconClass('Cloudflare Pages')).toBe('devicon-cloudflare-plain');
        });

        it('returns correct class for CloudFlare Pages (variant)', () => {
            expect(getIconClass('CloudFlare Pages')).toBe('devicon-cloudflare-plain');
        });

        it('returns correct class for Cloudflare Worker', () => {
            expect(getIconClass('Cloudflare Worker')).toBe('devicon-cloudflare-plain');
        });

        it('returns correct class for Amazon Web Services', () => {
            expect(getIconClass('Amazon Web Services (AWS)')).toBe('devicon-amazonwebservices-plain');
        });

        it('returns correct class for Digital Ocean Spaces', () => {
            expect(getIconClass('Digital Ocean Spaces')).toBe('devicon-digitalocean-plain');
        });

        it('returns correct class for CI/CD Tools', () => {
            expect(getIconClass('CI/CD Tools (GitHub Actions, CircleCI, Travis CI, CloudFlare Pages)')).toBe('devicon-jenkins-plain');
        });
    });

    describe('salesforce', () => {
        it('returns correct class for Salesforce Apex', () => {
            expect(getIconClass('Salesforce Apex')).toBe('devicon-salesforce-plain');
        });

        it('returns correct class for Salesforce SOQL', () => {
            expect(getIconClass('Salesforce SOQL')).toBe('devicon-salesforce-plain');
        });

        it('returns correct class for Salesforce CRM', () => {
            expect(getIconClass('Salesforce CRM (SFDC)')).toBe('devicon-salesforce-plain');
        });

        it('returns correct class for Salesforce Marketing Cloud', () => {
            expect(getIconClass('Salesforce Marketing Cloud (SFMC)')).toBe('devicon-salesforce-plain');
        });

        it('returns correct class for Salesforce Trailblazer', () => {
            expect(getIconClass('Salesforce Trailblazer')).toBe('devicon-salesforce-plain');
        });
    });

    describe('tools and platforms', () => {
        it('returns correct class for Figma', () => {
            expect(getIconClass('Figma')).toBe('devicon-figma-plain');
        });

        it('returns correct class for Jira', () => {
            expect(getIconClass('Jira')).toBe('devicon-jira-plain');
        });

        it('returns correct class for GitHub', () => {
            expect(getIconClass('GitHub')).toBe('devicon-github-plain');
        });

        it('returns correct class for Notion', () => {
            expect(getIconClass('Notion')).toBe('devicon-notion-plain');
        });

        it('returns correct class for Notion API', () => {
            expect(getIconClass('Notion API')).toBe('devicon-notion-plain');
        });

        it('returns correct class for Postman', () => {
            expect(getIconClass('Postman')).toBe('devicon-postman-plain');
        });

        it('returns correct class for Visual Studio Code', () => {
            expect(getIconClass('Visual Studio Code')).toBe('devicon-vscode-plain');
        });

        it('returns correct class for Jupyter Notebook', () => {
            expect(getIconClass('Jupyter Notebook')).toBe('devicon-jupyter-plain');
        });

        it('returns correct class for DataGrip', () => {
            expect(getIconClass('DataGrip')).toBe('devicon-datagrip-plain');
        });

        it('returns correct class for Cloudinary', () => {
            expect(getIconClass('Cloudinary')).toBe('devicon-cloudinary-plain');
        });

        it('returns correct class for Netlify', () => {
            expect(getIconClass('Netlify')).toBe('devicon-netlify-plain');
        });

        it('returns correct class for Algolia', () => {
            expect(getIconClass('Algolia')).toBe('devicon-algolia-plain');
        });

        it('returns correct class for Hotjar', () => {
            expect(getIconClass('Hotjar')).toBe('devicon-hotjar-plain');
        });

        it('returns correct class for Canva', () => {
            expect(getIconClass('Canva')).toBe('devicon-canva-plain');
        });

        it('returns correct class for Ahrefs', () => {
            expect(getIconClass('Ahrefs')).toBe('devicon-ahrefs-plain');
        });

        it('returns correct class for Duolingo', () => {
            expect(getIconClass('Duolingo')).toBe('devicon-duolingo-plain');
        });
    });

    describe('AI and analytics', () => {
        it('returns correct class for ChatGPT', () => {
            expect(getIconClass('ChatGPT')).toBe('devicon-openai-plain');
        });

        it('returns correct class for DALL·E', () => {
            expect(getIconClass('DALL·E')).toBe('devicon-openai-plain');
        });

        it('returns correct class for Google Analytics', () => {
            expect(getIconClass('Google Analytics')).toBe('devicon-google-plain');
        });

        it('returns correct class for Google Search Console', () => {
            expect(getIconClass('Google Search Console')).toBe('devicon-google-plain');
        });

        it('returns correct class for Bing Webmaster Tools', () => {
            expect(getIconClass('Bing Webmaster Tools')).toBe('devicon-microsoft-plain');
        });

        it('returns correct class for Meta Business Suite', () => {
            expect(getIconClass('Meta Business Suite')).toBe('devicon-facebook-plain');
        });

        it('returns correct class for Gemini API', () => {
            expect(getIconClass('Gemini API')).toBe('devicon-google-plain');
        });

        it('returns correct class for Google Apps Script', () => {
            expect(getIconClass('Google Apps Script')).toBe('devicon-google-plain');
        });

        it('returns correct class for Google Forms', () => {
            expect(getIconClass('Google Forms')).toBe('devicon-google-plain');
        });
    });

    describe('productivity and automation', () => {
        it('returns correct class for Webhook', () => {
            expect(getIconClass('Webhook')).toBe('devicon-webhooks-plain');
        });

        it('returns correct class for Todoist API', () => {
            expect(getIconClass('Todoist API')).toBe('devicon-todoist-plain');
        });

        it('returns correct class for API Integration', () => {
            expect(getIconClass('API Integration')).toBe('devicon-rest-plain');
        });

        it('returns correct class for Code Generation', () => {
            expect(getIconClass('Code Generation')).toBe('devicon-github-plain');
        });

        it('returns correct class for Workflow Automation', () => {
            expect(getIconClass('Workflow Automation')).toBe('devicon-jira-plain');
        });

        it('returns correct class for Microsoft Office', () => {
            expect(getIconClass('Microsoft Office')).toBe('devicon-microsoft-plain');
        });
    });

    describe('data and analytics', () => {
        it('returns correct class for IBM SPSS Statistics', () => {
            expect(getIconClass('IBM SPSS Statistics')).toBe('devicon-ibm-plain');
        });

        it('returns correct class for Regression Analysis', () => {
            expect(getIconClass('Regression Analysis')).toBe('devicon-r-plain');
        });

        it('returns correct class for Statistical Modeling', () => {
            expect(getIconClass('Statistical Modeling')).toBe('devicon-r-plain');
        });

        it('returns correct class for Data Analysis', () => {
            expect(getIconClass('Data Analysis')).toBe('devicon-r-plain');
        });

        it('returns correct class for Linear Regression', () => {
            expect(getIconClass('Linear Regression')).toBe('devicon-r-plain');
        });

        it('returns correct class for Data Quality', () => {
            expect(getIconClass('Data Quality')).toBe('devicon-postgresql-plain');
        });

        it('returns correct class for Data Normalization', () => {
            expect(getIconClass('Data Normalization')).toBe('devicon-postgresql-plain');
        });

        it('returns correct class for CSV', () => {
            expect(getIconClass('CSV')).toBe('devicon-file-plain');
        });
    });

    describe('enterprise systems', () => {
        it('returns correct class for Oracle ERP', () => {
            expect(getIconClass('Oracle ERP')).toBe('devicon-oracle-plain');
        });

        it('returns correct class for Parse Platform', () => {
            expect(getIconClass('Parse Platform')).toBe('devicon-parse-plain');
        });

        it('returns correct class for POS Systems', () => {
            expect(getIconClass('POS Systems')).toBe('devicon-dot-net-plain');
        });
    });

    describe('content and publishing', () => {
        it('returns correct class for Documentation', () => {
            expect(getIconClass('Documentation')).toBe('devicon-markdown-plain');
        });

        it('returns correct class for SEO', () => {
            expect(getIconClass('SEO')).toBe('devicon-google-plain');
        });

        it('returns correct class for Content Monetization', () => {
            expect(getIconClass('Content Monetization')).toBe('devicon-dollar-plain');
        });

        it('returns correct class for Content Creation', () => {
            expect(getIconClass('Content Creation')).toBe('devicon-wordpress-plain');
        });

        it('returns correct class for Publishing', () => {
            expect(getIconClass('Publishing')).toBe('devicon-wordpress-plain');
        });
    });

    describe('cloud storage', () => {
        it('returns correct class for Cloudflare D2', () => {
            expect(getIconClass('Cloudflare D2')).toBe('devicon-cloudflare-plain');
        });

        it('returns correct class for Serverless Database', () => {
            expect(getIconClass('Serverless Database')).toBe('devicon-amazonwebservices-plain');
        });
    });

    describe('game development', () => {
        it('returns correct class for Game Development', () => {
            expect(getIconClass('Game Development')).toBe('devicon-unity-plain');
        });
    });

    describe('social platforms', () => {
        it('returns correct class for LinkedIn', () => {
            expect(getIconClass('LinkedIn')).toBe('devicon-linkedin-plain');
        });

        it('returns correct class for Medium', () => {
            expect(getIconClass('Medium')).toBe('devicon-medium-plain');
        });

        it('returns correct class for X (Twitter)', () => {
            expect(getIconClass('X (Twitter)')).toBe('devicon-twitter-plain');
        });

        it('returns correct class for Facebook', () => {
            expect(getIconClass('Facebook')).toBe('devicon-facebook-plain');
        });

        it('returns correct class for Instagram', () => {
            expect(getIconClass('Instagram')).toBe('devicon-instagram-plain');
        });

        it('returns correct class for YouTube', () => {
            expect(getIconClass('YouTube')).toBe('devicon-youtube-plain');
        });

        it('returns correct class for Stack Overflow', () => {
            expect(getIconClass('Stack Overflow')).toBe('devicon-stackoverflow-plain');
        });

        it('returns correct class for Dev.to', () => {
            expect(getIconClass('Dev.to')).toBe('devicon-devicon-plain');
        });

        it('returns correct class for Hashnode', () => {
            expect(getIconClass('Hashnode')).toBe('devicon-hashnode-plain');
        });

        it('returns correct class for Personal Website', () => {
            expect(getIconClass('Personal Website')).toBe('devicon-chrome-plain');
        });
    });

    describe('unknown names', () => {
        it('returns empty string for unknown skill names', () => {
            expect(getIconClass('Unknown Skill')).toBe('');
        });

        it('returns empty string for Perplexity (no direct icon)', () => {
            expect(getIconClass('Perplexity')).toBe('');
        });

        it('returns empty string for empty string input', () => {
            expect(getIconClass('')).toBe('');
        });
    });
});
