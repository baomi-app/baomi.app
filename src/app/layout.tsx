import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    template: "%s — baomi",
  },
  description:
    "baomi builds small, sharp apps that do one thing well. Meet Pop, the instant macOS screenshot tool, and People's RSS, a privacy-first feed reader.",
  keywords: ["baomi", "Pop", "screenshot", "macOS", "People's RSS", "RSS reader"],
  authors: [{ name: "baomi" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "baomi — small, sharp apps",
    description:
      "Small, sharp apps that do one thing well. Pop for screenshots, People's RSS for feeds.",
    siteName: "baomi",
  },
  twitter: {
    card: "summary_large_image",
    title: "baomi — small, sharp apps",
    description:
      "Small, sharp apps that do one thing well. Pop for screenshots, People's RSS for feeds.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
