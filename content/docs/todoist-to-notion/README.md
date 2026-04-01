---
sidebar_position: 1
---

# Todoist to Notion

A Cloudflare Worker that receives Todoist webhook events and creates or updates pages in a Notion database. When a task is added, updated, completed, or deleted in Todoist, this worker reflects the change in Notion in real time.

## How It Works

```
Todoist Webhook Event
  --> POST to this worker
  --> Parse event type and task data
  --> Search Notion for existing page by Todoist ID
  --> Create new page or update existing page
```

## Supported Events

| Event | Action |
|-------|--------|
| `item:added` | Create a new page in Notion |
| `item:updated` | Update the existing Notion page |
| `item:completed` | Mark the Notion page as complete |
| `item:deleted` | Remove the Notion page |

## Priority Mapping

Todoist and Notion use inverted priority scales. The worker maps between them:

| Todoist Priority | Notion Label |
|-----------------|--------------|
| 1 (normal) | P4 |
| 2 | P3 |
| 3 | P2 |
| 4 (urgent) | P1 |

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Cloudflare Workers |
| Destination | Notion API (v2025-09-03) |
| Language | TypeScript |
