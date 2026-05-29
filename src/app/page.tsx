import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { AppsSection } from "@/components/AppsSection";
import { Footer } from "@/components/Footer";
import { apps } from "@/data/apps";
import { getAllRepoMeta } from "@/data/github";

export const revalidate = 3600;

export default async function Home() {
  const meta = await getAllRepoMeta(apps.map((app) => app.repo));
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />
        <AppsSection meta={meta} />
      </main>
      <Footer />
    </>
  );
}
