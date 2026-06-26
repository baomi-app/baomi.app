# baomi.app

[English](README.md) · 中文

**baomi** 的官网——小而精的应用，只把一件事做好。线上地址：**[baomi.app](https://baomi.app)**。

基于 Next.js 16 + Tailwind 构建，部署在 Vercel，支持中英双语。

## 工作原理

网站上每个 app 分成两部分：

- **注册信息**放在本仓库的 [`src/data/apps.ts`](src/data/apps.ts)：只有 URL slug 和 GitHub 仓库。
- **内容**（全部双语文案 + 图标）放在 **app 自己的仓库**里，是默认分支根目录下的一个 `baomi.json` 文件。网站从 `raw.githubusercontent.com` 读取，每小时刷新一次（ISR）——所以改 `baomi.json` 就能更新网站，**无需改本仓库、也无需重新部署**。
- **实时数据**（最新版本、Star 数、最近更新时间）从 GitHub API 拉取，同样每小时刷新。

因此，新增或更新一个 app **不需要**改网站代码（除了一次性的注册）。

## 新增一个 app

1. **在该 app 的仓库里放一个 `baomi.json`**（默认分支根目录）。格式见下方规范。
2. **在 [`src/data/apps.ts`](src/data/apps.ts) 里注册**：
   ```ts
   { id: "myapp", repo: "owner/myapp" }
   ```
   - `id` 是 URL slug → 详情页就是 `/myapp`。
   - 注册就这一行——所有视觉/文字内容都来自该仓库的 `baomi.json`。

首页卡片和 `/<id>` 详情页会自动生成。首页上的「应用个数」就是注册了多少个 app。

> app **不会**从某个 GitHub 组织自动发现——注册是显式的。所以 app 可以放在任意组织（例如 People's RSS 在 `people-s-organization` 下），并且你能控制顺序和哪些仓库露出。

## `baomi.json` 规范

完整 JSON Schema：[`baomi.schema.json`](baomi.schema.json)。所有面向用户的文字都必须同时提供 `en` 和 `zh`。

| 字段 | 类型 | 说明 |
| --- | --- | --- |
| `name` | string | 品牌名（不本地化） |
| `status` | `"released"` \| `"beta"` \| `"wip"` | 显示为徽章；文字由网站本地化（已发布 / 测试版 / 开发中） |
| `icon` | string（可选） | 仓库内相对路径（`"icon.png"`、`"icon.svg"`）或绝对 URL。缺省时用名字首字母 |
| `accent` | `{ from, to }`（可选） | 品牌渐变，两个十六进制颜色，如 `{ "from": "#fbbf24", "to": "#f97316" }`。缺省用中性灰渐变 |
| `platform` | `{ en, zh }` | 如 `{ "en": "macOS", "zh": "macOS" }` |
| `tagline` | `{ en, zh }` | 一句话，显示在卡片和详情页头部 |
| `description` | `{ en, zh }` | 一小段描述，显示在详情页 |
| `features` | `{ en: string[], zh: string[] }` | 详情页的功能列表 |
| `tech` | string[] | 技术栈标签（不本地化） |
| `privacy` | `{ title?, summary?, updated, files }`（可选） | 隐私页元信息和仓库内 Markdown 文件路径。存在时，`/<id>/privacy` 会从该 app 仓库渲染 |
| `links` | `{ label: { en, zh }, href }[]` | 按钮，按顺序排列；**第一个为主按钮**，其余为次按钮 |

示例：

```json
{
  "name": "Pop",
  "status": "released",
  "icon": "icon.png",
  "accent": { "from": "#fbbf24", "to": "#f97316" },
  "platform": { "en": "macOS", "zh": "macOS" },
  "tagline": { "en": "A macOS screenshot tool.", "zh": "macOS 截图工具。" },
  "description": { "en": "…", "zh": "…" },
  "features": { "en": ["…"], "zh": ["…"] },
  "tech": ["Swift", "AppKit"],
  "privacy": {
    "title": { "en": "Pop Privacy Policy", "zh": "Pop 隐私政策" },
    "summary": { "en": "Privacy policy for Pop.", "zh": "Pop 隐私政策。" },
    "updated": { "en": "June 2026", "zh": "2026年6月" },
    "files": { "en": "docs/privacy.en.md", "zh": "docs/privacy.zh.md" }
  },
  "links": [
    { "label": { "en": "Download", "zh": "下载" }, "href": "https://…" },
    { "label": { "en": "GitHub", "zh": "GitHub" }, "href": "https://…" }
  ]
}
```

## 本地开发

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

### 环境变量

| 变量 | 是否必需 | 用途 |
| --- | --- | --- |
| `GITHUB_TOKEN` | 私有 app 仓库必需 | 让站点读取各 app 仓库里的 `baomi.json` 和媒体资源。建议使用 fine-grained token，只给私有 app 仓库的 Contents 只读权限。在 GitHub Actions 中通过仓库 secret `APP_CONTENT_GITHUB_TOKEN` 注入。 |

### GitHub Actions 部署

生产环境由 GitHub Actions 部署：每次 push 到 `main` 后自动构建并发布。

需要配置这些仓库变量和 secret：

| 名称 | 类型 | 用途 |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | 仓库变量 | Wrangler 使用的 Cloudflare account。 |
| `CLOUDFLARE_API_TOKEN` | 仓库 secret | 让 Wrangler 部署 Worker。 |
| `APP_CONTENT_GITHUB_TOKEN` | 仓库 secret | 构建时作为 `GITHUB_TOKEN` 注入，让 SSG 读取私有 app 内容。 |

## 本仓库里哪些是写死的

UI 外壳和品牌——导航、hero 文案、栏目标题、状态徽章文字、logo、OG 分享图、i18n 字符串——都在本仓库（主要在 [`src/i18n.tsx`](src/i18n.tsx)）。各 app 的内容则不在这里。
