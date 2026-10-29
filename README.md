# Mualim Ul Furqan · مُعَلِّمُ الْفُرْقَانِ

Landing site for **Mualim Ul Furqan**, live one-on-one online Quran classes (Noorani Qaida, Nazra, Tajweed, Duas)
for families in the UK, US and Europe.

**Stack:** React 19 · TypeScript · Vite 8 · Tailwind CSS v4 · React Router 7 · Vitest + Testing Library · ESLint
(incl. jsx-a11y) · Prettier

---

## Quick start

```bash
npm install
cp .env.example .env      # fill in your WhatsApp number, Meta Pixel ID and booking keys
npm run dev               # http://localhost:5173 (booking API included, in demo mode until keys are set)
```

## Scripts

| Script                | What it does                                                                     |
| --------------------- | -------------------------------------------------------------------------------- |
| `npm run check`       | Format, types, lint, tests, build: run before every commit/PR                    |
| `npm run dev`         | Dev server with hot reload                                                       |
| `npm run build`       | Type-check + production build into `dist/`                                       |
| `npm run preview`     | Serve the production build locally                                               |
| `npm run test`        | Run unit + component tests                                                       |
| `npm run lint`        | ESLint (TypeScript, React hooks, a11y)                                           |
| `npm run typecheck`   | TypeScript only                                                                  |
| `npm run format`      | Prettier (also sorts Tailwind classes)                                           |
| `npm run google:auth` | One-time Google sign-in that prints `GOOGLE_REFRESH_TOKEN` for bookings          |
| `npm run og:render`   | Re-render the share card `public/og.jpg` from `scripts/og-image/` (needs Chrome) |

## Environment variables

| Variable               | Example                  | Purpose                                                                |
| ---------------------- | ------------------------ | ---------------------------------------------------------------------- |
| `VITE_WHATSAPP_NUMBER` | `447700900123`           | Every WhatsApp button (digits only, international format)              |
| `VITE_META_PIXEL_ID`   | `1234567890`             | Facebook/Instagram ads conversion tracking (optional)                  |
| `VITE_SITE_URL`        | `https://yourdomain.com` | Canonical URL for SEO; makes the `og:image` link absolute for previews |

Everything renders without them (placeholders are shown), so you can build the site before you have accounts.

Booking secrets are **server-side only** (no `VITE_` prefix, never sent to the browser):

| Variable               | Purpose                                                                     |
| ---------------------- | --------------------------------------------------------------------------- |
| `GOOGLE_CLIENT_ID`     | OAuth client of the academy's Google account (Calendar API)                 |
| `GOOGLE_CLIENT_SECRET` | ″                                                                           |
| `GOOGLE_REFRESH_TOKEN` | From `npm run google:auth` (see below)                                      |
| `GOOGLE_CALENDAR_ID`   | Calendar that receives bookings, default `primary`                          |
| `RESEND_API_KEY`       | [Resend](https://resend.com) key for confirmation emails                    |
| `EMAIL_FROM`           | Sender on a domain verified in Resend, e.g. `Mualim Ul Furqan <bookings@…>` |
| `OWNER_EMAIL`          | Where "new booking" notifications go                                        |

## Booking with Google Meet

The "Book" section is a custom booking flow backed by Cloudflare Pages Functions:

1. `GET /api/availability` builds 30-minute slots from the teaching hours in `server/schedule.ts`, removes
   anything already busy in the owner's Google Calendar, and the browser shows them in the visitor's time zone.
2. `POST /api/book` re-checks the slot, creates a Google Calendar event **with a Google Meet link** and invites the
   family (Google sends them a calendar invitation), then emails both the family and the owner:
   _"Your meeting is set on Thursday 15 January 2026 at 5:30 pm"_, each in their own time zone.

**Going live (one time):**

1. [Google Cloud Console](https://console.cloud.google.com/): create a project, enable **Google Calendar API**,
   configure the OAuth consent screen and set its publishing status to **In production** (in "Testing", Google
   expires the refresh token after 7 days and bookings stop working), then **Credentials → Create OAuth client ID
   → Desktop app**. Google shows an "unverified app" warning when you sign in; that is fine for your own account.
2. Put `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env`, run `npm run google:auth`, sign in with the academy
   account, and copy the printed `GOOGLE_REFRESH_TOKEN` into `.env`.
3. [Resend](https://resend.com): verify your domain, create an API key, set `RESEND_API_KEY`, `EMAIL_FROM` and
   `OWNER_EMAIL`.
4. Add the same variables in Cloudflare Pages → **Settings → Variables and Secrets** (as secrets) and redeploy.

Teaching hours, slot length, notice period and how far ahead people can book are in `server/schedule.ts`.

**Demo mode:** with no Google keys, slots come from the schedule only and nothing is created. `npm run dev` allows
demo bookings (emails are printed in the terminal); in production a booking is refused with a "message us on
WhatsApp" note unless Google or Resend is configured, so no booking is silently lost.

---

## Architecture

Feature-based structure: each section of the page is a self-contained feature with its own components, data, hooks
and pure logic (with tests). Shared building blocks live in `components/`.

```
├── functions/api/          Cloudflare Pages Functions: availability.ts, book.ts (thin wrappers)
├── server/                 Booking backend: schedule, slots, Google Calendar/Meet, emails (+ tests)
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
│   └── booking/            Google Meet booking: day picker, time slots, details form, confirmation
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
| Teaching hours for booking         | `server/schedule.ts`              |

Search the project for `[` to find every remaining placeholder. **Only publish real reviews and real numbers.**

The teacher photo is `public/teachers/qari-abu-sufyan.webp`, a transparent cut-out (set as `photo` in
`features/teachers/data.ts`). It is shown only in the teacher profile; the frame and background come from CSS. To
replace it, export a head-and-shoulders PNG/WebP with a transparent background at about 1000px wide.

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
- [ ] Google Calendar connected and Resend set up (see "Booking with Google Meet"); make one real test booking
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
