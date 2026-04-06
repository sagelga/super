## Brief overview

Project-specific guidelines for Kunanon's portfolio website. A Next.js multilingual portfolio with warm dark theme, TypeScript, and artisan aesthetic.

## Development workflow

- Develop features in small chunks (one component at a time)
- Run build after each component completion. DO NOT run dev server
- After task completion: create test cases → run tests → run build → fix until both pass
- E2E tests use Playwright in `/e2e/` directory

## Tech stack

- **Framework**: Next.js with App Router
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + custom CSS for complex components
- **i18n**: next-intl with locales in `/src/locales/` (en, th, zh)
- **Testing**: Playwright for E2E, Vitest/Jest for unit tests
- **Linting**: ESLint + Prettier

## Design system

- **Theme**: Dark mode only, warm near-black background (#1A1814)
- **Signature color**: Indigo (#3B4A8C) for identity/primary actions
- **Accent color**: Amber (#C9943A) for highlights, links, hover states — use sparingly
- **Text**: Cream (#F0EAD6), Muted (#9A9485) for secondary info
- **Aesthetic**: Artisan/handcrafted — like aged leather, warm candlelight. NOT sterile or neon-on-dark

## Component structure

- Page components in `/src/app/[lang]/`
- Shared components in `/src/components/`
- Organized by feature: `blog/`, `home/`, `docs/`, `gallery/`, `cookies/`, `ui/`
- Common UI primitives in `/src/components/ui/`
- All components should be `.tsx` files

## Naming conventions

- Components: PascalCase (e.g., `HeroSection.tsx`)
- Functions/hooks: camelCase with descriptive names
- CSS files: kebab-case (e.g., `footer.style.css`)
- Use `use` prefix for hooks (e.g., `useScrollReveal`)

## i18n

- All user-facing strings in `/src/locales/{lang}/` JSON files
- Supported languages: English (en), Thai (th), Chinese (zh)
- Use `t()` function from next-intl for translations
- Metadata and page content should be localized
