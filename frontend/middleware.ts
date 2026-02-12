import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { LOCALES } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect root to default locale
  if (pathname === "/") {
    const locale = request.headers.get("accept-language")?.split(",")?.[0]?.slice(0, 2);
    const preferred = locale === "ru" ? "ru" : locale === "kk" ? "kz" : "en";
    return NextResponse.redirect(new URL(`/${preferred}`, request.url));
  }

  const segment = pathname.slice(1).split("/")[0];
  if (LOCALES.includes(segment as "en" | "ru" | "kz")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(en|ru|kz)/:path*"],
};
