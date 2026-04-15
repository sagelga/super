/// <reference types="@cloudflare/workers-types" />

/**
 * Cloudflare environment bindings
 * Used with @opennextjs/cloudflare getCloudflareContext()
 */
export interface CloudflareEnv {
    DB: D1Database;
    CONTENT_DB: D1Database;
    ASSETS: Fetcher;
    SUPER_CACHE: KVNamespace;
    /** Service binding to the superbrain-v2 blog API worker */
    SUPERBRAIN?: Fetcher;
    /** Fallback URL for the Superbrain API (used when service binding is unavailable) */
    SUPERBRAIN_URL?: string;
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
        CONTENT_DB: D1Database;
        ASSETS: Fetcher;
        SUPER_CACHE: KVNamespace;
        /** Service binding to the superbrain-v2 blog API worker */
        SUPERBRAIN?: Fetcher;
        /** Fallback URL for the Superbrain API (used when service binding is unavailable) */
        SUPERBRAIN_URL?: string;
    }

    namespace NodeJS {
        interface ProcessEnv {
            ADMIN_EMAIL?: string;
            GOOGLE_CLIENT_ID?: string;
            GOOGLE_CLIENT_SECRET?: string;
            JWT_SECRET?: string;
            NODE_ENV?: "development" | "production";
        }
    }
}
