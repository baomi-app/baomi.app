import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Footer } from "@/components/Footer";
import { Markdown } from "@/components/Markdown";
import { Nav } from "@/components/Nav";
import { getConfig } from "@/data/apps";
import { getAppContent, getRepoText } from "@/data/github";

type PrivacyPageProps = {
  params: Promise<{ slug: string }>;
};

type PrivacyView = {
  name: string;
  title: {
    en: string;
    zh: string;
  };
  summary: {
    en: string;
    zh: string;
  };
  updated: {
    en: string;
    zh: string;
  };
  body: {
    en: string;
    zh: string;
  };
};

const getPrivacyView = cache(
  async (slug: string): Promise<PrivacyView | null> => {
    const config = getConfig(slug);
    if (!config) return null;

    const content = await getAppContent(config);
    const privacy = content?.privacy;
    if (!content || !privacy) return null;

    const [enBody, zhBody] = await Promise.all([
      getRepoText(config, privacy.files.en),
      getRepoText(config, privacy.files.zh),
    ]);
    if (!enBody || !zhBody) return null;

    return {
      name: content.name,
      title: privacy.title ?? {
        en: `${content.name} Privacy Policy`,
        zh: `${content.name} 隐私政策`,
      },
      summary: privacy.summary ?? {
        en: `Privacy policy for ${content.name}.`,
        zh: `${content.name} 隐私政策。`,
      },
      updated: privacy.updated,
      body: {
        en: enBody,
        zh: zhBody,
      },
    };
  }
);

export async function generateMetadata({
  params,
}: PrivacyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const privacy = await getPrivacyView(slug);

  if (!privacy) {
    return { title: "Not found" };
  }

  const title = `${privacy.title.en} / ${privacy.title.zh}`;
  const description = `${privacy.summary.en} ${privacy.summary.zh}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

function PrivacyArticle({
  body,
  heading,
  locale,
  updated,
}: {
  body: string;
  heading: string;
  locale: "en" | "zh";
  updated: string;
}) {
  const isEnglish = locale === "en";

  return (
    <article className="select-text">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-white/40">
        {isEnglish ? "Privacy Policy" : "隐私政策"}
      </p>
      <h1 className="border-b border-white/10 pb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
        {heading}
      </h1>
      <p className="mt-4 text-xs text-white/40">
        {isEnglish ? "Last Updated: " : "最近更新："}
        {updated}
      </p>
      <Markdown text={body} className="mt-8" />
    </article>
  );
}

export default async function AppPrivacyPage({ params }: PrivacyPageProps) {
  const { slug } = await params;
  const privacy = await getPrivacyView(slug);

  if (!privacy) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-6 py-16 text-white/80 sm:py-20">
          <PrivacyArticle
            body={privacy.body.en}
            heading={privacy.title.en}
            locale="en"
            updated={privacy.updated.en}
          />
          <hr className="my-12 border-white/10" />
          <PrivacyArticle
            body={privacy.body.zh}
            heading={privacy.title.zh}
            locale="zh"
            updated={privacy.updated.zh}
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
