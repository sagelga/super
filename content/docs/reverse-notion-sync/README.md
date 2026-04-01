---
sidebar_position: 1
---

# Reverse Notion Sync

A Cloudflare Worker that syncs Todoist task data from Cloudflare KV back into Notion pages. Triggered by a Notion automation button, it fetches the latest task data from KV and patches the Notion page if any fields are out of date.

## How It Works

```
Notion "Sync" Button click
  --> Notion Automation (webhook)
    --> POST /sync (this worker)
      --> Fetch Notion page, extract Todoist Task ID
      --> Fetch task from Cloudflare KV
      --> Diff: Title, Status, Due Date, Priority
      --> PATCH Notion page if anything is stale
```

## Fields Synced

| Field | Source of Truth | Action |
|-------|-----------------|--------|
| Task title | KV | Overwrites Notion Name |
| Completion | KV | Updates Notion Status to Done/In Progress |
| Due date | KV | Overwrites Notion Due Date |
| Priority | KV | Overwrites Notion Priority select |
| Last Synced | Worker | Always updated to current time |

## Notion Database Schema

| Property | Type | Description |
|----------|------|-------------|
| Name | Title | Task title (compared with Todoist) |
| Todoist Task ID | Text | Todoist task ID for KV lookup |
| Status | Status | Not Started / In Progress / Done |
| Due Date | Date | Compared with Todoist due date |
| Priority | Select | P1 - Urgent, P2 - High, P3 - Medium, P4 - Normal |
| Last Synced | Date | Updated automatically on every sync |
| Sync | Button | Trigger button for the automation |

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Cloudflare Workers |
| Storage | Cloudflare KV (read) |
| Destination | Notion API |
| Language | TypeScript |
