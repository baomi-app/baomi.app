import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Nav } from "@/components/Nav";
import { ToolsSection } from "@/components/ToolsSection";

export const metadata: Metadata = {
  title: "Tools / 工具",
  description:
    "Browser-side utility tools from baomi.app. baomi.app 的浏览器本地小工具。",
};

export default function ToolsPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <ToolsSection standalone />
      </main>
      <Footer />
    </>
  );
}
