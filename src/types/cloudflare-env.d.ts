/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare environment bindings
 * Used with @opennextjs/cloudflare getCloudflareContext()
 */
export interface CloudflareEnv {
  DB: D1Database;
  ASSETS: Fetcher;
}

/**
 * Secrets accessed via process.env
 * - ADMIN_EMAIL: The admin user's email (can register with passkey)
 * - GOOGLE_CLIENT_ID: Google OAuth client ID
 * - GOOGLE_CLIENT_SECRET: Google OAuth client secret
 * - JWT_SECRET: Secret key for signing JWTs
 */
declare global {
  interface CloudflareEnv {
    DB: D1Database;
    ASSETS: Fetcher;
  }

  namespace NodeJS {
    interface ProcessEnv {
      ADMIN_EMAIL?: string;
      GOOGLE_CLIENT_ID?: string;
      GOOGLE_CLIENT_SECRET?: string;
      JWT_SECRET?: string;
      NODE_ENV?: 'development' | 'production';
    }
  }
}
