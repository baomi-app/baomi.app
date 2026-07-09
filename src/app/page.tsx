import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { AppsSection } from "@/components/AppsSection";
import { ToolsSection } from "@/components/ToolsSection";
import { Footer } from "@/components/Footer";
import { getAllAppViews } from "@/data/github";

export const revalidate = 3600;

export default async function Home() {
  const views = await getAllAppViews();
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero views={views} />
        <AppsSection views={views} />
        <ToolsSection />
      </main>
      <Footer />
    </>
  );
}
