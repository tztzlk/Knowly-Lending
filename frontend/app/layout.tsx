import type { Metadata } from "next";
import type { ReactNode } from "react";

import "@/styles/globals.css";
import { AnalyticsScripts } from "@/components/analytics/AnalyticsScripts";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://knowly.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Knowly", template: "%s | Knowly" },
  description:
    "Knowly helps students find clarity, confidence, and direction—through reflection, not hype.",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Knowly",
    title: "Knowly — Clarity for Students",
    description:
      "Knowly helps students find clarity, confidence, and direction—through reflection, not hype.",
    url: siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Knowly — Clarity for Students",
    description:
      "Knowly helps students find clarity, confidence, and direction—through reflection, not hype.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="font-sans">
      <body className="min-h-screen overflow-x-hidden bg-ref-bg text-ref-heading antialiased">
        {children}
        <AnalyticsScripts />
      </body>
    </html>
  );
}
