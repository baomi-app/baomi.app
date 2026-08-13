"use client";

import { useMemo, useState } from "react";
import { useLocale, type L } from "@/i18n";

type AnyRecord = Record<string, unknown>;
type RoutingMode = "china-direct" | "global" | "direct";

type ParsedHy2Server = {
  host: string;
  name: string;
  port: number;
  password: string;
  obfsPassword?: string;
  sni?: string;
  skipCertVerify: boolean;
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
  routing: { en: "Routing rules", zh: "分流规则" },
  publicHost: { en: "Public server address", zh: "服务器公网地址" },
  publicHostPlaceholder: { en: "Server domain or public IP", zh: "服务器域名或公网 IP" },
  publicHostHelp: {
    en: "Enter the domain or public IP used by clients. Do not include a protocol or port.",
    zh: "填写客户端连接时使用的域名或公网 IP，不要包含协议和端口。",
  },
  hy2Input: { en: "HY2 server config", zh: "HY2 服务端配置" },
  clashInput: { en: "Clash config", zh: "Clash 配置" },
  clashOutput: { en: "Generated Clash config", zh: "生成的 Clash 配置" },
  shadowrocketOutput: { en: "Shadowrocket links", zh: "Shadowrocket 链接" },
  useSample: { en: "Use sample", zh: "填入示例" },
  clear: { en: "Clear", zh: "清空" },
  copy: { en: "Copy", zh: "复制" },
  copied: { en: "Copied", zh: "已复制" },
  noClash: {
    en: "Paste a HY2 server config to generate Clash YAML.",
    zh: "粘贴 HY2 服务端配置后生成 Clash YAML。",
  },
  noShadowrocket: {
    en: "Paste a Clash config with hysteria2 proxies to generate Shadowrocket links.",
    zh: "粘贴包含 hysteria2 节点的 Clash 配置后生成 Shadowrocket 链接。",
  },
  notes: { en: "Notes", zh: "提示" },
  noteHost: {
    en: "If a server config only has listen: :443 or 0.0.0.0:443, the public host is not knowable from that text. The generated Clash config uses a replaceable placeholder.",
    zh: "如果服务端配置只有 listen: :443 或 0.0.0.0:443，配置文本里并没有公网域名；生成的 Clash 配置会使用可替换占位值。",
  },
  noteScope: {
    en: "Shadowrocket hy2:// links only describe nodes. Routing must be selected or imported separately inside Shadowrocket.",
    zh: "Shadowrocket 的 hy2:// 链接只描述节点，分流规则需要在 Shadowrocket 内单独选择或导入。",
  },
  error: { en: "Could not parse config", zh: "无法解析配置" },
  missingPassword: { en: "No HY2 password was found.", zh: "未找到 HY2 密码。" },
  inferredPlaceholder: {
    en: "No public host was found; replace REPLACE_WITH_SERVER_HOST in the output.",
    zh: "未从配置中找到公网域名；请替换输出里的 REPLACE_WITH_SERVER_HOST。",
  },
  missingSni: {
    en: "The server address is an IP. Enter the certificate domain as SNI if TLS verification is enabled.",
    zh: "服务器地址是 IP；如果启用了 TLS 证书验证，请填写证书域名作为 SNI。",
  },
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

function parseListen(listen: string | undefined): { host?: string; port: number } {
  if (!listen) return { port: 443 };
  const trimmed = listen.trim();
  const ipv6Match = trimmed.match(/^\[([^\]]+)\]:(\d+)$/);
  if (ipv6Match) return { host: normalizeHost(ipv6Match[1]), port: Number(ipv6Match[2]) };

  const portMatch = trimmed.match(/^(.*):(\d+)$/);
  if (portMatch) {
    return {
      host: normalizeHost(portMatch[1]),
      port: Number(portMatch[2]),
    };
  }

  const plainPort = Number(trimmed);
  if (Number.isFinite(plainPort)) return { port: plainPort };
  return { host: normalizeHost(trimmed), port: 443 };
}

function normalizeHost(host: string | undefined): string | undefined {
  if (!host) return undefined;
  const trimmed = host.trim().replace(/^\[|\]$/g, "");
  if (
    !trimmed ||
    trimmed === ":" ||
    trimmed === "0.0.0.0" ||
    trimmed === "::" ||
    trimmed === "localhost" ||
    trimmed === "127.0.0.1"
  ) {
    return undefined;
  }
  return trimmed;
}

function normalizePublicHostInput(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  const trimmed = value.trim();
  try {
    const url = new URL(trimmed.includes("://") ? trimmed : `//${trimmed}`, "https://hy2.local");
    return normalizeHost(url.hostname);
  } catch {
    return normalizeHost(trimmed);
  }
}

function hostnameFromUrl(value: string | undefined): string | undefined {
  if (!value) return undefined;
  try {
    return normalizeHost(new URL(value).hostname);
  } catch {
    return undefined;
  }
}

function isIpHost(host: string): boolean {
  if (host.includes(":")) return true;
  const parts = host.split(".");
  return parts.length === 4 && parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) <= 255);
}

function firstString(root: unknown, paths: string[][]): string | undefined {
  for (const path of paths) {
    const value = asString(getPath(root, path));
    if (value) return value;
  }
  return undefined;
}

function inferPublicHost(parsed: unknown, listenHost?: string, sni?: string): string {
  return (
    normalizeHost(
      firstString(parsed, [
        ["server"],
        ["host"],
        ["hostname"],
        ["domain"],
        ["publicHost"],
        ["public_host"],
        ["publicAddress"],
        ["public_address"],
        ["publicAddr"],
        ["public_addr"],
        ["tls", "serverName"],
        ["tls", "sni"],
      ]),
    ) ??
    normalizeHost(listenHost) ??
    normalizeHost(sni) ??
    "REPLACE_WITH_SERVER_HOST"
  );
}

function parseHy2ServerConfig(input: string, publicHostInput?: string): ParsedHy2Server {
  const parsed = parseConfig(input);
  const listen = asString(getPath(parsed, ["listen"]));
  const parsedListen = parseListen(listen);
  const password =
    asString(getPath(parsed, ["auth", "password"])) ??
    asString(getPath(parsed, ["auth", "config", "password"])) ??
    asString(getPath(parsed, ["password"])) ??
    "";
  const obfsPassword =
    asString(getPath(parsed, ["obfs", "salamander", "password"])) ??
    asString(getPath(parsed, ["obfs", "password"]));
  const configuredSni =
    asString(getPath(parsed, ["tls", "sni"])) ??
    asString(getPath(parsed, ["tls", "serverName"]));
  const host = normalizePublicHostInput(publicHostInput) ?? inferPublicHost(parsed, parsedListen.host, configuredSni);
  const configuredSniHost = normalizePublicHostInput(configuredSni);
  const masqueradeSni = hostnameFromUrl(
    asString(getPath(parsed, ["masquerade", "proxy", "url"])),
  );
  const automaticMasqueradeSni =
    host !== "REPLACE_WITH_SERVER_HOST" && isIpHost(host) && !configuredSniHost
      ? masqueradeSni
      : undefined;
  const sni = configuredSniHost ?? automaticMasqueradeSni ??
    (host !== "REPLACE_WITH_SERVER_HOST" && !isIpHost(host) ? host : undefined);
  const skipCertVerify = Boolean(
    masqueradeSni && sni === masqueradeSni && !configuredSniHost,
  );
  const warnings: string[] = [];

  if (!listen) warnings.push("listen");
  if (!password) warnings.push("password");
  if (host === "REPLACE_WITH_SERVER_HOST") warnings.push("host");
  if (host !== "REPLACE_WITH_SERVER_HOST" && isIpHost(host) && !sni) warnings.push("sni");

  return {
    host,
    name: `HY2 ${host === "REPLACE_WITH_SERVER_HOST" ? "Server" : host}`,
    port: parsedListen.port,
    password,
    obfsPassword,
    sni,
    skipCertVerify,
    warnings,
  };
}

function quoteYaml(value: string): string {
  return JSON.stringify(value);
}

function generateClashConfig({
  routingMode,
  server,
}: {
  routingMode: RoutingMode;
  server: ParsedHy2Server;
}): string {
  const lines = [
    "mixed-port: 7890",
    "allow-lan: false",
    "mode: rule",
    "log-level: info",
    "proxies:",
    `  - name: ${quoteYaml(server.name)}`,
    "    type: hysteria2",
    `    server: ${quoteYaml(server.host)}`,
    `    port: ${server.port}`,
    `    password: ${quoteYaml(server.password)}`,
    `    skip-cert-verify: ${server.skipCertVerify}`,
    "    alpn:",
    "      - h3",
  ];

  if (server.sni) lines.splice(10, 0, `    sni: ${quoteYaml(server.sni)}`);

  if (server.obfsPassword) {
    lines.push("    obfs: salamander", `    obfs-password: ${quoteYaml(server.obfsPassword)}`);
  }

  lines.push(
    "proxy-groups:",
    "  - name: Proxy",
    "    type: select",
    "    proxies:",
    `      - ${quoteYaml(server.name)}`,
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
      className="quiet-button min-h-9 px-3 text-xs disabled:cursor-not-allowed disabled:opacity-45"
    >
      {copied ? copiedLabel : label}
    </button>
  );
}

export function Hy2Tool() {
  const { t } = useLocale();
  const [routingMode, setRoutingMode] = useState<RoutingMode>("china-direct");
  const [publicHost, setPublicHost] = useState("");
  const [hy2Input, setHy2Input] = useState(sampleHy2Server);
  const [clashInput, setClashInput] = useState(sampleClash);

  const clashResult = useMemo(() => {
    if (!hy2Input.trim()) return { output: "", messages: [] as string[] };
    const messages: string[] = [];

    try {
      const parsed = parseHy2ServerConfig(hy2Input, publicHost);
      if (!parsed.password) messages.push(t(text.missingPassword));
      if (parsed.warnings.includes("host")) messages.push(t(text.inferredPlaceholder));
      if (parsed.warnings.includes("sni")) messages.push(t(text.missingSni));
      if (parsed.warnings.includes("listen")) {
        messages.push(t({ en: "No listen port was found; using 443.", zh: "未找到 listen 端口，已使用 443。" }));
      }
      if (!parsed.password) return { output: "", messages };
      return {
        output: generateClashConfig({
          routingMode,
          server: parsed,
        }),
        messages,
      };
    } catch {
      return { output: "", messages: [t(text.error)] };
    }
  }, [hy2Input, publicHost, routingMode, t]);

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
    <section className="hy2-workbench border-b border-[var(--rule)]">
      <div className="site-frame pb-20 pt-12 sm:pb-24 sm:pt-16">
        <header className="grid gap-6 border-b border-[var(--rule)] pb-10 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,.55fr)] lg:items-end lg:gap-16">
          <div>
            <h1 className="hy2-title">
              {t(text.title)}
            </h1>
            <p className="mt-4 max-w-[52ch] text-base leading-7 text-[var(--ink-muted)]">
              {t(text.intro)}
            </p>
          </div>
          <p className="flex items-start gap-3 text-sm leading-6 text-[var(--ink-muted)]">
            <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent)]" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>
            {t(text.privacy)}
          </p>
        </header>

        <div className="mt-8 grid gap-6 xl:grid-cols-2">
          <section className="tool-panel">
            <header className="tool-panel-header flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">{t(text.serverPanel)}</h2>
              <div className="flex gap-2">
                <button type="button" onClick={() => setHy2Input(sampleHy2Server)} className="quiet-button min-h-9 px-3 text-xs">{t(text.useSample)}</button>
                <button type="button" onClick={() => setHy2Input("")} className="quiet-button min-h-9 px-3 text-xs">{t(text.clear)}</button>
              </div>
            </header>

            <div className="tool-panel-body">
              <label className="block text-sm font-semibold">
                {t(text.publicHost)}
                <input type="text" value={publicHost} onChange={(event) => setPublicHost(event.target.value)} placeholder={t(text.publicHostPlaceholder)} autoComplete="off" spellCheck={false} className="field-input mt-2" />
                <span className="mt-1.5 block text-xs font-normal leading-5 text-[var(--ink-muted)]">{t(text.publicHostHelp)}</span>
              </label>

              <fieldset className="mt-5">
                <legend className="text-sm font-semibold">{t(text.routing)}</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-3">
                  {routingOptions.map((option) => (
                    <button key={option.value} type="button" onClick={() => setRoutingMode(option.value)} aria-pressed={routingMode === option.value} className="routing-option">
                      <span className="block text-sm font-semibold">{t(option.label)}</span>
                      <span className={`mt-1 block text-xs leading-5 ${routingMode === option.value ? "opacity-70" : "text-[var(--ink-muted)]"}`}>{t(option.description)}</span>
                    </button>
                  ))}
                </div>
              </fieldset>

              <label className="mt-5 block text-sm font-semibold">
                {t(text.hy2Input)}
                <textarea value={hy2Input} onChange={(event) => setHy2Input(event.target.value)} className="field-editor mt-2" spellCheck={false} />
              </label>

              <div className="mt-5 flex items-center justify-between gap-3">
                <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--ink-muted)]">{t(text.clashOutput)}</h3>
                <CopyButton value={clashResult.output} label={t(text.copy)} copiedLabel={t(text.copied)} />
              </div>
              <pre className="code-output mt-2">{clashResult.output || t(text.noClash)}</pre>
              {clashResult.messages.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-[var(--danger)]">{clashResult.messages.map((message) => <li key={message}>{message}</li>)}</ul>
              )}
            </div>
          </section>

          <section className="tool-panel">
            <header className="tool-panel-header flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-sm font-semibold">{t(text.clashPanel)}</h2>
              <div className="flex gap-2">
                <button type="button" onClick={() => setClashInput(clashResult.output || sampleClash)} className="quiet-button min-h-9 px-3 text-xs">{t(text.useSample)}</button>
                <button type="button" onClick={() => setClashInput("")} className="quiet-button min-h-9 px-3 text-xs">{t(text.clear)}</button>
              </div>
            </header>

            <div className="tool-panel-body">
              <label className="block text-sm font-semibold">
                {t(text.clashInput)}
                <textarea value={clashInput} onChange={(event) => setClashInput(event.target.value)} className="field-editor mt-2 min-h-[33.5rem]" spellCheck={false} />
              </label>

              <div className="mt-5 flex items-center justify-between gap-3">
                <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[.12em] text-[var(--ink-muted)]">{t(text.shadowrocketOutput)}</h3>
                <CopyButton value={shadowrocketResult.output} label={t(text.copy)} copiedLabel={t(text.copied)} />
              </div>
              <pre className="code-output mt-2 whitespace-pre-wrap break-all">{shadowrocketResult.output || t(text.noShadowrocket)}</pre>
              {shadowrocketResult.messages.length > 0 && (
                <ul className="mt-3 space-y-1 text-sm text-[var(--danger)]">{shadowrocketResult.messages.map((message) => <li key={message}>{message}</li>)}</ul>
              )}
            </div>
          </section>
        </div>

        <details className="mt-6 border-t border-[var(--rule)] py-4 text-sm text-[var(--ink-muted)]">
          <summary className="cursor-pointer font-semibold text-[var(--foreground)]">{t(text.notes)}</summary>
          <ul className="mt-4 grid gap-3 leading-6 md:grid-cols-2"><li>{t(text.noteHost)}</li><li>{t(text.noteScope)}</li></ul>
        </details>
      </div>
    </section>
  );
}
