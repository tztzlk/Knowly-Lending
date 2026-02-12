import { createRequire } from "module";
import { createClient } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types-database";

const require = createRequire(import.meta.url);

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

/** Singleton server client — reuse per request context (serverless-safe). */
let _serverClient: SupabaseClient<Database> | null = null;

/**
 * Build optional custom fetch for local dev when TLS fails (e.g. Windows "UNABLE_TO_GET_ISSUER_CERT_LOCALLY").
 * Only used when NODE_ENV=development and SUPABASE_INSECURE_DEV=1. Never use in production.
 */
function getInsecureDevFetch(): typeof fetch | undefined {
  if (process.env.NODE_ENV !== "development" || process.env.SUPABASE_INSECURE_DEV !== "1") {
    return undefined;
  }
  try {
    const { Agent, fetch: undiciFetch } = require("undici") as {
      Agent: new (opts: { connect: { rejectUnauthorized: boolean } }) => unknown;
      fetch: (input: unknown, init?: unknown) => Promise<unknown>;
    };
    const agent = new Agent({ connect: { rejectUnauthorized: false } });
    const customFetch: typeof fetch = (input: RequestInfo | URL, init?: RequestInit) =>
      undiciFetch(input, { ...init, dispatcher: agent }) as Promise<Response>;
    return customFetch;
  } catch {
    return undefined;
  }
}

/**
 * Server-only Supabase client with service role.
 * Use in API routes to insert/update leads (bypasses RLS).
 * Never expose SUPABASE_SERVICE_ROLE_KEY to the client.
 *
 * In local development, if you see "UNABLE_TO_GET_ISSUER_CERT_LOCALLY", set SUPABASE_INSECURE_DEV=1
 * in .env.local (dev only) or use npm run dev:win. See LOCAL_DEVELOPMENT.md.
 */
export function getSupabaseServer(): SupabaseClient<Database> {
  if (!url || !serviceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local."
    );
  }
  if (_serverClient) return _serverClient;
  const insecureFetch = getInsecureDevFetch();
  _serverClient = createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false },
    ...(insecureFetch && { global: { fetch: insecureFetch } }),
  });
  return _serverClient;
}
