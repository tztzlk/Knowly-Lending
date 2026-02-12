import type { Database } from "./types-database";

/** Row type for the leads table in Supabase */
export type Lead = Database["public"]["Tables"]["leads"]["Row"];

/** Payload for inserting a new lead (id, created_at, updated_at are set by DB) */
export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
