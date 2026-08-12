import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";
import { Footer } from "@/components/Footer";
import { PrivacyDocument } from "@/components/PrivacyDocument";
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

export default async function AppPrivacyPage({ params }: PrivacyPageProps) {
  const { slug } = await params;
  const privacy = await getPrivacyView(slug);

  if (!privacy) notFound();

  return (
    <>
      <Nav />
      <main className="flex-1">
        <PrivacyDocument
          appSlug={slug}
          appName={privacy.name}
          title={privacy.title}
          updated={privacy.updated}
          body={privacy.body}
        />
      </main>
      <Footer />
    </>
  );
}
