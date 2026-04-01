---
sidebar_position: 1
---

# Todoist to Cloudflare KV

A Cloudflare Worker that receives Todoist webhook events and stores task data in Cloudflare KV. It handles task creation, updates, completion, and deletion events, maintaining a synchronized copy of Todoist tasks in KV storage.

## Supported Events

| Event | Action |
|-------|--------|
| `item:added` | Creates a new KV entry with task data |
| `item:updated` | Updates the existing KV entry |
| `item:completed` | Marks the task as completed with timestamp |
| `item:deleted` | Removes the KV entry |

## KV Data Structure

Each task is stored with the Todoist ID as the key:

```json
{
  "url": "https://todoist.com/showTask?id=123456",
  "taskName": "My Task",
  "taskDescription": "Task description",
  "dueDate": "2024-12-31",
  "dueTime": "14:00",
  "dueTimezone": "Asia/Tokyo",
  "durationUnit": "minute",
  "durationAmount": 30,
  "todoistId": "123456"
}
```

Completed tasks include additional fields: `completed: true` and `completedAt` with an ISO timestamp.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Cloudflare Workers |
| Storage | Cloudflare KV |
| Language | TypeScript |

## Security

Webhook requests are validated using the `X-Todoist-Webhook-Secret` header against the configured `TODOIST_WEBHOOK_SECRET`.
