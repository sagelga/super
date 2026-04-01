---
sidebar_position: 1
---

# Status Page Pulse

A Cloudflare Worker that monitors service health on a per-minute cron schedule and stores status data in Cloudflare R2. It serves as the data backend for the [Status Page](/docs/statuspage) frontend.

## How It Works

```
Cron Trigger (every minute)
  --> Check all services in parallel
  --> Write results to R2 bucket
      - daily:{serviceId}    (60-day rolling history)
      - minutes:{serviceId}:{date}  (1440 slots per day)
```

## Services Monitored

| ID | Name | Description |
|----|------|-------------|
| `cloudflare` | Cloudflare | Network status |
| `website` | Website | Main website |
| `r2-content` | R2 Content | Image/video hosting |
| `notion-sync` | Notion Sync | Data fetcher |
| `notion` | Notion | Database |

## Status Levels

- **operational** -- service responding normally (under 1500ms)
- **degraded** -- service responding but slow (over 1500ms)
- **down** -- service unavailable or returning errors

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/trigger` | Manually trigger a status check and R2 write |
| `GET` | `/health` | Health check |

## R2 Storage Schema

| Key Pattern | Contents |
|-------------|----------|
| `daily:{serviceId}` | JSON array of `{ date, status }` entries, 60-day retention |
| `minutes:{serviceId}:{date}` | JSON array of 1440 entries (one per minute), `'nodata'` for unchecked slots |

Daily status only escalates within a day (never downgrades from `down` to `operational` for the same date).

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Cloudflare Workers |
| Storage | Cloudflare R2 |
| Language | TypeScript |
