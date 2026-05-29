import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { AppDetail } from "@/components/AppDetail";
import { apps, getApp } from "@/data/apps";
import { getRepoMeta } from "@/data/github";

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
  const app = getApp(slug);
  if (!app) return { title: "Not found" };
  return {
    title: app.name,
    description: app.tagline.en,
    openGraph: { title: `${app.name} — baomi`, description: app.tagline.en },
  };
}

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);
  if (!app) notFound();

  const meta = (await getRepoMeta(app.repo)) ?? undefined;

  return (
    <>
      <Nav />
      <main className="flex-1">
        <AppDetail app={app} meta={meta} />
      </main>
      <Footer />
    </>
  );
}
