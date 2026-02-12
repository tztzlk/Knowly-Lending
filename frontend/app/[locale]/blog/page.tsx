import type { Metadata } from "next";
import Container from "@/components/layout/Container";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const titles: Record<string, string> = {
    en: "Blog | Knowly",
    ru: "Блог | Knowly",
    kz: "Блог | Knowly",
  };
  const loc = locale in titles ? locale : "en";
  return { title: titles[loc] };
}

function BlogPlaceholder() {
  return (
    <div className="min-h-[50vh] py-section md:py-sectionLg">
      <Container className="max-w-2xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ref-heading md:text-4xl">
          Blog
        </h1>
        <p className="mt-4 text-lg text-ref-body">
          Coming soon. Articles on career guidance, student support, and school best practices.
        </p>
      </Container>
    </div>
  );
}

export default function BlogPage() {
  return <BlogPlaceholder />;
}
