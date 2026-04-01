---
sidebar_position: 1
---

# Getting Started

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

## Installation

```bash
git clone https://github.com/sagelga/redirect.git
cd redirect
npm install
```

## Local Development

```bash
npm run dev
```

Starts a local dev server at `http://localhost:8787`.

## Testing

```bash
npm run test
```

Uses Vitest with `@cloudflare/vitest-pool-workers` for testing in a Workers-like environment.

Run a single test by name:

```bash
npx vitest run -t "test name substring"
```

## Deployment

```bash
npm run deploy
```

## Type Generation

After changing `wrangler.jsonc` bindings, regenerate the `Env` type:

```bash
npm run cf-typegen
```
