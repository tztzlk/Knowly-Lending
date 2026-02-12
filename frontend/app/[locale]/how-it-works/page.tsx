import type { Metadata } from "next";
import { HowItWorksContent } from "@/components/landing/HowItWorksContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "How it works | Knowly",
    ru: "Как это работает | Knowly",
    kz: "Қалай жұмыс істейді | Knowly",
  };
  const desc: Record<string, string> = {
    en: "How Knowly's reflection quiz works—in plain language.",
    ru: "Как устроен опрос Knowly—простыми словами.",
    kz: "Knowly опросы қалай жұмыс істейді—қарапайым тілде.",
  };
  const loc = locale in titles ? locale : "en";
  return {
    title: titles[loc],
    description: desc[loc],
  };
}

export default function HowItWorksPage() {
  return <HowItWorksContent />;
}
