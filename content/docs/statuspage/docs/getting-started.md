---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v20 or later
- npm

## Installation

```bash
git clone https://github.com/sagelga/statuspage.git
cd statuspage
npm install
```

## Local Development

```bash
npm run dev
```

Opens `http://localhost:3000`.

## Build

```bash
npm run build
```

## Production Server

```bash
npm run start
```

## Linting

```bash
npm run lint
```

## Deployment

### Cloudflare Pages

```bash
npm run deploy
```

This runs `@cloudflare/next-on-pages` to build and then deploys via Wrangler.

## Configuration

Edit `src/config.ts` to customize monitored services and thresholds:

```typescript
export const SERVICES: ServiceDefinition[] = [
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    icon: 'shield',
    url: 'https://www.cloudflarestatus.com/api/v2/status.json',
    jsonStatus: { /* field mapping */ }
  },
  // Add more services...
];

export const TIMEOUT_MS = 5000;
export const DEGRADED_THRESHOLD_MS = 1500;
```

## Project Structure

```
src/
  app/                  # Next.js App Router
    api/status/         # Status API endpoint
    api/minutes/        # Minute-level history API
    layout.tsx
    page.tsx
  components/           # Navbar, Hero, ServiceList, IncidentHistory, Footer
  config.ts             # Service definitions and thresholds
  types.ts              # TypeScript definitions
```
