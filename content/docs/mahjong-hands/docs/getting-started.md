---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm

## Installation

```bash
git clone https://github.com/sagelga/mahjong-hands.git
cd mahjong-hands
npm install
```

## Local Development

```bash
npm run dev
```

Opens a local dev server via Vite with hot module replacement.

## Build

```bash
npm run build
```

Runs TypeScript compilation followed by a Vite production build.

## Preview

```bash
npm run preview
```

Serves the production build locally.

## Testing

```bash
npm run test
```

Runs the Jest test suite with jsdom environment and Testing Library.

## Linting

```bash
npm run lint
```

## Project Structure

```
src/
  components/      # React components with co-located CSS
  hooks/           # Custom hooks (useComboGroups)
  lib/             # Core logic: validator, comboDetector, tiles
  styles/          # Design tokens, base styles, layout
  assets/tiles/    # Optimized Mahjong tile SVGs
```

## Deployment

The site deploys to Cloudflare Workers. A `wrangler.json` configuration is included in the repository.
