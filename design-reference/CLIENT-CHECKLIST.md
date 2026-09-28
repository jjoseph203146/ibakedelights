# iBake Delights — handoff checklist

## Pages
- Home.dc.html · Menu.dc.html (supports `#cupcakes` / `#cakes` / `#cheesecakes`) · Events.dc.html · About.dc.html · Contact.dc.html
- Shared: SiteHeader, SiteFooter, ProductCard, ProductCatalog, EventInquiryForm
- Data: `products.js` is the single source for all 30 products. Port it to `src/data/products.ts` using the typedef at the top of the file.

## Done in the design
- 30 products: 11 cupcakes, 10 cakes, 9 cheesecakes. Prices are stored as integer cents and match the spec.
- Featured products come from `featured: true`: Sweet Potato Cheesecake, Banana Pudding Cheesecake, Red Velvet Cupcake, Peach Cobbler Cheesecake.
- Category filter uses real buttons with `aria-pressed`, a ✓ mark and counts, so the active state isn't shown by color alone.
- Cupcake minimum-order notice and the Square checkout notice are in place.
- Square buttons open in a new tab with `rel="noopener noreferrer"`. With no URL, a disabled "Ordering link coming soon" button is shown instead.
- Event form has all the requested fields plus the "does not confirm an order" notice. The success state repeats that nothing is booked.

## Still needed from the client
### Square product URLs (30 of 30 provided)
Pulled directly from ibakedelights.com's live Square Online store catalog API (the storefront's own products endpoint, not the JS-rendered pages) and verified (HTTP 200) for all 30 slugs. Filled into `SQUARE_URLS` in `products.js`.

### Product images (26 of 30 provided)
Pulled directly from ibakedelights.com's live Square Online store catalog (same API as the Square URLs above) and saved to `public/images/products/<slug>.jpg` in the production app, all real 4:3 photos, one per product.
Still showing a "Photo needed: …" placeholder because the live store itself has no photo for these (confirmed via the same API — they return the generic Square placeholder, not a product photo). Never substituted another dessert's photo:
- german-chocolate-cupcake
- key-lime-cake
- classic-cheesecake
- oreo-cheesecake

### Page photos
- Home: hero plus two detail photos, and a story photo
- Events: event table photo, side photo
- About: portrait of the two bakers, recipe or kitchen detail

### Other details to confirm
- Email `ibakedelights@yahoo.com` was taken from the public Facebook page. Confirm it's current.
- Instagram URL `instagram.com/ibakedelights`: confirm.
- About page copy: the client should write their own story. No names or dates were invented.
- Delivery area, fees and lead time are not stated anywhere on purpose. Add them only once the client confirms.
- Event form needs a backend: connect it to a form service or email endpoint (see the TODO in EventInquiryForm).
