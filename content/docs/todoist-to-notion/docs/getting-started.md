---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)
- A Notion integration with access to your target database
- A Todoist account with webhook access

## Installation

```bash
git clone https://github.com/sagelga/todoist-to-notion.git
cd todoist-to-notion
npm install
```

## Secrets

The worker requires a Notion API token and a Todoist webhook secret. Set them via Wrangler:

```bash
wrangler secret put NOTION_TOKEN
wrangler secret put TODOIST_WEBHOOK_SECRET
```

The Notion database ID is configured in the source code as `DEFAULT_PROJECT_ID`.

## Local Development

```bash
npm run dev
```

## Deployment

```bash
npm run deploy
```

## View Logs

```bash
npm run tail
```

## Configure Todoist Webhook

1. Go to Todoist Integrations
2. Create or select an integration
3. Set the webhook URL to your deployed worker URL
4. Enter your webhook secret
5. Subscribe to the relevant task events

## Observability

The worker has Cloudflare observability enabled in `wrangler.toml`:
- Logs are persisted with invocation-level detail
- Log push is enabled for external log aggregation
