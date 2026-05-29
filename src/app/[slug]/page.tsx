import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AppDetail } from "@/components/AppDetail";
import { apps, getConfig } from "@/data/apps";
import { getAppContent, getAppView } from "@/data/github";

export const revalidate = 3600;

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getConfig(slug);
  if (!config) return { title: "Not found" };
  const content = await getAppContent(config);
  return {
    title: content.name,
    description: content.tagline.en,
    openGraph: {
      title: `${content.name} — baomi`,
      description: content.tagline.en,
    },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getConfig(slug);
  if (!config) notFound();

  const view = await getAppView(config);

  return (
    <>
      <Nav />
      <main className="flex-1">
        <AppDetail app={view} />
      </main>
      <Footer />
    </>
  );
}
