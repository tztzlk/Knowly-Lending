import type { Metadata } from "next";
import { ClarityContent } from "@/components/clarity/ClarityContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Clarity | Knowly",
    ru: "Ясность | Knowly",
    kz: "Анықтық | Knowly",
  };
  const loc = locale in titles ? locale : "en";
  return { title: titles[loc] };
}

export default function ClarityPage() {
  return <ClarityContent />;
}
