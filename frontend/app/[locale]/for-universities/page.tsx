import type { Metadata } from "next";
import { ForUniversitiesContent } from "@/components/landing/ForUniversitiesContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "For universities | Knowly",
    ru: "Для вузов | Knowly",
    kz: "ЖОО үшін | Knowly",
  };
  const loc = locale in titles ? locale : "en";
  return { title: titles[loc] };
}

export default function ForUniversitiesPage() {
  return <ForUniversitiesContent />;
}
