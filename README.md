# iBake Delights

Production marketing/ordering site for iBake Delights, a two-person local
bakery selling cupcakes, cakes, and cheesecakes. Built with Next.js (App
Router), TypeScript, and Tailwind CSS v4.

Square remains the checkout and payment backend — every product links out to
its Square product page. There is no custom cart or checkout. Events and
custom orders go through a validated inquiry form; submitting it does **not**
confirm an order.

## Design reference

[`design-reference/`](./design-reference) holds the approved high-fidelity
design handoff (HTML prototypes + `products.js` data) this build was
implemented from. It's kept for comparison only and is not part of the
shipped site (nothing under `app/` imports or serves it).

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Project structure

- `app/` — pages (Home, Menu, Events, About, Contact), layout, metadata,
  sitemap/robots, generated icon + OG image, and the `/api/inquiry` route.
- `components/` — shared UI: `SiteHeader`, `MobileNavigation`, `SiteFooter`,
  `ProductCard`, `CategoryFilter`, `Cta`, `InquiryForm`, `PhotoPlaceholder`,
  `StructuredData`.
- `data/products.ts` — the single typed source of truth for all 30 products
  (11 cupcakes, 10 cakes, 9 cheesecakes). Pages and components read from
  this file; product info is never duplicated elsewhere.
- `lib/` — site-wide constants (`site-config.ts`), the inquiry form's Zod
  schema (`validation.ts`), and its email sender (`email.ts`).

## Event inquiry form email delivery

The form POSTs to `/api/inquiry`, which sends an email via
[Resend](https://resend.com). Configure it with the environment variables in
[`.env.example`](./.env.example):

```bash
cp .env.example .env.local
# then fill in RESEND_API_KEY, INQUIRY_FROM_EMAIL, and (optionally) INQUIRY_TO_EMAIL
```

Without these set, the API route fails with a clear error (surfaced in the
form's error state) instead of silently discarding inquiries.

## Outstanding client inputs

Carried over from `design-reference/CLIENT-CHECKLIST.md` — still not
provided, so the site correctly shows "photo needed" placeholders and
disabled "Ordering link coming soon" buttons until these arrive:

- **Square product URLs** — 0 of 30. Add them to `SQUARE_URLS` in
  `data/products.ts`, keyed by slug. Never guess a URL.
- **Product photos** — 0 of 30. Drop 4:3 JPEGs at
  `public/images/products/<slug>.jpg` and pass `image={product.image}` to
  `PhotoPlaceholder`/`next/image` in `ProductCard` (currently every card
  shows a placeholder since no files exist yet).
- **Page photos** — Home (hero + 2 detail + story), Events (table + side),
  About (portrait + recipe detail).
- **About page copy** — the client's own story; a placeholder marks where it
  goes. No names or dates were invented.
- Confirm the public email (`ibakedelights@yahoo.com`) and Instagram handle
  are current.
- Delivery area, fees, and lead time are intentionally not published
  anywhere on the site until confirmed.
- `RESEND_API_KEY` / `INQUIRY_FROM_EMAIL` need real values before the
  inquiry form can actually deliver email in production.
- `siteConfig.url` in `lib/site-config.ts` is a placeholder production
  domain — update it once the real domain is chosen (backs metadata/OG/
  sitemap URLs only, never shown as visible copy).

## Scripts

```bash
npm run dev      # start the dev server
npm run build    # production build
npm run start    # run the production build
npm run lint     # eslint
```
