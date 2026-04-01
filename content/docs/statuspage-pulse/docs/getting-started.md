---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- A Cloudflare R2 bucket

## Installation

```bash
git clone https://github.com/sagelga/statuspage-pulse.git
cd statuspage-pulse
npm install
```

## Create the R2 Bucket

```bash
wrangler r2 bucket create statuspage-data
```

## Local Development

```bash
npm run dev
```

Starts a local worker with simulated cron triggers.

To manually trigger a check during local dev:

```bash
curl -X POST http://localhost:8787/trigger
```

## Type Checking

```bash
npm run typecheck
```

## Deployment

```bash
npm run deploy
```

The cron trigger (every minute) activates automatically after deployment.

## View Logs

```bash
npm run tail
```

## Configuration

Environment variables in `wrangler.toml`:

| Variable | Default | Description |
|----------|---------|-------------|
| `TIMEOUT_MS` | 5000 | Request timeout in milliseconds |
| `DEGRADED_THRESHOLD_MS` | 1500 | Response time threshold for degraded status |

## Adding a New Service

Add an entry to the `SERVICES` array in `src/config.ts`. Use the `jsonStatus` field for services that expose a structured status API.

## Source Files

| File | Purpose |
|------|---------|
| `src/types.ts` | Type definitions |
| `src/config.ts` | Service definitions and monitoring URLs |
| `src/worker.ts` | Health check logic, R2 reads/writes, HTTP handlers |
