# AGENTS.md

## Project Overview

Next.js 15 (App Router) + TypeScript portfolio site for sagelga.com, deployed to Cloudflare Workers via OpenNext.js. Thai (`th`) is the default locale; also supports `en` and `zh`.

## Key Commands

```bash
yarn dev              # Dev server with turbopack
yarn build            # Next.js build only
yarn deploy           # Next.js build + OpenNext build + wrangler deploy

yarn lint             # ESLint src/
yarn test             # Jest unit tests
yarn test:watch       # Jest watch mode
yarn test:e2e         # Playwright all browsers
yarn test:e2e:chromium # Playwright chromium only
```

## CI Check Order (pr-check.yml)

lint → typecheck → unit-tests → build → e2e-tests

- **typecheck**: `npx tsc --noEmit`
- **unit-tests**: `npm test -- --ci --coverage` (80% coverage threshold)
- **e2e-tests**: Requires local D1 migrations before running

## Architecture Notes

- **i18n routing**: Middleware strips locale prefix (`/en/blog` → `/blog`). Thai is default. Home sub-pages (`/home/*`) bypass i18n middleware entirely.
- **Path alias**: `@/*` maps to `src/*`
- **API dependency**: Requires `NEXT_PUBLIC_SUPERBRAIN_API_URL` env var pointing to `superbrain-v2` service
- **Cloudflare infra**: R2 bucket (`super-cache`), D1 databases (`super-auth`, `super-content`), KV namespace (`SUPER_CACHE`)

## Testing Quirks

- Jest ignores `src/__tests__/responsive.test.ts` (Playwright-only)
- Playwright e2e tests run against 5 browser configs (chromium, firefox, webkit, Mobile Chrome, Mobile Safari)
- E2E CI job applies local D1 migrations before running:
  ```bash
  npx wrangler d1 execute super-content --local --file migrations/001_content.sql
  npx wrangler d1 execute super-auth --local --command "SELECT 1"
  ```

## Override

- `@swc/helpers` pinned to `0.5.21` in `package.json` overrides

## Related Docs

- Design context, brand palette, and PR conventions: `CLAUDE.md`
- Cloudflare config: `wrangler.jsonc`, `open-next.config.ts`

## Change Log

- [2026-11-15] [fix] Unblocked E2E CI on ubuntu-24.04, replaced the networkidle wait helper, pre-seeded cookie consent in the navigation spec, ignored build output in test discovery — files: .github/workflows/pr-check.yml, playwright.config.ts, e2e/utils/test-helpers.ts, e2e/components/navigation.spec.ts
- [2026-11-15] [fix] Replaced the broken bundle-size analyzer with a Turbopack-compatible action and added a main-branch baseline — files: .github/workflows/bundle-size.yml
- [2026-11-15] [fix] Bumped next to 16.4.6 and @simplewebauthn/server to 13.3.3, audited production deps only — files: .github/workflows/security.yml, package.json, package-lock.json
- [2026-11-15] [chore] Committed the Next 16 generated tsconfig defaults — files: tsconfig.json
- [2026-11-15] [fix] Scoped the reading-progress spec to a dedicated class, made the width test wait for scroll, and made the cookie banner check auto-retry — files: src/components/NavbarReadingProgress.tsx, e2e/components/reading-progress.spec.ts, e2e/components/cookie-consent.spec.ts
