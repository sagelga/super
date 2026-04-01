---
sidebar_position: 1
---

# Cloudflare KV to Notion

A Cloudflare Worker that syncs Todoist task data from Cloudflare KV to a Notion database on a scheduled basis. It creates new Notion pages for tasks that do not yet exist, and updates existing pages with the latest data from KV.

## How It Works

The worker runs on a cron schedule (3 AM and 3 PM Bangkok time daily). On each run, it reads all tasks stored in a Cloudflare KV namespace and syncs them into a Notion database -- creating pages for new tasks and updating pages for existing ones.

A manual sync can also be triggered via the `/sync` HTTP endpoint.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/health` | Health check |
| `POST` | `/sync` | Manually trigger a full sync |

## Notion Database Schema

The target Notion database should have the following properties:

| Property | Type | Description |
|----------|------|-------------|
| Task Name | Title | Task title |
| Task Description | Rich Text | Task description |
| URL | URL | Todoist task URL |
| Date | Rich Text | Due date |
| Priority | Select | P1, P2, P3, P4 |
| Todoist Id | Rich Text | Todoist task ID (used for matching) |
| Status | Status | To Do, Done, Canceled |
| Duration Amount | Rich Text | Duration value |
| Duration Unit | Rich Text | Duration unit (minute, hour) |
| Project | Relation | Related project |

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Cloudflare Workers |
| Storage | Cloudflare KV (read) |
| Destination | Notion API |
| Language | TypeScript |
