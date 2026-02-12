import type { Metadata } from "next";
import { AboutContent } from "@/components/landing/AboutContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "About | Knowly",
    ru: "О нас | Knowly",
    kz: "Біз туралы | Knowly",
  };
  const loc = locale in titles ? locale : "en";
  return { title: titles[loc] };
}

export default function AboutPage() {
  return <AboutContent />;
}
