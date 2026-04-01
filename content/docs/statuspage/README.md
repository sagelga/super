---
sidebar_position: 1
---

# Status Page

A real-time status monitoring page for ByteSide.one services. Displays current service health, response times, and 30-day incident history for all monitored infrastructure.

## Key Features

- Real-time health checks with response time tracking
- Overall system status indicator (operational, degraded, down)
- 30-day visual incident history per service
- Dark and light mode with system preference detection
- Thai language interface
- Auto-refresh every minute

## Monitored Services

| Service | Description |
|---------|-------------|
| Cloudflare | CDN and DDoS protection |
| Website | Main website availability |
| R2 Content | Image and video hosting |
| Notion Sync | Content synchronization worker |
| Notion | Database availability |

## API

### `GET /api/status`

Returns current status of all monitored services, including response times, status codes, and 30-day history.

### `GET /api/minutes`

Returns minute-level history data for detailed incident analysis.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Typography | IBM Plex Sans Thai, JetBrains Mono |
| Testing | Playwright (E2E) |
| Deployment | Cloudflare Pages via @cloudflare/next-on-pages |
