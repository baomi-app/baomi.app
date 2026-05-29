# baomi.app

The home of **baomi** — a tiny studio building small, sharp apps that do one thing well.

> 咔，一爆即得。

This repo is the marketing / showcase site for baomi's apps, built with Next.js and deployed on Vercel.

## Featured apps

| App | What it is | Repo |
| --- | --- | --- |
| **Pop** | An instant macOS screenshot tool (⌘⇧X → capture → clipboard). | [baomi-app/pop](https://github.com/baomi-app/pop) |
| **People's RSS** | A minimal, self-hosted RSS/Atom reader on Vercel with BYO-key AI summaries. | [people-s-organization/people-s-rss](https://github.com/people-s-organization/people-s-rss) |

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [Tailwind CSS 4](https://tailwindcss.com)
- TypeScript
- Deployed on [Vercel](https://vercel.com)

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding an app

App data lives in [`src/data/apps.ts`](src/data/apps.ts). Add an entry to the
`apps` array — name, tagline, features, tech, platform, and links — and it shows
up automatically on the home page.
