import type { Metadata } from "next";
import { ForSchoolsContent } from "@/components/landing/ForSchoolsContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "For Schools | Knowly",
    ru: "Для школ | Knowly",
    kz: "Мектептерге | Knowly",
  };
  const loc = locale in titles ? locale : "en";
  return { title: titles[loc] };
}

export default function ForSchoolsPage() {
  return <ForSchoolsContent />;
}
