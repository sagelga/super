---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- A Cloudflare account with a KV namespace containing Todoist task data
- A Notion integration with access to your target database

## Installation

```bash
git clone https://github.com/sagelga/cloudflarekv-to-notion.git
cd cloudflarekv-to-notion
npm install
```

## Configuration

### KV Namespace

The worker reads from a KV namespace bound as `TODOIST_TASKS`. Update the namespace ID in `wrangler.toml`, or create a new one:

```bash
wrangler kv:namespace create TODOIST_TASKS
```

### Secrets

Set the Notion API key:

```bash
wrangler secret put NOTION_API_KEY
```

### Environment Variables

Set `NOTION_DATABASE_ID` in `wrangler.toml` to point to your target Notion database.

## Local Development

```bash
npm run dev
```

## Build (Type Check)

```bash
npm run build
```

## Deployment

```bash
npm run deploy
```

The cron triggers (3 AM and 3 PM Bangkok time) will begin running automatically after deployment.

## View Logs

```bash
npm run tail
```

## Manual Sync

```bash
curl -X POST https://cloudflarekv-to-notion.sagelga.workers.dev/sync
```
