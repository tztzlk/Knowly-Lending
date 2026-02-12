import type { Metadata } from "next";
import { WaitlistContent } from "@/components/landing/WaitlistContent";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Pre-register | Knowly",
    ru: "Предрегистрация | Knowly",
    kz: "Алдын ала тіркелу | Knowly",
  };
  const loc = locale in titles ? locale : "en";
  return { title: titles[loc] };
}

export default function WaitlistPage() {
  return <WaitlistContent />;
}
