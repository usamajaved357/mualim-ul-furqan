# Mulaim-ul-Furqan · معلم الفرقان

Landing site for **Mulaim-ul-Furqan**, live one-on-one online Quran classes (Noorani Qaida, Nazra, Tajweed, Duas)
for families in the UK, US and Europe.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7 · Vitest + Testing Library · ESLint
(incl. jsx-a11y) · Prettier

---

## Quick start

```bash
npm install
cp .env.example .env      # fill in your WhatsApp number, Cal.com link, Meta Pixel ID
npm run dev               # http://localhost:5173
```

## Working with Claude Code

Open this folder in Claude Code and it reads `CLAUDE.md` automatically (project rules, architecture, content
rules). Further context lives in `docs/`:

| File                    | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `CLAUDE.md`             | Rules every change must follow, commands, where things are |
| `docs/ARCHITECTURE.md`  | Layers, import boundaries, feature anatomy, future backend |
| `docs/DESIGN-SYSTEM.md` | Brand, colour/type tokens, motion, UI components           |
| `docs/ROADMAP.md`       | Phased task list with status: where to pick up next        |
| `docs/adr/`             | Architecture decision records                              |

Project slash commands (`.claude/commands/`):

| Command                    | What it does                                                   |
| -------------------------- | -------------------------------------------------------------- |
| `/next [item]`             | Implements the next roadmap item end to end and ticks it off   |
| `/new-feature <name>`      | Scaffolds a new section with the correct folder structure      |
| `/update-content <change>` | Edits text/prices/reviews in data files only                   |
| `/check`                   | Runs full verification and fixes failures                      |
| `/review`                  | Reviews uncommitted changes using the `code-reviewer` subagent |

`.claude/settings.json` pre-approves safe commands (tests, lint, build, git read-only), blocks reading `.env`, and
runs Prettier automatically on every file Claude edits.

## Scripts

| Script              | What it does                                                                     |
| ------------------- | -------------------------------------------------------------------------------- |
| `npm run check`     | Format, types, lint, tests, build: run before every commit/PR                    |
| `npm run dev`       | Dev server with hot reload                                                       |
| `npm run build`     | Type-check + production build into `dist/`                                       |
| `npm run preview`   | Serve the production build locally                                               |
| `npm run test`      | Run unit + component tests                                                       |
| `npm run lint`      | ESLint (TypeScript, React hooks, a11y)                                           |
| `npm run typecheck` | TypeScript only                                                                  |
| `npm run format`    | Prettier (also sorts Tailwind classes)                                           |
| `npm run og:render` | Re-render the share card `public/og.jpg` from `scripts/og-image/` (needs Chrome) |

## Environment variables

| Variable               | Example                  | Purpose                                                                |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `VITE_WHATSAPP_NUMBER` | `447700900123`           | Every WhatsApp button (digits only, international format)              |
| `VITE_CAL_LINK`        | `your-name/free-trial`   | Cal.com booking calendar in the "Book" section                         |
| `VITE_META_PIXEL_ID`   | `1234567890`             | Facebook/Instagram ads conversion tracking (optional)                  |
| `VITE_SITE_URL`        | `https://yourdomain.com` | Canonical URL for SEO; makes the `og:image` link absolute for previews |

Everything renders without them (placeholders are shown), so you can build the site before you have accounts.

---

## Architecture

Feature-based structure: each section of the page is a self-contained feature with its own components, data, hooks
and pure logic (with tests). Shared building blocks live in `components/`.

```
src/
├── app/                    App shell: router + one-time setup (Meta Pixel)
├── pages/                  Route-level pages that compose features
│   ├── HomePage.tsx        Composes all homepage sections + FAQ structured data
│   ├── PrivacyPage.tsx     ┐ templates, fill in before launch
│   ├── TermsPage.tsx       ┘
│   └── NotFoundPage.tsx
├── features/               One folder per product feature / page section
│   ├── hero/               Headline + 3-step trial finder
│   │   ├── components/     TrialFinder, HeroVisual, RatingBadge
│   │   ├── hooks/          useTrialFinder (state + derived summary)
│   │   ├── lib/            trialSummary (pure, unit-tested)
│   │   ├── data.ts         Options & popular slots per region
│   │   └── index.ts        Public API of the feature
│   ├── stats/  how-it-works/  courses/  why-us/  classroom/
│   ├── hadith/  teachers/
│   ├── pricing/            Plans, currency switch (auto-detects GBP/EUR/USD), per-class maths
│   ├── reviews/            Track record until real reviews exist; then cards, filters, rating
│   ├── faq/
│   └── booking/            Cal.com embed + WhatsApp fallback
├── components/
│   ├── ui/                 Design-system primitives (ButtonLink, Section, SegmentedControl, Icon…)
│   ├── layout/             Header (with mobile menu), Footer, AnnouncementBar, FloatingWhatsApp
│   ├── brand/              Logo + LogoMark (mihrab arch mark)
│   ├── decor/              GirihPattern, Rosette
│   └── mockups/            Mushaf panel, video tiles, progress ring/bar
├── config/
│   ├── site.ts             ← brand, teacher, contact, rating: EDIT THIS FIRST
│   └── env.ts              Typed env access
├── lib/                    whatsapp links, Meta Pixel wrapper, cn()
├── hooks/                  useInView (scroll reveal)
├── types/domain.ts         Shared domain types (CourseId, Region, CurrencyCode…)
└── styles/globals.css      Tailwind v4 theme tokens (colours, fonts, animations)
```

**Rules of thumb**

- Features import from `components/`, `lib/`, `config/` and `types/`, **never from other features**. Shared UI goes
  to `components/`.
- Content lives in each feature's `data.ts`, so editing text or prices never means touching JSX.
- Pure logic (prices, summaries, filters) goes in `lib/` next to its `*.test.ts`.
- Brand colours and fonts are Tailwind tokens in `styles/globals.css` (`bg-night`, `text-gold`, `font-diwani`…).

## Editing content

| What                               | Where                             |
| ---------------------------------- | --------------------------------- |
| Name, teacher, contact, rating     | `src/config/site.ts`              |
| Prices & plans                     | `src/features/pricing/data.ts`    |
| Courses (kids / adults)            | `src/features/courses/data.ts`    |
| Reviews, milestones                | `src/features/reviews/data.ts`    |
| Teacher card (photo, availability) | `src/features/teachers/data.ts`   |
| FAQ                                | `src/features/faq/data.ts`        |
| Available time slots in the hero   | `src/features/hero/data.ts`       |
| Stats bar numbers                  | `src/features/stats/StatsBar.tsx` |

Search the project for `[` to find every remaining placeholder. **Only publish real reviews and real numbers.**

To add your photo: put it in `public/teachers/qari.jpg` and set `photo: '/teachers/qari.jpg'` in
`features/teachers/data.ts`.

---

## Deploy to Cloudflare Pages (free)

1. Push this folder to a GitHub repository.
2. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git** → pick the repo.
3. Build settings: **Framework preset** `Vite` · **Build command** `npm run build` · **Output directory** `dist`.
4. **Settings → Environment variables:** add the `VITE_*` variables above (Production), then redeploy.
5. **Custom domains:** add your domain (you can buy it in Cloudflare Registrar at cost).

Every push to `main` deploys automatically. Pull requests get preview URLs. `public/_headers` adds security and
long-term caching headers. Client-side routes (`/privacy`, `/terms`) work because Pages falls back to `index.html`
when no `404.html` exists.

## Before launch checklist

- [ ] `config/site.ts` filled in (name, mosque, languages, WhatsApp, email)
- [ ] Cal.com event "Free trial · 30 min" created and `VITE_CAL_LINK` set
- [ ] Real photo + 60-second recitation video
- [ ] Real reviews added to `features/reviews/data.ts` and `site.rating` set (both stay hidden until then)
- [ ] Privacy policy & terms completed
- [ ] Meta Pixel ID set; test with the Meta Pixel Helper extension
- [ ] `VITE_SITE_URL` set, then paste the live URL into the
      [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) to check the share card preview

## Roadmap ideas

- Real student portal (auth + database, e.g. Supabase) (schedule, homework, progress, certificates)
- Stripe subscriptions for monthly plans
- Blog / SEO landing pages per city (`/online-quran-classes-london`)
- Female teacher profiles when available
