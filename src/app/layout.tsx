import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LocaleProvider } from "@/i18n";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono-next" });

const siteUrl = "https://baomi.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "baomi.app | independent apps and tools",
    template: "%s | baomi.app",
  },
  description:
    "Independent apps and browser tools for macOS, iOS, and the web.",
  keywords: ["baomi", "apps", "macOS", "tools", "open source"],
  authors: [{ name: "baomi" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "baomi.app | independent apps and tools",
    description:
      "Independent apps and browser tools for macOS, iOS, and the web.",
    siteName: "baomi.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "baomi.app | independent apps and tools",
    description:
      "Independent apps and browser tools for macOS, iOS, and the web.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
