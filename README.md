# Super Front-end

A comprehensive Next.js project featuring a blog, documentation, image gallery, and a personal portfolio. This application is designed to be responsive and highly modular, built with modern web technologies.

This project is built with [Next.js](https://nextjs.org) and [React](https://react.dev/). It uses [Tailwind CSS](https://tailwindcss.com/) for styling and is written in [TypeScript](https://www.typescriptlang.org/). The design is modular, with components organized by feature.

## Family of Super

- Super - Frontend, written with NextJS and Typescript
- Superbrain - Backend, writtten with Hono and OpenAPI standards. Connect to Cloudflare D1 database
- Supereye - Fetching machine, written with Hono and retrieves change from Notion and store it in Cloudflare D1 database.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Requirements](#requirements)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Running the Development Server](#running-the-development-server)
    - [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Project Structure](#project-structure)
    - [React Components Structure](#react-components-structure)
    - [Data Structure](#data-structure)
    - [Internationalization (i18n)](#internationalization-i18n)
- [Testing](#testing)
- [Contributing](#contributing)
- [Learn More](#learn-more)
- [Deployment](#deployment)

## Features

- Unified website for sagelga.com
- **Blog:** A full-featured blog with post filtering, table of contents, and a grid layout.
- **Documentation:** A section for project documentation with a sidebar for navigation.
- **Gallery:** An image gallery with a lightbox for viewing images.
- **Portfolio:** A personal portfolio showcasing projects, skills, experience, and certifications.
- **Responsive Design:** The application is designed to be responsive and work on different screen sizes.
- **Support for Internationalization**
- Learn, for connecting me about learning programming langauge service
- Learning resources with programming exercise

## Requirements

- [Node.js](https://nodejs.org/en/) (v18.17 or later)
- [Yarn](https://yarnpkg.com/)
- Cloudflare Worker
- An instance of the `superbrain` API running and accessible.

## Getting Started

### Installation

First, install the project dependencies:

```bash
yarn install
```

### Running the Development Server

To start the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

- `NEXT_PUBLIC_SUPERBRAIN_API_URL`

You can use the `.env.example` file as a template.

## API Integration

This website connects to a custom API named `superbrain`. Ensure your `superbrain` API is running and accessible for full functionality. You may need to configure environment variables (e.g., `NEXT_PUBLIC_SUPERBRAIN_API_URL`) to point to your API endpoint.

## Project Structure

The `src` directory is organized as follows:

- **`src/app/`**: Contains all route segments and pages for the Next.js App Router.
    - `[lang]/`: Dynamic route segment for internationalization, containing locale-specific pages.
    - `api/`: API routes.
    - `blog/`: Blog pages and their dynamic routes.
    - `docs/`: Documentation pages and their dynamic routes.
    - `gallery/`: Image gallery pages.
    - `home/`: Home page sections.
    - `learn/`: Learning-related pages.
    - `privacy-policy/`: Privacy policy page.
    - `terms-of-service/`: Terms of service page.
    - `globals.css`: Global styles.
    - `layout.tsx`: Root layout for the application.
    - `not-found.tsx`: Custom 404 page.
    - `page.tsx`: Main home page.
    - `sitemap.ts`: Sitemap generation.

- **`src/components/`**: Reusable React components, organized by feature or type.
    - **`blog/`**: Components related to the blog section.
        - `FilterBar.tsx`: A component to filter blog posts.
        - `PostContent.tsx`: Renders the content of a blog post.
        - `PostGrid.tsx`: A grid layout for displaying blog posts.
        - `PostHeader.tsx`: The header section for a blog post.
        - `TableOfContents.tsx`: A table of contents for a blog post.
    - **`cards/`**: Reusable card components for displaying content.
        - `BlogPostCard.tsx`: A card for displaying a blog post preview.
        - `DocsProjectCard.tsx`: A card for displaying a documentation project.
        - `ImageCard.tsx`: A card for displaying an image.
        - `ProjectCard.tsx`: A card for displaying a project.
    - **`docs/`**: Components specific to the documentation pages.
        - `DocsContent.tsx`: Renders the content of a documentation page.
        - `DocsLayout.tsx`: The layout for documentation pages.
        - `DocsProjectGrid.tsx`: A grid layout for displaying documentation projects.
        - `DocsSidebar.tsx`: The sidebar for documentation pages.
    - **`gallery/`**: Components for the image gallery.
        - `GalleryGrid.tsx`: A grid layout for the gallery.
        - `Lightbox.tsx`: A lightbox for viewing images.
    - **`home/`**: Components used on the home page.
        - `AboutMe.tsx`: The "About Me" section.
        - `CertificationsSection.tsx`: The "Certifications" section.
        - `ExperienceSection.tsx`: The "Experience" section.
        - `HeroSection.tsx`: The hero section of the home page.
        - `LanguagesSection.tsx`: The "Languages" section.
        - `ProjectShowcase.tsx`: A showcase of projects.
        - `SkillsList.tsx`: A list of skills.
        - `VolunteeringSection.tsx`: The "Volunteering" section.
    - **`common/`**: Reusable components shared across different sections.
        - `Section.tsx`: A reusable component for consistent section layout with a title and content area.
    - `Breadcrumb.tsx`: A navigation breadcrumb component.
    - `Footer.tsx`: The main footer component.
    - `Layout.tsx`: The main layout component for the application.
    - `Navbar.tsx`: The main navigation bar component.

- **`src/config/`**: Configuration files for the application.
    - `site.ts`: Site-wide configuration.

- **`src/data/`**: Data definitions and retrieval.
    - `homePageData.ts`: Centralizes data definitions and retrieval for the home page, leveraging i18n for translated content.

- **`src/lib/`**: Utility functions and helper modules.

- **`src/locales/`**: Translation files for internationalization, organized by language.

- **`src/types/`**: TypeScript type definitions.
    - `blog.d.ts`: Type definitions for blog-related data.

- **`src/utils/`**: General utility functions.
    - `iconMapping.ts`: Maps icon names to their respective classes or paths.

- **`src/i18n.ts`**: Internationalization configuration for `next-intl`.

- **`src/middleware.ts`**: Next.js middleware for request handling.


## Testing

To run the tests, use the following command:

```bash
yarn test
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature/your-feature`).
6. Open a pull request.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- https://next-intl.dev/docs/environments/core-library#non-react-apps

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

Also, refer to the Cloudflare Next.js framework guidelines: [https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
