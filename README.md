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
    - [App Structure](#app-structure)
    - [Components Structure](#components-structure)
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
- **Cookie Consent:** GDPR-compliant cookie consent banner and settings modal.
- **Responsive Design:** The application is designed to be responsive and work on different screen sizes.
- **Support for Internationalization:** Available in English, Thai, and Chinese.
- **Learn:** A section for connecting about programming language learning services.
- **Learning Resources:** Programming exercises and educational content.

## Requirements

- [Node.js](https://nodejs.org/en/) (v18.17 or later)
- [Yarn](https://yarnpkg.com/)
- Cloudflare Worker
- An instance of the `superbrain` API running and accessible.

## Technologies Used

- **Framework:** [Next.js](https://nextjs.org) (v15.3.5)
- **UI Library:** [React](https://react.dev/) (v19.0.0)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.1.18)
- **Language:** [TypeScript](https://www.typescriptlang.org/) (v5.9.3)
- **Internationalization:** [next-intl](https://next-intl.dev/) (v4.3.4)
- **Deployment:** Cloudflare Workers via [OpenNext.js](https://open-next.js.org/)

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

You can start editing the page by modifying `src/app/[lang]/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

- `NEXT_PUBLIC_SUPERBRAIN_API_URL`

You can use the `.env.example` file as a template.

## API Integration

This website connects to a custom API named `superbrain`. Ensure your `superbrain` API is running and accessible for full functionality. You may need to configure environment variables (e.g., `NEXT_PUBLIC_SUPERBRAIN_API_URL`) to point to your API endpoint.

## Project Structure

The `src` directory is organized as follows:

### App Structure

- **`src/app/`**: Contains all route segments and pages for the Next.js App Router.
    - `[lang]/`: Dynamic route segment for internationalization, containing locale-specific pages.
        - `page.tsx`: Home page.
        - `blog/`: Blog pages and their dynamic routes.
            - `page.tsx`: Blog listing page.
            - `[slug]/`: Individual blog post pages.
                - `page.tsx`: Blog post page.
        - `docs/`: Documentation pages and their dynamic routes.
            - `page.tsx`: Documentation listing page.
        - `gallery/`: Image gallery pages.
            - `page.tsx`: Gallery page.
        - `learn/`: Learning-related pages.
            - `page.tsx`: Learn page.
    - `home/`: Home page section pages.
        - `certifications/`: Certifications section page.
        - `experience/`: Experience section page.
        - `projects/`: Projects section page.
        - `volunteering/`: Volunteering section page.
    - `privacy-policy/`: Privacy policy page.
    - `terms-of-service/`: Terms of service page.
    - `globals.css`: Global styles and Tailwind CSS imports.
    - `layout.tsx`: Root layout for the application.
    - `middleware.ts`: Next.js middleware for internationalization routing.

- **`src/i18n.ts`**: Internationalization configuration for `next-intl`.

### Components Structure

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
    - **`common/`**: Reusable components shared across different sections.
        - `BulletPoint.tsx`: A component for bullet points.
        - `ExternalLinkIcon.tsx`: An icon component for external links.
        - `ImageWithFallback.tsx`: An image component with fallback support.
        - `Section.tsx`: A reusable component for consistent section layout with a title and content area.
    - **`cookies/`**: Components for cookie consent management.
        - `CookieConsentBanner.tsx`: The cookie consent banner component.
        - `CookieSettingsModal.tsx`: The cookie settings modal component.
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
    - **`ui/`**: Base UI components.
        - `BaseCard.tsx`: A base card component.
        - `Button.tsx`: A button component.
        - `ImageWithLoading.tsx`: An image component with loading state.
        - `index.ts`: Exports all UI components.
    - `Breadcrumb.tsx`: A navigation breadcrumb component.
    - `Footer.tsx`: The main footer component.
    - `Layout.tsx`: The main layout component for the application.
    - `Navbar.tsx`: The main navigation bar component.

### Data Structure

- **`src/config/`**: Configuration files for the application.
    - `site.ts`: Site-wide configuration.
    - `swiper.ts`: Swiper.js configuration.

- **`src/data/`**: Data definitions and retrieval.
    - `homePageData.ts`: Centralizes data definitions and retrieval for the home page, leveraging i18n for translated content.

- **`src/locales/`**: Translation files for internationalization, organized by language.
    - `en/`: English translations.
    - `th/`: Thai translations.
    - `zh/`: Chinese translations.
    - Each language folder contains JSON files for different sections (common, cookies, docs, home, learn, metadata, privacy-policy, terms-of-service).

### Types Structure

- **`src/types/`**: TypeScript type definitions.
    - `blog.d.ts`: Type definitions for blog-related data.
    - `common.ts`: Common type definitions.
    - `cookies.ts`: Cookie-related type definitions.
    - `home.ts`: Home page type definitions.
    - `i18n.d.ts`: Internationalization type definitions.
    - `navigation.ts`: Navigation-related type definitions.

### Utilities Structure

- **`src/utils/`**: General utility functions.
    - `cookies.ts`: Cookie utility functions.
    - `formatDate.ts`: Date formatting utilities.
    - `generateSlug.ts`: Slug generation utilities.
    - `iconMapping.ts`: Maps icon names to their respective classes or paths.
    - `__tests__/`: Test files for utilities.

### Hooks Structure

- **`src/hooks/`**: Custom React hooks.
    - `useImageLoader.ts`: Hook for image loading management.
    - `useScrollReveal.ts`: Hook for scroll reveal animations.
    - `useScrollToTop.ts`: Hook for scroll-to-top functionality.

### Styles Structure

- **`src/styles/`**: Style files.
    - `design-tokens.css`: CSS design tokens for theming.

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
- [next-intl Documentation](https://next-intl.dev/docs/environments/core-library#non-react-apps)
- [Cloudflare Workers + Next.js](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deployment

This project uses Cloudflare Workers for deployment via OpenNext.js.

### Deploy to Cloudflare

```bash
yarn deploy
```

This command builds the Next.js application and deploys it to Cloudflare Workers.

For more details, refer to:
- [Cloudflare Workers Next.js Guidelines](https://developers.cloudflare.com/workers/framework-guides/web-apps/nextjs/)
- [OpenNext.js Documentation](https://open-next.js.org/)

### Configuration Files

- **`open-next.config.ts`**: Configuration for OpenNext.js Cloudflare adapter.
- **`wrangler.jsonc`**: Cloudflare Wrangler configuration for deployment.
