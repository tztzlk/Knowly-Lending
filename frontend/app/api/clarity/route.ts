import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types-database";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

type Body = {
  name?: string;
  email?: string;
  answers?: Record<string, string>;
  chosenDirections?: string[];
  examFocus?: { subjectsFocus?: string[]; weeklyFormat?: string; habits?: string[] };
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const email = typeof body?.email === "string" ? body.email.trim() : "";
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ ok: false, error: "Valid email required" }, { status: 400 });
  }

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (!name || name.length < 2 || name.length > 40) {
    return NextResponse.json(
      { ok: false, error: "Name is required (2–40 characters)." },
      { status: 400 }
    );
  }

  const answers = body?.answers && typeof body.answers === "object" ? body.answers : {};
  const chosenDirections = Array.isArray(body?.chosenDirections) ? body.chosenDirections : [];
  const examFocus = body?.examFocus && typeof body.examFocus === "object" ? body.examFocus : null;

  let source_page: string | null = "/clarity";
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const refUrl = new URL(referer);
      source_page = refUrl.pathname || "/clarity";
    } catch {
      source_page = "/clarity";
    }
  }

  const row: LeadInsert = {
    name,
    email,
    phone: null,
    role: "student",
    school: null,
    grade: null,
    city: null,
    subject: null,
    position: null,
    child_grade: null,
    role_type: "student",
    source_page,
    language: null,
    answers_json: Object.keys(answers).length ? answers : null,
    chosen_directions: chosenDirections.length ? chosenDirections : null,
    exam_focus: examFocus,
  };

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from("leads").upsert(row, { onConflict: "email" });

    if (error) {
      console.error("Clarity save error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Clarity API error:", err);
    return NextResponse.json(
      { ok: false, error: "Server error. Please try again." },
      { status: 500 }
    );
  }
}
