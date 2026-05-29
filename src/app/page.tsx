import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { AppCard } from "@/components/AppCard";
import { Footer } from "@/components/Footer";
import { apps } from "@/data/apps";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hero />

        <section id="apps" className="mx-auto max-w-5xl px-6 pb-28">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                The apps
              </h2>
              <p className="mt-2 text-white/55">
                Open source. Built to be fast and stay out of your way.
              </p>
            </div>
            <span className="hidden font-mono text-sm text-white/30 sm:block">
              {apps.length.toString().padStart(2, "0")} apps
            </span>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {apps.map((app) => (
              <AppCard key={app.id} app={app} />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
