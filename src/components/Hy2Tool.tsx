"use client";

import { useMemo, useState } from "react";
import { useLocale, type L } from "@/i18n";

type AnyRecord = Record<string, unknown>;
type RoutingMode = "china-direct" | "global" | "direct";

type ParsedHy2Server = {
  port: number;
  password: string;
  obfsPassword?: string;
  sni?: string;
  warnings: string[];
};

type ClashProxy = {
  name: string;
  type: string;
  server?: string;
  port?: number | string;
  password?: string;
  sni?: string;
  alpn?: string[] | string;
  obfs?: string;
  "obfs-password"?: string;
  "skip-cert-verify"?: boolean;
};

const sampleHy2Server = `listen: :443
tls:
  cert: server.crt
  key: server.key
auth:
  type: password
  password: change-me
obfs:
  type: salamander
  salamander:
    password: obfs-change-me
masquerade:
  type: proxy
  proxy:
    url: https://example.com/
    rewriteHost: true`;

const sampleClash = `mixed-port: 7890
allow-lan: false
mode: rule
log-level: info
proxies:
  - name: HY2 Example
    type: hysteria2
    server: example.com
    port: 443
    password: change-me
    sni: example.com
    obfs: salamander
    obfs-password: obfs-change-me
    skip-cert-verify: false
proxy-groups:
  - name: Proxy
    type: select
    proxies:
      - HY2 Example
      - DIRECT
rules:
  - MATCH,Proxy`;

const text = {
  badge: { en: "Client config workshop", zh: "客户端配置工坊" },
  title: { en: "HY2 config converter", zh: "HY2 配置转换工具" },
  intro: {
    en: "Turn a Hysteria 2 server config into a Clash client profile, then convert Clash HY2 proxies into Shadowrocket links.",
    zh: "把 Hysteria 2 服务端配置转换为 Clash 客户端配置，再把 Clash HY2 节点转换为 Shadowrocket 链接。",
  },
  privacy: {
    en: "Runs locally in your browser. Config text is not sent to a server.",
    zh: "转换在浏览器本地完成，配置文本不会发送到服务器。",
  },
  serverPanel: { en: "HY2 server to Clash", zh: "HY2 服务端转 Clash" },
  clashPanel: { en: "Clash to Shadowrocket", zh: "Clash 转 Shadowrocket" },
  serverHost: { en: "Public server host", zh: "公网服务器域名或 IP" },
  profileName: { en: "Profile name", zh: "节点名称" },
  sni: { en: "SNI override", zh: "SNI 覆盖" },
  sniHint: { en: "Optional. Defaults to the server host.", zh: "可选，默认使用公网服务器域名。" },
  skipVerify: { en: "Skip certificate verification", zh: "跳过证书校验" },
  routing: { en: "Routing rules", zh: "分流规则" },
  hy2Input: { en: "HY2 server config", zh: "HY2 服务端配置" },
  clashInput: { en: "Clash config", zh: "Clash 配置" },
  clashOutput: { en: "Generated Clash config", zh: "生成的 Clash 配置" },
  shadowrocketOutput: { en: "Shadowrocket links", zh: "Shadowrocket 链接" },
  useSample: { en: "Use sample", zh: "填入示例" },
  clear: { en: "Clear", zh: "清空" },
  copy: { en: "Copy", zh: "复制" },
  copied: { en: "Copied", zh: "已复制" },
  noClash: {
    en: "Enter a HY2 server config and public host to generate Clash YAML.",
    zh: "输入 HY2 服务端配置和公网域名后生成 Clash YAML。",
  },
  noShadowrocket: {
    en: "Paste a Clash config with hysteria2 proxies to generate Shadowrocket links.",
    zh: "粘贴包含 hysteria2 节点的 Clash 配置后生成 Shadowrocket 链接。",
  },
  notes: { en: "Notes", zh: "提示" },
  noteHost: {
    en: "A server config often listens on :443 or 0.0.0.0:443, so the public host is collected separately.",
    zh: "服务端配置通常只监听 :443 或 0.0.0.0:443，因此公网域名需要单独填写。",
  },
  noteScope: {
    en: "Shadowrocket hy2:// links only describe nodes. Routing must be selected or imported separately inside Shadowrocket.",
    zh: "Shadowrocket 的 hy2:// 链接只描述节点，分流规则需要在 Shadowrocket 内单独选择或导入。",
  },
  error: { en: "Could not parse config", zh: "无法解析配置" },
  missingHost: { en: "Add a public server host.", zh: "请填写公网服务器域名或 IP。" },
  missingPassword: { en: "No HY2 password was found.", zh: "未找到 HY2 密码。" },
  missingProxy: { en: "No hysteria2 proxies were found.", zh: "未找到 hysteria2 节点。" },
} satisfies Record<string, L>;

const routingOptions: Array<{
  value: RoutingMode;
  label: L;
  description: L;
}> = [
  {
    value: "china-direct",
    label: { en: "CN direct", zh: "国内直连" },
    description: {
      en: "LAN and China IPs go DIRECT; everything else uses Proxy.",
      zh: "局域网和中国大陆 IP 直连，其余走 Proxy。",
    },
  },
  {
    value: "global",
    label: { en: "Proxy all", zh: "全部代理" },
    description: { en: "Every request goes through Proxy.", zh: "所有流量都走 Proxy。" },
  },
  {
    value: "direct",
    label: { en: "Direct all", zh: "全部直连" },
    description: { en: "Keep the node but route traffic DIRECT.", zh: "保留节点，但流量全部直连。" },
  },
];

function stripComment(line: string): string {
  let quote: string | null = null;
  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if ((char === '"' || char === "'") && line[i - 1] !== "\\") {
      quote = quote === char ? null : quote ?? char;
    }
    if (char === "#" && !quote) return line.slice(0, i);
  }
  return line;
}

function parseScalar(value: string): unknown {
  const trimmed = value.trim();
  if (!trimmed) return "";
  if (trimmed === "true") return true;
  if (trimmed === "false") return false;
  if (trimmed === "null" || trimmed === "~") return null;
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(",").map((part) => parseScalar(part));
  }
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) {
    const inner = trimmed.slice(1, -1).trim();
    const object: AnyRecord = {};
    if (!inner) return object;
    inner.split(",").forEach((part) => {
      const [key, ...rest] = part.split(":");
      if (key && rest.length > 0) object[key.trim()] = parseScalar(rest.join(":"));
    });
    return object;
  }
  const numeric = Number(trimmed);
  if (!Number.isNaN(numeric) && /^-?\d+(\.\d+)?$/.test(trimmed)) return numeric;
  return trimmed;
}

function splitKeyValue(textValue: string): [string, string] {
  const index = textValue.indexOf(":");
  if (index === -1) return [textValue.trim(), ""];
  return [textValue.slice(0, index).trim(), textValue.slice(index + 1).trim()];
}

function parseYaml(input: string): unknown {
  const lines = input
    .split(/\r?\n/)
    .map((raw) => {
      const withoutComment = stripComment(raw).replace(/\t/g, "  ");
      return {
        indent: withoutComment.match(/^ */)?.[0].length ?? 0,
        text: withoutComment.trim(),
      };
    })
    .filter((line) => line.text.length > 0);

  function parseBlock(index: number, indent: number): [unknown, number] {
    if (index >= lines.length) return [{}, index];

    if (lines[index].indent < indent) return [{}, index];

    if (lines[index].text.startsWith("- ")) {
      const array: unknown[] = [];
      while (
        index < lines.length &&
        lines[index].indent === indent &&
        lines[index].text.startsWith("- ")
      ) {
        const itemText = lines[index].text.slice(2).trim();
        index += 1;

        if (!itemText) {
          const [child, nextIndex] = parseBlock(index, indent + 2);
          array.push(child);
          index = nextIndex;
          continue;
        }

        const [key, value] = splitKeyValue(itemText);
        if (itemText.includes(":") && key) {
          const object: AnyRecord = {};
          object[key] = value ? parseScalar(value) : {};
          if (index < lines.length && lines[index].indent > indent) {
            const [child, nextIndex] = parseBlock(index, lines[index].indent);
            if (isRecord(child)) Object.assign(object, child);
            index = nextIndex;
          }
          array.push(object);
        } else {
          array.push(parseScalar(itemText));
        }
      }
      return [array, index];
    }

    const object: AnyRecord = {};
    while (
      index < lines.length &&
      lines[index].indent === indent &&
      !lines[index].text.startsWith("- ")
    ) {
      const [key, value] = splitKeyValue(lines[index].text);
      index += 1;

      if (!key) continue;
      if (value) {
        object[key] = parseScalar(value);
        continue;
      }
      if (index < lines.length && lines[index].indent > indent) {
        const [child, nextIndex] = parseBlock(index, lines[index].indent);
        object[key] = child;
        index = nextIndex;
      } else {
        object[key] = {};
      }
    }
    return [object, index];
  }

  return parseBlock(0, lines[0]?.indent ?? 0)[0];
}

function parseConfig(input: string): unknown {
  const trimmed = input.trim();
  if (!trimmed) return {};
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) return JSON.parse(trimmed);
  return parseYaml(trimmed);
}

function isRecord(value: unknown): value is AnyRecord {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function asString(value: unknown): string | undefined {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return undefined;
}

function getPath(root: unknown, path: string[]): unknown {
  return path.reduce<unknown>((current, key) => {
    if (!isRecord(current)) return undefined;
    return current[key];
  }, root);
}

function parsePort(listen: string | undefined): number {
  if (!listen) return 443;
  const ipv6Match = listen.match(/\]:(\d+)$/);
  if (ipv6Match) return Number(ipv6Match[1]);
  const portMatch = listen.match(/:(\d+)$/);
  if (portMatch) return Number(portMatch[1]);
  const plainPort = Number(listen);
  return Number.isFinite(plainPort) ? plainPort : 443;
}

function parseHy2ServerConfig(input: string, fallbackSni?: string): ParsedHy2Server {
  const parsed = parseConfig(input);
  const listen = asString(getPath(parsed, ["listen"]));
  const password =
    asString(getPath(parsed, ["auth", "password"])) ??
    asString(getPath(parsed, ["auth", "config", "password"])) ??
    asString(getPath(parsed, ["password"])) ??
    "";
  const obfsPassword =
    asString(getPath(parsed, ["obfs", "salamander", "password"])) ??
    asString(getPath(parsed, ["obfs", "password"]));
  const sni =
    asString(getPath(parsed, ["tls", "sni"])) ??
    asString(getPath(parsed, ["tls", "serverName"])) ??
    fallbackSni;
  const warnings: string[] = [];

  if (!listen) warnings.push("listen");
  if (!password) warnings.push("password");

  return {
    port: parsePort(listen),
    password,
    obfsPassword,
    sni,
    warnings,
  };
}

function quoteYaml(value: string): string {
  return JSON.stringify(value);
}

function generateClashConfig({
  host,
  name,
  routingMode,
  sni,
  skipVerify,
  server,
}: {
  host: string;
  name: string;
  routingMode: RoutingMode;
  sni: string;
  skipVerify: boolean;
  server: ParsedHy2Server;
}): string {
  const lines = [
    "mixed-port: 7890",
    "allow-lan: false",
    "mode: rule",
    "log-level: info",
    "proxies:",
    `  - name: ${quoteYaml(name)}`,
    "    type: hysteria2",
    `    server: ${quoteYaml(host)}`,
    `    port: ${server.port}`,
    `    password: ${quoteYaml(server.password)}`,
    `    sni: ${quoteYaml(sni)}`,
    `    skip-cert-verify: ${skipVerify ? "true" : "false"}`,
    "    alpn:",
    "      - h3",
  ];

  if (server.obfsPassword) {
    lines.push("    obfs: salamander", `    obfs-password: ${quoteYaml(server.obfsPassword)}`);
  }

  lines.push(
    "proxy-groups:",
    "  - name: Proxy",
    "    type: select",
    "    proxies:",
    `      - ${quoteYaml(name)}`,
    "      - DIRECT",
    "rules:",
  );

  getClashRules(routingMode).forEach((rule) => lines.push(`  - ${rule}`));

  return `${lines.join("\n")}\n`;
}

function getClashRules(mode: RoutingMode): string[] {
  if (mode === "global") return ["MATCH,Proxy"];
  if (mode === "direct") return ["MATCH,DIRECT"];
  return [
    "DOMAIN-SUFFIX,local,DIRECT",
    "IP-CIDR,10.0.0.0/8,DIRECT,no-resolve",
    "IP-CIDR,172.16.0.0/12,DIRECT,no-resolve",
    "IP-CIDR,192.168.0.0/16,DIRECT,no-resolve",
    "IP-CIDR,127.0.0.0/8,DIRECT,no-resolve",
    "GEOIP,CN,DIRECT",
    "MATCH,Proxy",
  ];
}

function normalizeProxy(value: unknown): ClashProxy | null {
  if (!isRecord(value)) return null;
  const type = asString(value.type)?.toLowerCase();
  if (type !== "hysteria2" && type !== "hy2") return null;
  return value as ClashProxy;
}

function extractClashProxies(input: string): ClashProxy[] {
  const parsed = parseConfig(input);
  if (Array.isArray(parsed)) return parsed.map(normalizeProxy).filter(Boolean) as ClashProxy[];
  if (!isRecord(parsed)) return [];
  const proxies = parsed.proxies;
  if (Array.isArray(proxies)) {
    return proxies.map(normalizeProxy).filter(Boolean) as ClashProxy[];
  }
  const single = normalizeProxy(parsed);
  return single ? [single] : [];
}

function buildShadowrocketLink(proxy: ClashProxy): string | null {
  const server = asString(proxy.server);
  const port = asString(proxy.port);
  const password = asString(proxy.password);
  if (!server || !port || !password) return null;

  const query = new URLSearchParams();
  if (proxy.sni) query.set("sni", proxy.sni);
  if (proxy["skip-cert-verify"]) query.set("insecure", "1");
  if (proxy.obfs) query.set("obfs", proxy.obfs);
  if (proxy["obfs-password"]) query.set("obfs-password", proxy["obfs-password"]);
  if (proxy.alpn) {
    query.set("alpn", Array.isArray(proxy.alpn) ? proxy.alpn.join(",") : proxy.alpn);
  }

  const suffix = query.toString() ? `?${query.toString()}` : "";
  const name = encodeURIComponent(proxy.name || `${server}:${port}`);
  return `hy2://${encodeURIComponent(password)}@${server}:${port}${suffix}#${name}`;
}

function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      type="button"
      disabled={!value}
      onClick={async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1200);
      }}
      className="rounded-md border border-[var(--foreground)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-white disabled:cursor-not-allowed disabled:opacity-45"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

export function Hy2Tool() {
  const { t } = useLocale();
  const [host, setHost] = useState("example.com");
  const [name, setName] = useState("HY2");
  const [routingMode, setRoutingMode] = useState<RoutingMode>("china-direct");
  const [sni, setSni] = useState("");
  const [skipVerify, setSkipVerify] = useState(false);
  const [hy2Input, setHy2Input] = useState(sampleHy2Server);
  const [clashInput, setClashInput] = useState(sampleClash);

  const clashResult = useMemo(() => {
    if (!hy2Input.trim()) return { output: "", messages: [] as string[] };
    const messages: string[] = [];
    const trimmedHost = host.trim();
    if (!trimmedHost) messages.push(t(text.missingHost));

    try {
      const parsed = parseHy2ServerConfig(hy2Input, sni.trim() || trimmedHost);
      if (!parsed.password) messages.push(t(text.missingPassword));
      if (parsed.warnings.includes("listen")) {
        messages.push(t({ en: "No listen port was found; using 443.", zh: "未找到 listen 端口，已使用 443。" }));
      }
      if (!trimmedHost || !parsed.password) return { output: "", messages };
      return {
        output: generateClashConfig({
          host: trimmedHost,
          name: name.trim() || "HY2",
          routingMode,
          sni: sni.trim() || parsed.sni || trimmedHost,
          skipVerify,
          server: parsed,
        }),
        messages,
      };
    } catch {
      return { output: "", messages: [t(text.error)] };
    }
  }, [host, hy2Input, name, routingMode, skipVerify, sni, t]);

  const shadowrocketResult = useMemo(() => {
    if (!clashInput.trim()) return { output: "", messages: [] as string[] };
    try {
      const links = extractClashProxies(clashInput)
        .map(buildShadowrocketLink)
        .filter(Boolean);
      if (links.length === 0) return { output: "", messages: [t(text.missingProxy)] };
      return { output: `${links.join("\n")}\n`, messages: [] as string[] };
    } catch {
      return { output: "", messages: [t(text.error)] };
    }
  }, [clashInput, t]);

  return (
    <section className="relative overflow-hidden border-b border-[var(--rule)]">
      <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 sm:pt-16">
        <span className="label-cut inline-flex items-center gap-2 bg-[var(--saffron)] px-3.5 py-1.5 pr-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--foreground)] shadow-[4px_4px_0_var(--foreground)]">
          <span className="h-2 w-2 bg-[var(--tomato)]" />
          {t(text.badge)}
        </span>

        <div className="mt-8 grid gap-8 border-b border-[var(--foreground)] pb-8 lg:grid-cols-[1fr_0.72fr] lg:items-end">
          <div>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-normal text-[var(--foreground)] sm:text-7xl">
              {t(text.title)}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--ink-muted)]">
              {t(text.intro)}
            </p>
          </div>
          <p className="border border-[var(--foreground)] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--ink-muted)] shadow-[5px_5px_0_var(--foreground)]">
            {t(text.privacy)}
          </p>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <div className="border border-[var(--foreground)] bg-[var(--surface)] p-4 shadow-[6px_6px_0_var(--foreground)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--rule)] pb-4">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
                {t(text.serverPanel)}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setHy2Input(sampleHy2Server)}
                  className="rounded-md border border-[var(--rule)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {t(text.useSample)}
                </button>
                <button
                  type="button"
                  onClick={() => setHy2Input("")}
                  className="rounded-md border border-[var(--rule)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {t(text.clear)}
                </button>
              </div>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <label className="block text-sm font-semibold text-[var(--foreground)]">
                {t(text.serverHost)}
                <input
                  value={host}
                  onChange={(event) => setHost(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-[var(--rule)] bg-white px-3 font-mono text-sm outline-none focus:border-[var(--foreground)]"
                  placeholder="vpn.example.com"
                />
              </label>
              <label className="block text-sm font-semibold text-[var(--foreground)]">
                {t(text.profileName)}
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-[var(--rule)] bg-white px-3 text-sm outline-none focus:border-[var(--foreground)]"
                  placeholder="HY2"
                />
              </label>
              <label className="block text-sm font-semibold text-[var(--foreground)] sm:col-span-2">
                {t(text.sni)}
                <input
                  value={sni}
                  onChange={(event) => setSni(event.target.value)}
                  className="mt-2 h-11 w-full rounded-md border border-[var(--rule)] bg-white px-3 font-mono text-sm outline-none focus:border-[var(--foreground)]"
                  placeholder={t(text.sniHint)}
                />
              </label>
              <label className="flex min-h-11 items-center gap-3 rounded-md border border-[var(--rule)] bg-white px-3 text-sm font-semibold text-[var(--foreground)] sm:col-span-2">
                <input
                  type="checkbox"
                  checked={skipVerify}
                  onChange={(event) => setSkipVerify(event.target.checked)}
                  className="h-4 w-4 accent-[var(--teal)]"
                />
                {t(text.skipVerify)}
              </label>
            </div>

            <div className="mt-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {t(text.routing)}
              </p>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {routingOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRoutingMode(option.value)}
                    aria-pressed={routingMode === option.value}
                    className={
                      routingMode === option.value
                        ? "rounded-md border border-[var(--foreground)] bg-[var(--foreground)] p-3 text-left text-white"
                        : "rounded-md border border-[var(--rule)] bg-white p-3 text-left text-[var(--foreground)] transition-colors hover:border-[var(--foreground)]"
                    }
                  >
                    <span className="block text-sm font-semibold">{t(option.label)}</span>
                    <span className={routingMode === option.value ? "mt-1 block text-xs leading-5 text-white/75" : "mt-1 block text-xs leading-5 text-[var(--ink-muted)]"}>
                      {t(option.description)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-4 block text-sm font-semibold text-[var(--foreground)]">
              {t(text.hy2Input)}
              <textarea
                value={hy2Input}
                onChange={(event) => setHy2Input(event.target.value)}
                className="mt-2 min-h-[22rem] w-full resize-y rounded-md border border-[var(--rule)] bg-white p-3 font-mono text-xs leading-5 outline-none focus:border-[var(--foreground)]"
                spellCheck={false}
              />
            </label>

            <div className="mt-4 flex items-center justify-between gap-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
                {t(text.clashOutput)}
              </h3>
              <CopyButton value={clashResult.output} label={t(text.copy)} copiedLabel={t(text.copied)} />
            </div>
            <pre className="mt-2 min-h-[18rem] overflow-auto rounded-md border border-[var(--rule)] bg-[var(--foreground)] p-3 text-xs leading-5 text-white">
              {clashResult.output || t(text.noClash)}
            </pre>
            {clashResult.messages.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-[var(--tomato)]">
                {clashResult.messages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            )}
          </div>

          <div className="border border-[var(--foreground)] bg-[var(--surface)] p-4 shadow-[6px_6px_0_var(--foreground)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--rule)] pb-4">
              <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
                {t(text.clashPanel)}
              </h2>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setClashInput(clashResult.output || sampleClash)}
                  className="rounded-md border border-[var(--rule)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {t(text.useSample)}
                </button>
                <button
                  type="button"
                  onClick={() => setClashInput("")}
                  className="rounded-md border border-[var(--rule)] bg-white px-3 py-2 text-xs font-semibold text-[var(--ink-muted)] transition-colors hover:text-[var(--foreground)]"
                >
                  {t(text.clear)}
                </button>
              </div>
            </div>

            <label className="mt-4 block text-sm font-semibold text-[var(--foreground)]">
              {t(text.clashInput)}
              <textarea
                value={clashInput}
                onChange={(event) => setClashInput(event.target.value)}
                className="mt-2 min-h-[28.45rem] w-full resize-y rounded-md border border-[var(--rule)] bg-white p-3 font-mono text-xs leading-5 outline-none focus:border-[var(--foreground)]"
                spellCheck={false}
              />
            </label>

            <div className="mt-4 flex items-center justify-between gap-3">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--teal)]">
                {t(text.shadowrocketOutput)}
              </h3>
              <CopyButton value={shadowrocketResult.output} label={t(text.copy)} copiedLabel={t(text.copied)} />
            </div>
            <pre className="mt-2 min-h-[18rem] overflow-auto whitespace-pre-wrap break-all rounded-md border border-[var(--rule)] bg-[var(--foreground)] p-3 text-xs leading-5 text-white">
              {shadowrocketResult.output || t(text.noShadowrocket)}
            </pre>
            {shadowrocketResult.messages.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-[var(--tomato)]">
                {shadowrocketResult.messages.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="mt-8 border border-[var(--rule)] bg-[var(--surface)] p-4 text-sm leading-6 text-[var(--ink-muted)]">
          <h2 className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tomato)]">
            {t(text.notes)}
          </h2>
          <ul className="mt-3 grid gap-2 md:grid-cols-2">
            <li>{t(text.noteHost)}</li>
            <li>{t(text.noteScope)}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
