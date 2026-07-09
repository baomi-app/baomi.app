import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Hy2Tool } from "@/components/Hy2Tool";
import { Nav } from "@/components/Nav";

export const metadata: Metadata = {
  title: "HY2 config converter / HY2 配置转换工具",
  description:
    "Convert Hysteria 2 server configs to Clash client YAML, and Clash HY2 proxies to Shadowrocket links. 支持 HY2 服务端配置转 Clash，以及 Clash HY2 节点转 Shadowrocket。",
  openGraph: {
    title: "HY2 config converter / HY2 配置转换工具",
    description:
      "Browser-side HY2, Clash, and Shadowrocket config conversion. 浏览器本地完成 HY2、Clash、Shadowrocket 配置转换。",
  },
};

export default function Hy2ToolPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <Hy2Tool />
      </main>
      <Footer />
    </>
  );
}
