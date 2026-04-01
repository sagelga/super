---
title: SuperEye
sidebar_label: Overview
slug: /supereye
---

# SuperEye

Cloudflare Worker that runs every 15 minutes and syncs post metadata from Notion into Cloudflare KV. Only re-fetches full content when Notion's `last_edited_time` has changed since the last sync, conserving API quota and KV write operations.

## Stack

| Layer | Technology |
|---|---|
| Runtime | Cloudflare Workers |
| Storage | Cloudflare KV |
| Source | Notion API |
| Language | JavaScript |
| Trigger | Cron (every 15 min) |
