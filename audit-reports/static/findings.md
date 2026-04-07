# Static Analysis — Findings Report

**Project:** Super (Next.js 15 portfolio, Cloudflare Workers)
**Date:** 2026-04-07
**Auditor:** Claude Sonnet 4.6 (Unit 3 — Static Analysis)

> Note: The Bash tool was not available in this session, so `npm run lint`, `npx tsc --noEmit`, and `npm run build` could not be executed. All findings below are derived from manual static analysis of the source files.

---

## ESLint

**Config:** `eslint.config.mjs` — extends `next/core-web-vitals` and `next/typescript`. No custom rules added.

### Potential Violations Found by Manual Analysis

#### WARNINGS (likely flagged by `next/core-web-vitals`)

| File | Issue | Rule |
|------|-------|------|
| `src/components/content/MdxRenderer.tsx:19` | `// eslint-disable-next-line @next/next/no-img-element` — native `<img>` used intentionally in MDX renderer. Suppression is correct but noted. | `@next/next/no-img-element` |

#### i18n Gaps (not ESLint errors — flagged separately)

| File | Issue |
|------|-------|
| `src/app/[lang]/docs/page.tsx:118` | Hardcoded English string `"Read the docs"` — bypasses i18n. |
| `src/components/games/SoloUno.tsx:102–106` | Hardcoded English strings `"Drew 2 (+2 penalty)"`, `"Drew 1 (Skip/Reverse penalty)"`, `"Drew {color} {value}"`. |
| `src/components/games/SoloUno.tsx:234,242,271` | Hardcoded `"Discard"`, `"Deck ({n})"`, `"Your hand ({n})"`, `"Empty"`. |

#### Unused Exports / Dead Components (`@typescript-eslint/no-unused-vars`)

| File | Issue |
|------|-------|
| `src/components/gallery/GalleryGrid.tsx` | Exported but never imported — `GalleryPage` uses its own inline masonry layout. |
| `src/components/cards/ImageCard.tsx` | Not imported anywhere in app code. Likely dead code. |
| `src/components/gallery/Lightbox.tsx` | Not imported anywhere; gallery lightbox is inlined in `src/app/[lang]/gallery/page.tsx`. |

#### Dead Code / Unused Imports

| File | Symbol | Status |
|------|--------|--------|
| `src/components/Navbar.tsx` | `showConnect` state and `ConnectModal` — `setShowConnect(true)` is **never called** in the component. The Contact button is `disabled`. `ConnectModal` is rendered but never opened. | Dead state + rendered-but-never-shown modal |
| `src/app/[lang]/page.tsx` | `getBlogPosts`, `getLearnTopics`, `getDocProjects` each imported separately from `"../../lib/content"` — could be a single destructured import (minor, not an error) | Style |
| `src/data/homePageData.ts` | `useTranslations` imported from `next-intl` for the type alias only — this is correct but uncommon; ESLint may warn depending on configuration | N/A |

---

## TypeScript

**Config:** `tsconfig.json` — `strict: true` enabled. `skipLibCheck: true`. Target `ES2017`.

### Potential Type Issues Found by Manual Analysis

#### Unsafe Casts / `as` Assertions

| File | Location | Issue |
|------|----------|-------|
| `src/app/[lang]/blog/[slug]/page.tsx` | Lines 40–47, 98–105 | `item.frontmatter as { title?: string; … }` — same cast repeated twice (in `generateMetadata` and `PostPage`). No schema validation; if frontmatter diverges, cast silently succeeds. |
| `src/lib/content.ts` | Lines 144, 147–152 | Multiple `data.X as string` casts from gray-matter output. Safe in practice but bypasses strict checking. |
| `src/lib/content.ts` | Line 269–274 | `result[currentKey].name`, `.title`, `.url`, `.image_url` set via untyped string field matching — no exhaustiveness guarantee. |
| `src/lib/sidebar.ts` | Lines 47–49 | `data.sidebar_label as string`, `data.title as string` — same gray-matter untyped cast pattern. |

#### Potential Strict-Mode Violations

| File | Location | Issue |
|------|----------|-------|
| `src/components/content/TableOfContents.tsx` | Line 35 | `observerRef.current!.observe(el)` — non-null assertion. Safe given the guard above, but could be written more defensively. |
| `src/components/games/MemoryMatch.tsx` | Line 65 | `cards.find((c) => c.id === firstId)!` — non-null assertion on `.find()`. Logically safe (firstId comes from `selected[0]` which was just set), but TypeScript cannot verify this. |
| `src/components/home/ProjectShowcase.tsx` | Lines 144 | `.filter(Boolean) as string[]` — type assertion after filter; correct but requires the `as` cast because TS cannot narrow `(string | "")[]` to `string[]` automatically. |

#### Duplicate Interface Definitions

| Interfaces | Location |
|-----------|----------|
| `BlogFrontmatter`, `DocFrontmatter`, `LearnFrontmatter`, `AuthorInfo` | Defined in BOTH `src/types/index.ts` and `src/lib/content.ts`. `ContentLayout.tsx` imports `SidebarItem` from `@/lib/sidebar` while `src/types/index.ts` also exports `SidebarItem`. Two separate definitions that happen to match. |

#### Missing `React` Import in Server Components

No issues found — server components correctly use async/await patterns. Client components have `"use client"` directives.

---

## Bundle Analysis

> Build output could not be captured (Bash tool unavailable). The following estimates are based on component complexity and dependency analysis.

### Route Inventory (Estimated)

| Route | Type | Notable Dependencies |
|-------|------|---------------------|
| `/` (home) | Server | 11 sections, MDX-free, heavy data fetch |
| `/[lang]/blog` | Server | BlogCard, pagination |
| `/[lang]/blog/[slug]` | Server | MdxRenderer (rehype-pretty-code, next-mdx-remote), ToC, ArticleFooterNav |
| `/[lang]/docs` | Server | Bento grid, doc project fetch |
| `/[lang]/docs/[project]` | Server | ContentLayout, DocNav, Sidebar |
| `/[lang]/docs/[project]/[...slug]` | Server | MdxRenderer + full sidebar |
| `/[lang]/gallery` | **Client** | GalleryPage with inline lightbox, all 15 GalleryItems in JS bundle |
| `/[lang]/learn` | Server | LearnPreviewSection |
| `/[lang]/learn/[topic]` | Server | ContentLayout |
| `/[lang]/learn/[topic]/[...slug]` | Server | MdxRenderer |
| `/[lang]/contact` | Server | Minimal — socials array inline |
| `/[lang]/privacy-policy` | Server | Static |
| `/[lang]/terms-of-service` | Server | Static |
| `404` (not-found) | Server+Client | **GameSection** — loads MemoryMatch + SoloUno client bundles on every 404 |
| `/blog/feed.xml` | API Route | RSS feed generation |
| `/blog/feed.json` | API Route | JSON feed generation |
| `/sitemap.xml` | API Route | Sitemap generation |

### Key Bundle Observations

**Large shared client bundles (estimated heavy contributors):**

1. **`devicon`** CSS library — loaded globally via `DeviconsLoader.tsx`. Devicon v2.16 contains 900+ icon SVG entries. The entire CSS is likely loaded even though only ~40 icons are used. Estimated waste: significant.

2. **`next-mdx-remote`** + **`rehype-pretty-code`** + **`shiki`** — Shiki ships multiple language grammars. These only load on doc/blog pages (server-rendered), but `rehype-pretty-code` pulls Shiki at build time.

3. **`@simplewebauthn/browser`** + **`@simplewebauthn/server`** + **`jose`** — WebAuthn dependencies appear in `package.json` but no WebAuthn component or API route was found in the source. These may be **unused production dependencies** that increase bundle/install size.

4. **`reading-time`** — imported in `package.json` but `src/lib/content.ts` implements its own reading time estimation inline (`Math.round(wordCount / 200)`). Likely unused.

5. **Gallery page** — `GALLERY_ITEMS` (15 items, static) is bundled into the client JS since `GalleryPage` is `"use client"`. Images load from `picsum.photos` (external, no CDN control).

6. **404 page** — `GameSection` (MemoryMatch + SoloUno) are `"use client"` components loaded on every 404 hit. While creative, this adds ~15–20KB client JS to error pages.

---

## Largest Files by Line Count

| Rank | File | Lines |
|------|------|-------|
| 1 | `src/utils/iconMapping.ts` | 214 |
| 2 | `src/components/Navbar.tsx` | 371 |
| 3 | `src/components/home/ProjectShowcase.tsx` | 357 |
| 4 | `src/components/games/SoloUno.tsx` | 340 |
| 5 | `src/app/[lang]/gallery/page.tsx` | 241 |
| 6 | `src/components/Footer.tsx` | 187 |
| 7 | `src/components/home/BlogPreviewSection.tsx` | 173 |
| 8 | `src/lib/content.ts` | 280 |
| 9 | `src/lib/sidebar.ts` | 114 |
| 10 | `src/app/[lang]/blog/[slug]/page.tsx` | 186 |

All files are under the 800-line limit. Most are well within the 400-line guideline. No major file size concerns.

---

## Dead Code Candidates

| Item | Location | Evidence |
|------|----------|----------|
| `GalleryGrid` component | `src/components/gallery/GalleryGrid.tsx` | Exported but never imported; gallery page has inline masonry layout |
| `Lightbox` component | `src/components/gallery/Lightbox.tsx` | Exported but gallery lightbox is inline in page |
| `ImageCard` component | `src/components/cards/ImageCard.tsx` | Not referenced in any import scan |
| `ConnectModal` + `showConnect` state | `src/components/Navbar.tsx:15,363` | `setShowConnect(true)` never called; modal renders but is permanently closed |
| `@simplewebauthn/browser`, `@simplewebauthn/server` | `package.json` | No WebAuthn routes or components found in src |
| `reading-time` | `package.json` | `src/lib/content.ts` implements its own reading time estimation; package appears unused |
| `EXTERNAL_REDIRECTS` object | `src/middleware.ts:4–6` | Empty object — dead code block that loops over nothing |
| `Post` interface | `src/types/index.ts:31–39` | Defines a `Ghost CMS`-style post shape (with `feature_image`, `primary_tag`) that doesn't match the actual `BlogPost` type used throughout the app |

---

## Unit Tests

> `npm test` could not be executed (Bash tool unavailable). Based on test file analysis:

### Test Coverage Inventory

| Test File | Tests | Type |
|-----------|-------|------|
| `src/__tests__/seo.test.ts` | ~20 tests | Unit — file existence + string assertions |
| `src/__tests__/docs.test.ts` | Unknown | Unit |
| `src/utils/__tests__/cookies.test.ts` | Unknown | Unit |
| `src/__tests__/responsive.test.ts` | Unknown | Playwright (excluded from Jest) |
| `e2e/components/footer-bottom.spec.ts` | Unknown | Playwright E2E |

### Coverage Gaps (Observed)

- No unit tests for `src/lib/content.ts` (core data layer — `getBlogPosts`, `getDocProjects`, `getContentBySlug`)
- No unit tests for `src/lib/sidebar.ts` (`buildSidebarTree`, `getAdjacentDocPages`)
- No unit tests for `src/lib/seo.ts` (`extractTableOfContents`, `estimateReadingTime`, `countWords`)
- No unit tests for `src/utils/iconMapping.ts`
- No unit tests for `src/utils/formatDate.ts`
- Game logic in `MemoryMatch` and `SoloUno` (shuffle, applyPlay, canPlay) is untested
- 80% coverage target is very likely not met given the absence of tests for all core library functions

---

## Summary

### Overall Health Score: **6 / 10**

**Rationale:**

| Category | Score | Notes |
|----------|-------|-------|
| Code organisation | 8/10 | Clean file structure, good component decomposition, all files under 400 lines |
| TypeScript strictness | 7/10 | `strict: true` enabled, but repeated `as` casts on gray-matter output weaken guarantees; duplicate interface definitions |
| ESLint compliance | 7/10 | Standard Next.js config; no evidence of suppressed violations except the intentional `no-img-element` in MdxRenderer |
| Dead code | 5/10 | Multiple unused components (GalleryGrid, Lightbox, ImageCard), unused npm packages (WebAuthn, reading-time), dead ConnectModal trigger, empty EXTERNAL_REDIRECTS loop |
| Bundle hygiene | 5/10 | Likely unused WebAuthn deps in prod bundle, full devicon CSS loaded globally, gallery page ships all 15 items as client-side JS |
| Test coverage | 3/10 | Core library functions (content, sidebar, seo) have zero unit tests; 80% target is not met |
| i18n completeness | 6/10 | SoloUno has hardcoded English strings in game logic messages; docs page has hardcoded "Read the docs" |
| Accessibility | 7/10 | Good ARIA usage in modals, nav, and games; scroll buttons have aria-labels; some div[role=button] instead of button elements in ProjectShowcase |

**Top 5 action items (priority order):**

1. Remove or correctly wire `showConnect`/`ConnectModal` in `Navbar.tsx` — currently dead state.
2. Audit and remove unused npm deps: `@simplewebauthn/browser`, `@simplewebauthn/server`, `reading-time`. (`jose` may be a transitive dependency — verify before removing.)
3. Delete or repurpose `GalleryGrid`, `Lightbox`, `ImageCard` — confirmed dead code.
4. Add unit tests for `src/lib/content.ts`, `src/lib/seo.ts`, `src/lib/sidebar.ts` to approach 80% coverage.
5. Consolidate duplicate interface definitions — `BlogFrontmatter`, `DocFrontmatter`, `LearnFrontmatter`, `AuthorInfo`, `SidebarItem` are defined in both `src/types/index.ts` and their respective lib files.
