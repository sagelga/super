---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- A Notion integration with edit access to your database
- A Cloudflare KV namespace containing Todoist task data

## Installation

```bash
git clone https://github.com/sagelga/reverse-notion-sync.git
cd reverse-notion-sync
npm install
```

## Secrets

```bash
wrangler secret put NOTION_TOKEN       # Notion integration secret
wrangler secret put WEBHOOK_SECRET     # Shared secret for webhook validation (optional)
```

## KV Namespace

The worker reads from a KV namespace bound as `TODO_LIST`. Update the namespace ID in `wrangler.toml`, or create a new one:

```bash
wrangler kv:namespace create TODO_LIST
```

## Deployment

```bash
wrangler deploy
```

## Notion Automation Setup

1. Open your Notion database and click the Automate button
2. Create a new automation
3. Set the trigger to: Button clicked (select your Sync button property)
4. Set the action to: Send webhook
   - URL: `https://reverse-notion-sync.<your-subdomain>.workers.dev/sync`
   - Method: POST
   - Headers: `Content-Type: application/json` and `x-webhook-secret: <your secret>`
5. Save the automation

Make sure your Notion integration is shared with the database and has Edit content access.

## Testing

Click the Sync button on any Notion row that has a Todoist Task ID filled in.

Possible responses:
- `{ "status": "up_to_date" }` -- all fields match
- `{ "status": "updated", "fieldsUpdated": [...] }` -- stale fields were patched
- `{ "status": "skipped" }` -- no Todoist Task ID or task not found in KV

## View Logs

```bash
wrangler tail
```
