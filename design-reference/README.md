# Handoff: iBake Delights website (5 pages)

## Overview
A marketing and ordering site for iBake Delights, a two-person local bakery that sells cupcakes, cakes and cheesecakes. Square stays the checkout and payment backend: every product links out to its Square product page. Event and custom orders go through an inquiry form, which is **not** an order. The target budget is a modest small-business site, so keep it simple: no CMS, database, inventory system or custom checkout.

## About the design files
The files in `design/` are **design references built in HTML**. They are prototypes that show the intended look and behavior, not production code. Each `.dc.html` file opens directly in a browser; `support.js` is only the prototype runtime. **Recreate these designs in the target codebase** using its existing framework and patterns. If there's no codebase yet, pick a simple static-friendly stack (e.g. Astro, or Next.js with static export) and plain CSS or CSS modules. Do not ship `support.js` or `image-slot.js`: `image-slot` is a design-tool placeholder, so use a normal `<img>`.

## Fidelity
**High fidelity.** Colors, type, spacing, copy and interactions are final. Recreate them faithfully.

## Pages
All pages share SiteHeader at the top and SiteFooter at the bottom. Content max-width is **1240px**, centered, with side padding `clamp(16px, 4vw, 40px)`.

### Home (`Home.dc.html`)
1. **Hero:** a 2-column grid (`repeat(auto-fit, minmax(min(100%,440px),1fr))`, gap 24px) that stacks below about 900px.
   - **Left: blush panel** (#F7DCE4, radius 6px, padding 56/48px).
     - Eyebrow: "Family recipes · Local ordering".
     - H1: "Desserts made with generations of love."
     - Lead text: "Homemade cupcakes, cakes, and cheesecakes prepared from family recipes and available for local ordering."
     - Buttons: **View Menu** (primary, links to `#menu`) and **Plan an Event** (outline, links to Events).
     - Note below: "Checkout is completed securely on Square."
   - **Right: photo collage.** One large photo on top (1.6fr) and two below (1fr), gap 20px, height `clamp(380px,48vw,620px)`.
2. **Customer Favorites:**
   - H2 "Customer Favorites", with the subtext "Four of our most-ordered desserts."
   - On the right: a "Browse all desserts ↓" link.
   - Grid of 4 ProductCards (`auto-fill, minmax(min(100%,250px),1fr)`, gap 20px). The cards are chosen via `featured` in the data, in `FEATURED_ORDER`.
3. **Browse All Desserts** (`id="menu"`): a light-pink band (#FCEEF2) with top and bottom borders #E9C6D0, containing ProductCatalog.
4. **Ordering vs. events:** two panels side by side.
   - **"How local ordering works"** (#FCEEF2 with a border), a 3-item ordered list:
     1. Choose a dessert from the menu
     2. Complete checkout securely through Square
     3. Receive local delivery based on availability

     It ends with a primary button, **Choose a Dessert**.
   - **"Hire us for your next event"** (#F7DCE4), ending with a dark button, **Request an Event Quote**, which links to `Events#inquiry`.
5. **Story teaser** (card-white #FFFEFC band): a 5:4 photo, eyebrow, H2 "The same recipes, still made by hand.", a paragraph, and an outline button **Our Story** that links to About.

### Menu (`Menu.dc.html`)
- **Intro band** (#FCEEF2):
  - H1 "Cupcakes, cakes & cheesecakes", with helper text.
  - On the right, a white callout: "Need something for an event?" with a **Request an Event Quote** button.
- **ProductCatalog** below it. The hash sets the initial filter: `#all`, `#cupcakes`, `#cakes` or `#cheesecakes`.

### Events (`Events.dc.html`)
- **Hero split:**
  - Left: blush panel with H1 "Homemade desserts for your celebration.", an occasion list (Birthdays, Baby showers, Family gatherings, Corporate events, Other celebrations) and a button, **Start an Event Inquiry**, which links to `#inquiry`.
  - Right: a photo.
- **"How event requests work"** (#FCEEF2): 3 cards.
  1. Send an inquiry
  2. We follow up
  3. Confirm and pay

  Below them: "Just need a dozen cupcakes…? Order from the menu instead."
- **Form row:** flex-wrap. Left column (`flex:1 1 280px`): "Questions first?", phone, email and a photo. Right column (`flex:2 1 520px`): EventInquiryForm.

### About (`About.dc.html`)
- **Hero split:** H1 "Recipes passed down, baked by two." with two paragraphs, beside a 4:5 portrait photo.
  - A dashed **CLIENT TO WRITE** note marks where the client's own story goes. Remove it once the copy arrives, and never invent names or dates.
- **"How we bake"** (#FCEEF2): a photo, plus 3 definition cards: Family recipes / Homemade / Local.
- **CTA:** "Taste the family recipes", with **View the Menu** (primary) and **Plan an Event** (outline).

### Contact (`Contact.dc.html`)
- **Intro band:** H1 "We'd love to hear from you.", then 3 contact cards:
  - Call or text: (470) 219-8338
  - Email: ibakedelights@yahoo.com
  - Social: Instagram and Facebook, opening in a new tab
- **Two routing cards:**
  - "Placing a regular order?" (links to the Menu, primary button)
  - "Planning an event or custom order?" (jumps to the form, dark button)
- **EventInquiryForm**, max-width 900px.

## Shared components
### SiteHeader (prop `active`: home | menu | events | about | contact)
- **Sticky top bar:** #FCEEF2, 14px/600, text "Homemade desserts from family recipes · Local orders · (470) 219-8338" (the phone is a `tel:` link).
- **Main row:** min-height 84px, background #FFF9F5, bottom border #E9C6D0.
  - **Logo:** a 48px circle (#FCEEF2 fill, 2px #D9829B ring) with "iB" in Young Serif 18px #8E2449, followed by the wordmark "iBake Delights" in Young Serif `clamp(22px,2.4vw,27px)`.
  - **Nav (≥900px):** Home, Menu, Events, About, Contact. Figtree 16px/600, gap 30px. The active link is #8E2449 with a 2px bottom border and `aria-current="page"`.
  - **Order Now:** primary button that links to the Menu page.
- **Below 900px:** Order Now plus a 48×48 hamburger (`aria-expanded`) that toggles a stacked nav drawer (18px/700 links, 14px vertical padding).

### SiteFooter
- Background #FCEEF2 with a top border.
- 4 auto-fit columns (min 200px):
  - Brand and tagline
  - Explore (Menu, Events, About, Contact)
  - Reach us (phone, email)
  - Follow @ibakedelights (Instagram, Facebook, both `target="_blank" rel="noopener noreferrer"`)
- Bottom row: "Online orders are securely processed by Square." and "© 2026 iBake Delights".

### ProductCard (prop `product`, prop `level` = aria heading level)
- **Card:** background #FFFEFC, 1px #E9C6D0 border, radius 6px, padding 12px 12px 18px, flex column with gap 12px, full height (so buttons align across a row).
- **Image:** 4:3, radius 4px, `alt="Photo of {name}"`. While the image is missing, show a clearly labeled "Photo needed: {name}" placeholder. Never substitute another dessert's photo.
- **Name:** Young Serif 21px/1.2, #332326.
- **Price:** Figtree 19px/800. For cupcakes, append " / dozen" in 15px/600 #735F64. Never show a per-cupcake price.
- **Description:** 15px/1.55 #735F64. If it's longer than 80 characters, clamp it to 2 lines and add a "Full description" / "Show less" text button (`aria-expanded`, 14px/700 #8E2449, underlined).
- **Order button:**
  - With `squareUrl`: `<a target="_blank" rel="noopener noreferrer">` labeled "Order on Square ↗", with `aria-label="Order {name} on Square (opens in a new tab)"`. Primary style, full width.
  - With `squareUrl === null`: a truly `disabled` button reading "Ordering link coming soon". Background #FCEEF2, 1px dashed #D9829B border, text #735F64, `cursor: not-allowed`.

### ProductCatalog (prop `readHash`)
- **Filter row:** a `role="group"` of real `<button>`s: All (30), Cupcakes (11), Cakes (10), Cheesecakes (9).
  - Min height 46px, padding 10×18px, radius 4px, 16px/700.
  - Active: #8E2449 fill, white text, "✓" prefix and `aria-pressed="true"`, so the state isn't shown by color alone.
  - Inactive: #FFFEFC fill, #E9C6D0 border.
- **Live status:** an `aria-live="polite"` line such as "Showing 30 desserts".
- **Notice box** (white, bordered): "Online orders are securely completed through Square. Product availability and order details are confirmed during checkout."
- **Groups:** with **All**, products are grouped by category, each group with an H3 (Young Serif `clamp(26px,3vw,32px)` plus "N items") and a bottom border. A single category shows only its own group.
  - The cupcake group shows the notice **"Cupcake minimum order: one dozen."** (15px/800 #8E2449 on #FCEEF2, 1px #D9829B border).
- **Grid:** `repeat(auto-fill, minmax(min(100%,250px),1fr))`, gap 20px. That's 4 columns at desktop, 3 or 2 on tablet, 1 on phones.

### EventInquiryForm
- **Card:** #FFFEFC, 1px border, radius 6px, padding `clamp(22px,4vw,40px)`, `id="inquiry"`.
- **Heading:** H2 "Hire us for your next event", then "Prefer to talk? Call or text (470) 219-8338."
- **Layout:** auto-fit grid of fields (min 240px), gap 18px.
- **Fields** (required ones marked *):
  - Full name*
  - Email* (type email)
  - Phone number (tel)
  - Event date* (date)
  - Event type* (select: Birthday, Baby shower, Family gathering, Corporate event, Wedding or bridal shower, Other celebration)
  - Number of guests (number, min 1)
  - Delivery ZIP code
  - Products of interest (checkboxes: Cupcakes, Cakes, Cheesecakes, Not sure yet)
  - Message (textarea)
- **Inputs:** 16px, padding 12px, 1px #C9A3AF border, radius 4px, white background. Labels are 15px/700 above each field.
- **Notice box** (#FCEEF2, 15px/700): "Submitting this form does not confirm an order. iBake Delights will contact you regarding availability, pricing, and payment."
- **Submit:** dark button **Send Event Inquiry**, with the helper text "* Required · No payment is taken here."
- **Success state** (`role="status"`):
  - Eyebrow: "Inquiry received — not an order"
  - H2: "Thank you, {first name}. We'll be in touch."
  - Body: repeats that the event is not booked yet.
  - Button: "Send another inquiry".
- **Backend TODO:** POST to a form service (Formspree, Netlify Forms, etc.) or an email endpoint, and add spam protection. Show an error state if the send fails.

## Interactions & behavior
- **Filtering:** client-side only, no reload. Menu reads `location.hash` on load and on `hashchange`.
- **Descriptions:** per-card expand/collapse state.
- **Header:** mobile nav open/closed state; switches layout at 900px.
- **Hover:** primary #8E2449 → #701A39. Outline buttons fill #332326 with white text. Dark buttons #332326 → #1F1517.
- **Focus:** `:focus-visible { outline: 3px solid #8E2449; outline-offset: 3px }` on every interactive element.
- **Motion:** no animations. Smooth scrolling to anchors only, disabled under `prefers-reduced-motion`.
- **Separate CTAs:** raspberry means buying (Order Now, View Menu, Order on Square). Dark cocoa means event inquiries. Keep the two visually distinct.

## State
- Catalog: `category: 'all' | 'cupcakes' | 'cakes' | 'cheesecakes'`
- Card: `descriptionOpen: boolean`
- Header: `menuOpen: boolean`
- Form: `status: 'editing' | 'sending' | 'sent' | 'error'`

No data fetching: the catalog is hardcoded.

## Data
`design/products.js` is the single source of truth. Port it to `src/data/products.ts`:
```ts
type ProductCategory = "cupcakes" | "cakes" | "cheesecakes";
type Product = { id: string; slug: string; name: string; category: ProductCategory; description: string;
  priceCents: number; priceLabel: string; unitLabel?: string; image: string; squareUrl: string | null;
  featured: boolean; allergens?: string[] };
```
- 30 products: 11 cupcakes, 10 cakes, 9 cheesecakes.
- Prices are integer cents; `priceLabel` is formatted from them.
- Cupcakes have `unitLabel: "dozen"`.
- Featured: `sweet-potato-cheesecake`, `banana-pudding-cheesecake`, `red-velvet-cupcake`, `peach-cobbler-cheesecake`.
- `squareUrl` is `null` for all products until the client supplies the links. **Never guess URLs.**
- Allergens are intentionally unset.
- Components must not duplicate product data.

## Design tokens
**Colors**
| Token | Hex | Use |
|---|---|---|
| bg | #FFF9F5 | page background |
| pink-50 | #FCEEF2 | alternate sections, top bar, footer |
| blush | #F7DCE4 | hero and event panels |
| border | #E9C6D0 | borders and dividers |
| input-border | #C9A3AF | form inputs |
| brand-pink | #D9829B | logo ring, notice borders, disabled dashed border (never text) |
| primary | #8E2449 | primary buttons, links, active states |
| primary-hover | #701A39 | primary hover |
| ink | #332326 | body text, event/dark buttons |
| ink-hover | #1F1517 | dark button hover |
| muted | #735F64 | secondary text |
| card | #FFFEFC | cards |

**Type:** Young Serif 400 for headings, product names and wordmark. Figtree 400/600/700/800 for everything else. Both are Google Fonts.

| Style | Size / line-height |
|---|---|
| H1 | `clamp(40px,5vw,58–62px)` / 1.05, letter-spacing -0.01em |
| H2 | `clamp(32px,4vw,46px)` / 1.1 (panel H2 `clamp(28px,3vw,36px)`) |
| Eyebrow | 14px/800, uppercase, letter-spacing 0.14em, #8E2449 |
| Lead | 17–19px / 1.6 |
| Body | 16–18px / 1.65–1.7 |
| Card price | 19px/800 |
| Buttons | 16–17px/800 |

**Buttons:** radius 4px everywhere (no pills). Primary and dark: padding 16–17px × 28–30px. Outline: 2px #332326 border, 2px less padding.

**Spacing:** 8px base. Section padding `clamp(48–56px, 6–7vw, 80–88px)`. Grid gaps 16–24px. Card radius 6px, image radius 4px. **No shadows.**

## Assets
- No real photos are included; every image spot is a labeled placeholder. See `CLIENT-CHECKLIST.md`.
- Product photos: `/images/products/<slug>.jpg`, 4:3.
- Page photos:
  - Home: hero plus two details, story
  - Events: hero, side
  - About: portrait of the bakers, recipe detail
- No icon library: only the text glyphs ↗, ↓, ✓ and a 3-line CSS hamburger.

## Files
- `design/Home.dc.html`, `Menu.dc.html`, `Events.dc.html`, `About.dc.html`, `Contact.dc.html`: pages. Open them in a browser; keep the folder together.
- `design/SiteHeader.dc.html`, `SiteFooter.dc.html`, `ProductCard.dc.html`, `ProductCatalog.dc.html`, `EventInquiryForm.dc.html`: shared components. Their inline styles give the exact values; the logic sits in the `<script>` at the bottom of each file.
- `design/products.js`: the product catalog data.
- `design/support.js`, `design/image-slot.js`: prototype runtime only. Do not port.
- `CLIENT-CHECKLIST.md`: outstanding client inputs (Square URLs, photos, email confirmation, About copy, delivery terms, form backend).

## Acceptance checks
1. Exactly 30 products, split 11 / 10 / 9, with prices matching `products.js`.
2. The 4 featured products are correct and come from the `featured` flag.
3. Filters work by keyboard; the active state has ✓ and `aria-pressed`.
4. Every Square link has `target="_blank" rel="noopener noreferrer"`. Products with a null URL show a real disabled button.
5. The form enforces its required fields and never presents a submission as an order.
6. WCAG AA contrast; layouts work at 360, 768, 1024 and 1440px wide.
7. The project's build, typecheck, lint and tests pass. Report any product image or Square URL still missing from the client.
