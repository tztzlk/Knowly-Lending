import { NextResponse } from "next/server";
import { getSupabaseServer } from "@/lib/supabase/server";

const ROLE_VALUES = ["student", "teacher", "school_leader", "parent"] as const;
type RoleType = (typeof ROLE_VALUES)[number];

type Body = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  schoolName?: string;
  grade?: string;
  city?: string;
  subject?: string;
  position?: string;
  childGrade?: string;
  consent?: boolean;
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

  if (body?.consent !== true) {
    return NextResponse.json({ ok: false, error: "Consent required" }, { status: 400 });
  }

  const rawName = typeof body?.name === "string" ? body.name.trim() : "";
  if (!rawName || rawName.length < 2 || rawName.length > 40) {
    return NextResponse.json(
      { ok: false, error: "Name is required (2–40 characters)." },
      { status: 400 }
    );
  }
  const name = rawName;

  const rawRole = typeof body?.role === "string" ? body.role.trim() : "";
  const role_type: RoleType | null = ROLE_VALUES.includes(rawRole as RoleType)
    ? (rawRole as RoleType)
    : null;

  const rawSchool = typeof body?.schoolName === "string" ? body.schoolName.trim() : "";
  const rawGrade = typeof body?.grade === "string" ? body.grade.trim() : "";
  const rawCity = typeof body?.city === "string" ? body.city.trim() : "";
  const rawSubject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const rawPosition = typeof body?.position === "string" ? body.position.trim() : "";
  const rawChildGrade =
    typeof body?.childGrade === "string" ? body.childGrade.trim() : "";

  // Normalize optional phone to digits-only, or null.
  const rawPhone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const phoneDigits = rawPhone.replace(/\D/g, "");
  const phone = phoneDigits || null;

  // Role-based required fields and nulling of hidden ones.
  let school: string | null = null;
  let grade: string | null = null;
  let city: string | null = null;
  let subject: string | null = null;
  let position: string | null = null;
  let child_grade: string | null = null;

  if (role_type === "student") {
    if (!rawSchool || !rawGrade) {
      return NextResponse.json(
        { ok: false, error: "School and grade are required for students." },
        { status: 400 }
      );
    }
    school = rawSchool;
    grade = rawGrade;
  } else if (role_type === "teacher") {
    if (!rawSchool || !rawCity) {
      return NextResponse.json(
        { ok: false, error: "School and city are required for teachers." },
        { status: 400 }
      );
    }
    school = rawSchool;
    city = rawCity;
    subject = rawSubject || null;
  } else if (role_type === "school_leader") {
    if (!rawSchool || !rawCity || !rawPosition) {
      return NextResponse.json(
        { ok: false, error: "School, city and position are required for school leaders." },
        { status: 400 }
      );
    }
    school = rawSchool;
    city = rawCity;
    position = rawPosition;
  } else if (role_type === "parent") {
    if (!rawChildGrade) {
      return NextResponse.json(
        { ok: false, error: "Child grade is required for parents." },
        { status: 400 }
      );
    }
    child_grade = rawChildGrade;
    school = rawSchool || null;
  } else {
    // No specific role: keep everything null except name/email/phone.
    school = null;
    grade = null;
    city = null;
    subject = null;
    position = null;
    child_grade = null;
  }

  // Derive source_page from the Referer header if available.
  let source_page: string | null = null;
  const referer = request.headers.get("referer");
  if (referer) {
    try {
      const refUrl = new URL(referer);
      source_page = refUrl.pathname || null;
    } catch {
      source_page = null;
    }
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceRoleKey) {
    console.warn(
      "[Waitlist API] Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to .env.local to enable waitlist sign-ups."
    );
    return NextResponse.json(
      { ok: false, success: false, message: "Supabase not configured" },
      { status: 503 }
    );
  }

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase
      .from("leads")
      .upsert(
        {
          name,
          email,
          phone,
          role: rawRole || null,
          school,
          grade,
          city,
          subject,
          position,
          child_grade,
          role_type,
          source_page,
          language: null,
        },
        { onConflict: "email" }
      );

    if (error) {
      console.error("Supabase upsert error:", error);
      return NextResponse.json(
        { ok: false, error: "Could not save. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const isTlsOrFetch =
      /fetch failed|UNABLE_TO_GET_ISSUER_CERT|ECONNREFUSED|ETIMEDOUT|certificate/i.test(message);
    console.error("Waitlist API error:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Server error. Please try again.",
        ...(isTlsOrFetch && {
          message:
            "Connection to Supabase failed. For local dev, see LOCAL_DEVELOPMENT.md (TLS / certificates).",
        }),
      },
      { status: 500 }
    );
  }
}
