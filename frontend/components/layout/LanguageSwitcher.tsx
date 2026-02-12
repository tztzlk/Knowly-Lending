"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useLocale } from "@/components/context/LocaleContext";
import { LOCALES, LOCALE_NAMES } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (LOCALES.includes(segments[0] as Locale)) return "/" + segments.slice(1).join("/");
  return pathname;
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

type LanguageSwitcherProps = { className?: string };

export default function LanguageSwitcher({ className = "" }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const { locale: currentLocale } = useLocale();
  const basePath = stripLocale(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const otherLocales = LOCALES.filter((loc) => loc !== currentLocale);

  return (
    <div
      ref={ref}
      className={`relative ${className}`.trim()}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex min-h-touch min-w-[4.5rem] items-center justify-between gap-1.5 rounded-lg border border-ref-border bg-white/80 px-3 py-2.5 text-base font-medium text-ref-heading transition-smooth hover:bg-neutral-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ref-primary md:min-h-0 md:py-2 md:text-sm"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Current language: ${LOCALE_NAMES[currentLocale]}. Choose another.`}
      >
        <span lang={currentLocale}>{LOCALE_NAMES[currentLocale]}</span>
        <ChevronDown className={`h-4 w-4 text-ref-body transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1 min-w-[4.5rem] rounded-lg border border-ref-border bg-white py-1 shadow-lg transition-opacity duration-200"
          aria-label="Other languages"
        >
          {otherLocales.map((loc) => {
            const href = `/${loc}${basePath === "/" ? "" : basePath}`;
            return (
              <li key={loc} role="option">
                <Link
                  href={href}
                  onClick={() => setOpen(false)}
                  className="block min-h-touch rounded-md px-3 py-3 text-base font-medium text-ref-body hover:bg-neutral-muted hover:text-ref-heading md:min-h-0 md:py-2 md:text-sm"
                  lang={loc}
                >
                  {LOCALE_NAMES[loc]}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
