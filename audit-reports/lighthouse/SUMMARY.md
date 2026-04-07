# Lighthouse Audit Summary

Run: 2026-04-07 | Build: production (`npm run build && npm run start`) | localhost:3000

## Scores

| Page | Performance | Accessibility | Best Practices | SEO |
|------|:-----------:|:-------------:|:--------------:|:---:|
| / (home) | 🟡 67 | 🟢 95 | 🟢 100 | 🟡 92 |
| /en/blog | 🟡 78 | 🟢 96 | 🟢 100 | 🟡 92 |
| /en/gallery | 🟡 84 | 🟢 96 | 🟢 100 | 🟡 92 |
| /en/docs | 🟡 87 | 🟢 96 | 🟢 100 | 🟡 91 |
| /en/learn | 🟡 86 | 🟢 96 | 🟢 100 | 🟡 91 |
| /en/contact | 🟡 86 | 🟢 96 | 🟢 100 | 🟡 91 |
| /en/privacy-policy | 🟡 86 | 🟢 96 | 🟢 100 | 🟡 91 |
| /en/terms-of-service | 🟡 86 | 🟢 96 | 🟢 100 | 🟡 91 |

Score legend: 🟢 90–100 | 🟡 50–89 | 🔴 0–49

---

## Critical Issues

### 1. Home LCP: 6.2 s (score 11%) — most urgent
The home page Largest Contentful Paint is 6.2 s, dragging the performance score to 67.
All other pages score 84–87, suggesting the home page has a uniquely heavy payload.

**Likely causes:**
- The home page renders 9+ section components (Hero, About, Skills, Projects, Experience, Certs, Volunteering, Blog preview, Gallery preview, Learn preview) — largest DOM on the site
- Devicons loader (`DeviconsLoader`) may trigger multiple CDN stylesheet requests
- Scroll-reveal animations trigger JS-driven layout changes → contributes to the 6.2 s TTI

**Fix:** Defer below-fold sections with `<Suspense>` or dynamic imports. Add `loading="lazy"` / `fetchpriority="high"` to LCP image candidate.

### 2. CLS: 0.206 on home (threshold: < 0.1)
Layout shift score 0.206 is in the "needs improvement" band.

**Likely causes:**
- Fonts loading asynchronously (IBM Plex Sans Thai, Trirong, Noto Serif SC) shift text
- Scroll-reveal animations animating elements into position count as layout shifts

**Fix:** Use `font-display: optional` or `font-display: swap` with `size-adjust`. Prefer CSS `opacity`/`transform` animations over height/position changes.

### 3. Meta description missing on home page (SEO score 92 → drops to 0 on this audit)
The home page `generateMetadata` was added by this batch but the production build tested here predates it.
After merging sagelga/super#2 the SEO score should reach 100.

### 4. Unused CSS — 820 ms savings (affects ALL pages)
Tailwind generates all utility classes; the production bundle ships unused ones.
This is the single largest performance opportunity across every page.

**Fix:** Enable Tailwind CSS tree-shaking more aggressively, or switch to `@tailwindcss/oxide` (Tailwind v4 native). Also consider splitting the global stylesheet per-route.

---

## Accessibility Issues (all pages)

### Color contrast failures (score 0 — affects ALL pages)
Several text elements use `text-muted/50`, `text-muted/40`, or `text-muted/60` opacity variants which fall below the WCAG AA 4.5:1 ratio on the dark background:

| Element | Contrast | Required |
|---------|----------|----------|
| `text-muted/50 uppercase` (12px) | 2.35:1 | 4.5:1 |
| `text-muted/40` (12px) | 1.97:1 | 4.5:1 |
| `text-muted/60` links (14px) | 2.77:1 | 4.5:1 |
| accent button text on `bg-accent` | 2.24:1 | 4.5:1 |

**Fix:** Replace opacity-based muted text (`text-muted/50`) with a dedicated low-contrast token that still passes WCAG AA. Use `#7a7469` (4.5:1 on `bg-surface`) instead of the current `#605b4f`.

### Heading order failure (home only)
An `<h3>` appears before any `<h1>` or `<h2>` in the page DOM, breaking assistive technology navigation.

**Fix:** Audit the home page section order. ProjectShowcase cards use `<h3>` — ensure a parent `<h2>` section heading precedes them.

---

## Performance Opportunities Summary

| Opportunity | Estimated Savings | Pages Affected |
|-------------|:-----------------:|----------------|
| Reduce unused CSS | ~820 ms | All |
| Defer below-fold JS (home) | ~2–3 s LCP | Home |
| Fix font CLS | ~0.1 CLS points | All |
| Add `fetchpriority="high"` to hero image | ~200 ms LCP | Home |

---

## What's Already Green
- **Best Practices: 100** on every page — no deprecated APIs, no mixed content, HTTPS, no console errors
- **Accessibility: 95–96** — strong ARIA, semantic HTML, good focus management (only contrast/heading order failing)
- **SEO: 91–92** — hreflang, canonical, structured data all present (meta description gap will be fixed by #2)
- **TBT (Total Blocking Time): 30 ms** — excellent, well below 200 ms threshold
- **FCP: 1.7 s** — fast first paint on all pages

HTML reports available in `audit-reports/lighthouse/*.report.html` for full detail.
