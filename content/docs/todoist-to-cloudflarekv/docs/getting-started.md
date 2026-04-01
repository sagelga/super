---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- A Todoist account with an integration/webhook configured

## Installation

```bash
git clone https://github.com/sagelga/todoist-to-cloudflarekv.git
cd todoist-to-cloudflarekv
npm install
```

## KV Namespace

Create a KV namespace:

```bash
npx wrangler kv namespace create "TODOIST_TASKS"
```

Update `wrangler.toml` with the returned namespace ID.

## Webhook Secret

Set the webhook secret for request validation:

```bash
npx wrangler secret put TODOIST_WEBHOOK_SECRET
```

Or add it to `wrangler.toml` as a plain-text variable (less secure):

```toml
[vars]
TODOIST_WEBHOOK_SECRET = "your-secure-random-string"
```

## Local Development

```bash
npm run dev
```

## Deployment

```bash
npm run deploy
```

The worker URL will be printed (e.g., `https://todoist-to-cloudflarekv.your-subdomain.workers.dev`).

## Configure Todoist Webhook

1. Go to Todoist Integrations
2. Create or select an integration
3. Set the webhook URL to your worker URL
4. Enter your webhook secret
5. Subscribe to events: `item:added`, `item:updated`, `item:completed`, `item:deleted`

## View Logs

```bash
npm run tail
```
