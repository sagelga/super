## Design Context

### Users

**Primary**: Recruiters and HR (quick scanners who need clarity and structure), hiring managers and tech leads (who want to see depth and real work quality), and freelance/consulting clients (who want to trust the person they're hiring). The portfolio must communicate clearly at every level — a recruiter should get the signal in 10 seconds; an engineer should find enough depth to be impressed.

**Context of use**: Desktop-first browsing, likely during work hours. Users arrive with a purpose — they're evaluating whether to reach out, hire, or work with Kunanon.

**Jobs to be done**: Quickly understand who Kunanon is, what he can do, what he has built, and whether he's the right person for the job.

### Brand Personality

**Voice and tone**: Confident without being loud. Creative without being chaotic. Personal and warm — this is a human's portfolio, not a company's landing page.

**Three-word personality**: Creative, Bold, Expressive

**Emotional goals**: Visitors should feel like they've encountered someone distinct — not another generic dev portfolio. The work should feel crafted, not generated. Warmth and personality should come through even in technical sections.

### Color Palette

| Token      | Hex       | Role                                              |
|------------|-----------|---------------------------------------------------|
| Background | `#1A1814` | Warm near-black — dim room, not cold darkness     |
| Surface    | `#252219` | Slightly lifted for cards and sections            |
| Signature  | `#3B4A8C` | Personal indigo — identity elements, primary CTA  |
| Accent     | `#C9943A` | Amber lamp light — highlights, links, hover       |
| Text       | `#F0EAD6` | Cream — softer than white, nothing feels harsh    |
| Muted      | `#9A9485` | Warm gray — captions, dates, secondary info       |

### Aesthetic Direction

**Visual tone**: Artisan / Handcrafted — like a beautifully made physical object. Think aged leather notebooks, warm candlelight, typography from a careful hand. Not sterile or corporate. Not neon-on-dark tech aesthetic. The palette already defines this: rich near-black backgrounds, amber accents, cream text. Execute it with intention.

**Anti-references**:
- Generic developer portfolios with gray backgrounds and Bootstrap cards
- Cyan/purple neon on dark "AI aesthetic"
- Glassmorphism cards with glow borders
- Identical card grids with icon + heading + text repeated endlessly
- Centered hero with gradient text metric displays

**Theme**: Dark mode only. The palette was designed as a cohesive warm dark system.

### Design Principles

1. **Craft over template** — Every section should feel made for this person, not assembled from components. Vary layout patterns, break grids intentionally, use typography with personality.

2. **Amber guides the eye** — Use `#C9943A` sparingly but decisively — like lamplight catching something important. Links, hover states, key labels, active states. Don't diffuse it everywhere.

3. **Warmth in the details** — Spacing, font choices, micro-interactions should feel considered and human. No sharp clinical edges. Prefer generous rhythm over tight efficiency.

4. **Scannable depth** — Parseable at a glance for recruiters, rewarding to linger for engineers. Use visual hierarchy to layer: headline → summary → detail.

5. **Personal, not performative** — Kunanon's personality (travels to Kumamoto, confident humility, creativity) should be woven into the voice and visual texture throughout the interface.

6. **Opacity discipline** — Navigation bars, mobile menus, modal overlays, and interactive UI chrome must use fully opaque or near-opaque backgrounds (≥95% opacity). Gradient overlays sitting on top of text content must maintain readable contrast throughout — avoid `via-transparent` or very-low-opacity mid-stops (`/10`) where text is overlaid. Decorative SVG illustrations, background dot patterns, and fade-edge masks may use transparency freely for artistic effect.

## GitHub PR Convention

All pull request titles must follow Conventional Commits format:

```
<type>(<optional scope>): <lowercase description>
```

**Types**: `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`

**Examples**:
- `feat: add dark mode support`
- `fix(navbar): resolve responsive alignment on mobile`
- `perf: optimize image loading with lazy loading`
- `docs: update setup instructions`

**Guidelines**:
- Use imperative mood ("add", not "added")
- Keep titles under 72 characters
- Start description lowercase after the colon
- Use scope (in parentheses) only when the change affects a specific component or area
