# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Start Next.js dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run typecheck    # TypeScript type check (tsc --noEmit)
npm run check        # lint + typecheck + build (run before committing)
```

### Docker

```bash
docker compose up dev   # Dev server with hot reload on http://localhost:3001
docker compose up app   # Production build on http://localhost:3000
```

## Architecture

This is a **single-page resume website** styled as a Unix man page. There is effectively one route (`src/app/page.tsx`) that renders `TerminalPage`.

### Data flow

All resume content lives in **`src/data/translations.ts`** as a flat key→string map for two locales (`en` | `es`). `TerminalPage` calls `t(key)` via a `useCallback`-memoized lookup. When adding or editing content, every key must be present in both `en` and `es` objects.

Structured data (skills, experience entries, education, recommendations) is defined as inline arrays inside `TerminalPage.tsx` itself — not in the translations file — because only translatable strings go through `t()`.

### Styling

All CSS is plain CSS in **`src/app/globals.css`** — no Tailwind utility classes are used in the main component despite Tailwind being installed. Design tokens are CSS custom properties on `:root` (`--bg`, `--amber`, `--cyan`, `--green`, `--white`, `--muted`, `--border`). The CRT terminal aesthetic (scan lines, vignette, monospace fonts) is applied globally via `body` and `body::before`.

### i18n / locale switching

`TerminalPage` holds `locale` state (`"en" | "es"`). Switching locale triggers a 180 ms CSS fade (`lang-fade` class) before swapping. All UI text that changes with locale gets `className={`t ${fadeClass}`}`. Hard-coded content (phone, email, org names) does not use `t()`.

### Icons

All icons (flags, contact icons) are inline SVG components defined at the top of `TerminalPage.tsx` — no icon library is used here despite Lucide React being available.

## Code conventions

- TypeScript strict mode, no `any`
- Named exports, PascalCase components, camelCase utils
- 2-space indentation
- `cn()` utility from `src/lib/utils.ts` (re-export of `clsx` + `tailwind-merge`) is available but the main page uses plain CSS class strings

## Important notes from copilot-instructions.md

This project runs **Next.js 16** — APIs and file conventions may differ from older versions. Read `node_modules/next/dist/docs/` before writing Next.js-specific code and heed deprecation notices.

## CI/CD

Pushes to `master` or version tags (`v*`) build and push a Docker image to Docker Hub. Required secrets: `DOCKERHUB_USERNAME`, `DOCKERHUB_TOKEN`. The Dockerfile is a 3-stage build (dependencies → builder → runner) using Next.js standalone output mode.
