# baomi.app

English · [中文](README.zh.md)

The website for **baomi** — small, sharp apps that do one thing well. Live at **[baomi.app](https://baomi.app)**.

Built with Next.js 16 + Tailwind, deployed on Vercel. Bilingual (EN / 中文).

## How it works

Each app shown on the site is split into two parts:

- **Registration** lives here, in [`src/data/apps.ts`](src/data/apps.ts): just the URL slug and the GitHub repo.
- **Content** (all the bilingual text + the icon) lives in the **app's own repo**, in a `baomi.json` file on its default branch. The site fetches it from `raw.githubusercontent.com` and refreshes hourly (ISR) — so editing `baomi.json` updates the site without touching this repo or redeploying.
- **Live stats** (latest version, star count, last-updated date) are pulled from the GitHub API, also hourly.

So adding or updating an app does **not** require changing this website's code (beyond the one-time registration).

## Add a new app

1. **Drop a `baomi.json` in the app's repo** (root of the default branch). See the spec below.
2. **Register it** in [`src/data/apps.ts`](src/data/apps.ts):
   ```ts
   { id: "myapp", repo: "owner/myapp" }
   ```
   - `id` is the URL slug → the detail page is `/myapp`.
   - That's the whole registration — everything visual/textual comes from the repo's `baomi.json`.

The home-page card and the `/<id>` detail page are generated automatically. The app count on the home page is just how many apps are registered.

> Apps are **not** auto-discovered from a GitHub org — registration is explicit, so apps can live in any org (e.g. People's RSS is under `people-s-organization`) and you control order and which repos appear.

## `baomi.json` spec

Full JSON Schema: [`baomi.schema.json`](baomi.schema.json). All user-facing text is required in both `en` and `zh`.

| Field | Type | Notes |
| --- | --- | --- |
| `name` | string | Brand name (not localized) |
| `status` | `"released"` \| `"beta"` \| `"wip"` | Shown as a badge; label is localized by the site |
| `icon` | string (optional) | Repo-relative path (`"icon.png"`, `"icon.svg"`) or an absolute URL. Falls back to the name's first letter |
| `accent` | `{ from, to }` (optional) | Brand gradient as two hex colors, e.g. `{ "from": "#fbbf24", "to": "#f97316" }`. Falls back to a neutral gradient |
| `platform` | `{ en, zh }` | e.g. `{ "en": "macOS", "zh": "macOS" }` |
| `tagline` | `{ en, zh }` | One line, shown on the card and detail header |
| `description` | `{ en, zh }` | A short paragraph on the detail page |
| `features` | `{ en: string[], zh: string[] }` | Bullet list on the detail page |
| `tech` | string[] | Tech-stack tags (not localized) |
| `privacy` | `{ title?, summary?, updated, files }` (optional) | Privacy page metadata and repo-relative Markdown files. When present, `/<id>/privacy` is rendered from the app repo |
| `links` | `{ label: { en, zh }, href }[]` | Buttons in order; **first = primary**, rest = secondary |

Example:

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

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
```

### Environment

| Var | Required | Purpose |
| --- | --- | --- |
| `GITHUB_TOKEN` | required for private app repos | Lets the site read each app repo's `baomi.json` and media. Use a fine-grained token with read-only Contents access to the private app repositories. In GitHub Actions, this is provided through the `APP_CONTENT_GITHUB_TOKEN` repository secret. |

### GitHub Actions deployment

Production is deployed by GitHub Actions on every push to `main`.

Configure these repository variables and secrets:

| Name | Type | Purpose |
| --- | --- |
| `CLOUDFLARE_ACCOUNT_ID` | variable | Cloudflare account used by Wrangler. |
| `CLOUDFLARE_API_TOKEN` | secret | Deploys the Worker through Wrangler. |
| `APP_CONTENT_GITHUB_TOKEN` | secret | Exposed as `GITHUB_TOKEN` during the build so SSG can read private app content. |

## What's hardcoded in this repo

UI chrome and branding — the nav, hero copy, section headings, status-badge labels, the logo, the OG share image, and the i18n strings — all live here (mostly [`src/i18n.tsx`](src/i18n.tsx)). Per-app content does not.
