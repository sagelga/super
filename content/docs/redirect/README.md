---
sidebar_position: 1
---

# Redirect

A Cloudflare Worker URL shortener. Looks up a path key in Cloudflare KV and returns a 302 redirect to the destination URL. If the key is not found, it falls back to `https://status.sagelga.com`.

## How It Works

```
Request: GET /<key>
  --> KV lookup (REDIRECTS namespace, 300s cache TTL)
  --> 302 redirect to destination URL
  --> Fallback to https://status.sagelga.com if key not found
```

The worker normalizes destination URLs, adding `https://` if the stored value does not include a protocol.

## Tech Stack

| Component | Technology |
|-----------|------------|
| Runtime | Cloudflare Workers |
| Storage | Cloudflare KV |
| Language | TypeScript |
| Testing | Vitest with @cloudflare/vitest-pool-workers |

## Managing Redirects

Redirects are managed directly in the KV namespace via the Wrangler CLI:

```bash
# Add or update a redirect
npx wrangler kv key put --remote \
  --namespace-id=<NAMESPACE_ID> "key" "destination.com"

# List all redirects
npx wrangler kv key list --remote \
  --namespace-id=<NAMESPACE_ID>

# Delete a redirect
npx wrangler kv key delete --remote \
  --namespace-id=<NAMESPACE_ID> "key"
```

The `--remote` flag is required to write to the production Cloudflare KV (not local).
