import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { LocaleProvider } from "@/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://baomi.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "baomi — small, sharp apps",
    template: "%s · baomi",
  },
  description:
    "Small tools by baomi — fast, focused, and a pleasure to use. Each app does one thing well.",
  keywords: ["baomi", "apps", "macOS", "tools", "open source"],
  authors: [{ name: "baomi" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "baomi — small, sharp apps",
    description:
      "Small tools by baomi — fast, focused, and a pleasure to use. Each app does one thing well.",
    siteName: "baomi",
  },
  twitter: {
    card: "summary_large_image",
    title: "baomi — small, sharp apps",
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
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
