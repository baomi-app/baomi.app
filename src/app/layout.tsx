import type { Metadata } from "next";
import { LocaleProvider } from "@/i18n";
import "./globals.css";

const siteUrl = "https://baomi.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "baomi.app — small, sharp apps",
    template: "%s · baomi.app",
  },
  description:
    "Small tools by baomi — fast, focused, and a pleasure to use. Each app does one thing well.",
  keywords: ["baomi", "apps", "macOS", "tools", "open source"],
  authors: [{ name: "baomi" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "baomi.app — small, sharp apps",
    description:
      "Small tools by baomi — fast, focused, and a pleasure to use. Each app does one thing well.",
    siteName: "baomi.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "baomi.app — small, sharp apps",
    description:
      "Small tools by baomi — fast, focused, and a pleasure to use. Each app does one thing well.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
