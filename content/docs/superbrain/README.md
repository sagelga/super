---
title: SuperBrain
sidebar_label: Overview
slug: /superbrain
---

# SuperBrain

Cloudflare Worker that exposes a REST API for sagelga.com's blog. Reads cached post data from KV (populated by SuperEye) and serves it via clean endpoints.

## Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/posts` | Paginated post list |
| `GET /api/posts?category=design` | Filter by category |
| `GET /api/posts?featured=true` | Featured posts only |

## Stack

| Layer | Technology |
|---|---|
| Runtime | Cloudflare Workers |
| Storage | Cloudflare KV |
| Language | JavaScript |
