"use client";

import { useState, useTransition } from "react";
import { useLocale } from "@/components/context/LocaleContext";

type Props = { className?: string };

const ROLE_VALUES = ["student", "teacher", "school_leader", "parent"] as const;
type RoleValue = (typeof ROLE_VALUES)[number];

export function WaitlistForm({ className = "" }: Props) {
  const { t } = useLocale();
  const form = t.waitlist.form as {
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    emailHint: string;
    phone: string;
    phonePlaceholder: string;
    phoneHint: string;
    role: string;
    roleStudent: string;
    roleStudentDesc: string;
    roleTeacher: string;
    roleTeacherDesc: string;
    roleSchool: string;
    roleSchoolDesc: string;
    roleParent: string;
    roleParentDesc: string;
    schoolNameStudent: string;
    schoolNamePlaceholderStudent: string;
    schoolNameTeacher: string;
    schoolNamePlaceholderTeacher: string;
    schoolNameLeader: string;
    schoolNamePlaceholderLeader: string;
    schoolNameParent: string;
    schoolNamePlaceholderParent: string;
    grade: string;
    gradePlaceholder: string;
    city: string;
    cityPlaceholderTeacher: string;
    cityPlaceholderLeader: string;
    subject: string;
    subjectPlaceholder: string;
    position: string;
    positionPlaceholder: string;
    childGrade: string;
    childGradePlaceholder: string;
    consentLabel: string;
    privacyNote: string;
    submit: string;
    success: string;
    error: string;
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<RoleValue | "">("");
  const [schoolName, setSchoolName] = useState("");
  const [grade, setGrade] = useState("");
  const [city, setCity] = useState("");
  const [subject, setSubject] = useState("");
  const [position, setPosition] = useState("");
  const [childGrade, setChildGrade] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email.trim() || !consent) return;
    startTransition(async () => {
      setStatus("idle");
      setErrorMessage(undefined);
      try {
        const res = await fetch("/api/waitlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: name.trim() || undefined,
            email: email.trim(),
            phone: phone.trim() || undefined,
            role: role || undefined,
            schoolName: schoolName.trim() || undefined,
            grade: grade.trim() || undefined,
            city: city.trim() || undefined,
            subject: subject.trim() || undefined,
            position: position.trim() || undefined,
            childGrade: childGrade.trim() || undefined,
            consent: true,
          }),
        });
        const data = (await res.json().catch(() => ({}))) as {
          ok?: boolean;
          error?: string;
          message?: string;
        };
        if (res.ok && data.ok !== false) {
          setStatus("success");
          setName("");
          setEmail("");
          setPhone("");
          setRole("");
          setSchoolName("");
          setGrade("");
          setCity("");
          setSubject("");
          setPosition("");
          setChildGrade("");
          setConsent(false);
        } else {
          setStatus("error");
          setErrorMessage(data.message ?? data.error ?? undefined);
        }
      } catch (e) {
        setStatus("error");
        const msg = e instanceof Error ? e.message : String(e);
        setErrorMessage(
          /fetch|network|failed to fetch/i.test(msg)
            ? "Network error. Check your connection or try again."
            : undefined
        );
      }
    });
  }

  const roleOptions = [
    { value: "student", label: `${form.roleStudent} — ${form.roleStudentDesc}` },
    { value: "teacher", label: `${form.roleTeacher} — ${form.roleTeacherDesc}` },
    { value: "school_leader", label: `${form.roleSchool} — ${form.roleSchoolDesc}` },
    { value: "parent", label: `${form.roleParent} — ${form.roleParentDesc}` },
  ];

  const isStudent = role === "student";
  const isTeacher = role === "teacher";
  const isSchoolLeader = role === "school_leader";
  const isParent = role === "parent";

  const showSchoolName = role !== "";
  const isSchoolNameRequired = isStudent || isTeacher || isSchoolLeader;

  const schoolLabel =
    role === "student"
      ? form.schoolNameStudent
      : role === "teacher"
        ? form.schoolNameTeacher
        : role === "school_leader"
          ? form.schoolNameLeader
          : form.schoolNameParent;
  const schoolPlaceholder =
    role === "student"
      ? form.schoolNamePlaceholderStudent
      : role === "teacher"
        ? form.schoolNamePlaceholderTeacher
        : role === "school_leader"
          ? form.schoolNamePlaceholderLeader
          : form.schoolNamePlaceholderParent;
  const cityPlaceholder = isTeacher ? form.cityPlaceholderTeacher : form.cityPlaceholderLeader;

  if (status === "success") {
    return (
      <div
        className={`rounded-xl border border-secondary-200 bg-secondary-50 px-6 py-4 text-secondary-800 ${className}`}
        role="status"
      >
        {form.success}
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-col gap-4 rounded-xl border border-ref-border bg-white p-4 pb-24 shadow-subtle sm:p-6 sm:pb-6 ${className}`}
      noValidate
    >
      <div className="grid w-full gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="waitlist-name" className="mb-1 block text-responsive-base font-medium text-ref-heading">
            {form.name}
          </label>
          <input
            id="waitlist-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={form.namePlaceholder}
            disabled={isPending}
            autoComplete="name"
            className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="waitlist-email" className="mb-1 block text-responsive-base font-medium text-ref-heading">
            {form.email} <span className="text-red-500" aria-hidden>*</span>
            <span className="sr-only">(required)</span>
          </label>
          <input
            id="waitlist-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={form.emailPlaceholder}
            required
            disabled={isPending}
            autoComplete="email"
            className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
          />
          <p className="mt-1 text-xs text-ref-body">{form.emailHint}</p>
        </div>
      </div>

      <div>
        <label htmlFor="waitlist-phone" className="mb-1 block text-responsive-base font-medium text-ref-heading">
          {form.phone}
        </label>
        <input
          id="waitlist-phone"
          type="tel"
          inputMode="numeric"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={form.phonePlaceholder}
          disabled={isPending}
          autoComplete="tel"
          className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
        />
        <p className="mt-1 text-xs text-ref-body">{form.phoneHint}</p>
      </div>

      <div>
        <label htmlFor="waitlist-role" className="mb-1 block text-responsive-base font-medium text-ref-heading">
          {form.role}
        </label>
        <select
          id="waitlist-role"
          value={role}
          onChange={(e) => {
            const nextRole = e.target.value as RoleValue | "";
            setRole(nextRole);
            // Clear all role-dependent fields when role changes to keep data clean.
            setSchoolName("");
            setGrade("");
            setCity("");
            setSubject("");
            setPosition("");
            setChildGrade("");
          }}
          disabled={isPending}
          className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
        >
          <option value="">—</option>
          {roleOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {role && (
        <div className="grid w-full gap-4 sm:grid-cols-2">
          {showSchoolName && (
            <div>
              <label htmlFor="waitlist-school" className="mb-1 block text-responsive-base font-medium text-ref-heading">
                {schoolLabel}{" "}
                {isSchoolNameRequired && <><span className="text-red-500" aria-hidden>*</span><span className="sr-only">(required)</span></>}
              </label>
              <input
                id="waitlist-school"
                type="text"
                value={schoolName}
                onChange={(e) => setSchoolName(e.target.value)}
                placeholder={schoolPlaceholder}
                disabled={isPending}
                autoComplete="organization"
                className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
              />
            </div>
          )}

          {isStudent && (
            <div>
              <label htmlFor="waitlist-grade" className="mb-1 block text-responsive-base font-medium text-ref-heading">
                {form.grade} <span className="text-red-500" aria-hidden>*</span><span className="sr-only">(required)</span>
              </label>
              <input
                id="waitlist-grade"
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder={form.gradePlaceholder}
                disabled={isPending}
                className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
              />
            </div>
          )}

          {isParent && (
            <div>
              <label htmlFor="waitlist-child-grade" className="mb-1 block text-responsive-base font-medium text-ref-heading">
                {form.childGrade} <span className="text-red-500" aria-hidden>*</span><span className="sr-only">(required)</span>
              </label>
              <input
                id="waitlist-child-grade"
                type="text"
                value={childGrade}
                onChange={(e) => setChildGrade(e.target.value)}
                placeholder={form.childGradePlaceholder}
                disabled={isPending}
                className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
              />
            </div>
          )}

          {(isTeacher || isSchoolLeader) && (
            <div>
              <label htmlFor="waitlist-city" className="mb-1 block text-responsive-base font-medium text-ref-heading">
                {form.city} <span className="text-red-500" aria-hidden>*</span><span className="sr-only">(required)</span>
              </label>
              <input
                id="waitlist-city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={cityPlaceholder}
                disabled={isPending}
                className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
              />
            </div>
          )}

          {isTeacher && (
            <div>
              <label htmlFor="waitlist-subject" className="mb-1 block text-responsive-base font-medium text-ref-heading">
                {form.subject}
              </label>
              <input
                id="waitlist-subject"
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder={form.subjectPlaceholder}
                disabled={isPending}
                className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
              />
            </div>
          )}

          {isSchoolLeader && (
            <div>
              <label htmlFor="waitlist-position" className="mb-1 block text-responsive-base font-medium text-ref-heading">
                {form.position} <span className="text-red-500" aria-hidden>*</span><span className="sr-only">(required)</span>
              </label>
              <input
                id="waitlist-position"
                type="text"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                placeholder={form.positionPlaceholder}
                disabled={isPending}
                className="w-full min-h-touch rounded-input border border-neutral-border bg-white px-4 py-3 text-base text-slate-800 placeholder:text-slate-400 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-100 disabled:opacity-60 sm:min-h-0 sm:py-2.5 sm:text-sm"
              />
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            disabled={isPending}
            className="mt-1.5 h-5 w-5 min-w-[1.25rem] rounded border-neutral-border text-ref-primary focus:ring-primary-500"
          />
          <span className="text-responsive-base text-ref-body leading-[1.5]">{form.consentLabel}</span>
        </label>
        <p className="text-xs text-slate-500">{form.privacyNote}</p>
      </div>

      <div className="sticky bottom-0 left-0 right-0 z-10 -mx-4 -mb-6 flex justify-end bg-white px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] sm:static sm:mx-0 sm:mb-0 sm:block sm:bg-transparent sm:py-0 sm:shadow-none">
        <button
          type="submit"
          disabled={isPending}
          className="w-full shrink-0 min-h-touch rounded-lg bg-ref-primary px-5 py-3 text-base font-semibold text-white transition-smooth hover:bg-ref-primary/90 disabled:opacity-60 sm:w-auto sm:min-h-0 sm:py-2.5 sm:text-sm"
        >
          {isPending ? "…" : form.submit}
        </button>
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600" role="alert">
          {errorMessage ?? form.error}
        </p>
      )}
    </form>
  );
}
