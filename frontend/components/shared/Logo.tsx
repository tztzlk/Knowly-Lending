import Link from "next/link";

type LogoProps = {
  variant?: "light" | "dark";
  /** e.g. "" for en, "/ru" for ru - used for locale-prefixed landing */
  localePrefix?: string;
};

export default function Logo({ variant = "dark", localePrefix = "" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-ref-heading";
  const href = localePrefix ? `${localePrefix}/` : "/";

  return (
    <Link href={href} className={`inline-flex items-center gap-2 ${textColor}`}>
      <span className="flex h-9 w-9 items-center justify-center rounded-input bg-ref-primary text-lg font-semibold text-white shadow-subtle">
        K
      </span>
      <span className="text-lg font-semibold tracking-tight">Knowly</span>
    </Link>
  );
}
