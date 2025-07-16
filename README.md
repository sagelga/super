This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## API Integration

This website connects to a custom API named `superbrain`. Ensure your `superbrain` API is running and accessible for full functionality. You may need to configure environment variables (e.g., `NEXT_PUBLIC_SUPERBRAIN_API_URL`) to point to your API endpoint.

## React Components Structure

The `src/components` directory is organized as follows:

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
- **`Footer.tsx`**: The main footer component.
- **`Layout.tsx`**: The main layout component for the application.
- **`Navbar.tsx`**: The main navigation bar component.
