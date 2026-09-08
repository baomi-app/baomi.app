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
    default: "baomi.app | Independent apps · 独立应用",
    template: "%s | baomi.app",
  },
  description:
    "Independent apps and browser tools for macOS, iOS, and the web. 为日常而做的独立应用与网页工具。",
  keywords: ["baomi", "apps", "macOS", "tools", "open source"],
  authors: [{ name: "baomi" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "baomi.app | Independent apps · 独立应用",
    description:
      "Independent apps and browser tools for macOS, iOS, and the web. 为日常而做的独立应用与网页工具。",
    siteName: "baomi.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "baomi.app | Independent apps · 独立应用",
    description:
      "Independent apps and browser tools for macOS, iOS, and the web. 为日常而做的独立应用与网页工具。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} h-full antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('baomi.theme');if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}document.documentElement.dataset.theme=t}catch(e){}})()`,
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <LocaleProvider>{children}</LocaleProvider>
      </body>
    </html>
  );
}
