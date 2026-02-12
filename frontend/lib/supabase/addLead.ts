import { getSupabaseServer } from "./server";
import type { LeadInsert } from "./types";

/**
 * Insert a lead into the leads table (server-only).
 * Uses service role so it works regardless of RLS.
 * Returns the inserted row(s) or null on error.
 */
export async function addLead(
  lead: LeadInsert
): Promise<{ id: string; email: string } | null> {
  const supabase = getSupabaseServer();
  const { data, error } = await supabase
    .from("leads")
    .insert(lead)
    .select("id, email")
    .single();

  if (error) {
    console.error("addLead error:", error);
    return null;
  }
  return data;
}
