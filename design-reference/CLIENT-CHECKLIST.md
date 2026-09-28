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
### Square product URLs (0 of 30 provided)
The old Square site loads its content with JavaScript, so product links couldn't be read automatically. Paste each link into `SQUARE_URLS` in `products.js`, keyed by slug. Leave any unknown link as `null`, never a guess.
- Cupcakes: banana-pudding-cupcake, red-velvet-cupcake, carrot-cake-cupcake, key-lime-cupcake, white-chocolate-cupcake, classic-vanilla-cupcake-chocolate-icing, double-chocolate-delight-cupcake, classic-vanilla-cupcake-vanilla-icing, german-chocolate-cupcake, classic-vanilla-cupcake-strawberry-icing, strawberry-cupcake
- Cakes: carrot-cake, cream-cheese-pound-cake, classic-vanilla-cake-chocolate-icing, double-chocolate-delight-cake, strawberry-cake, red-velvet-cake, peach-pound-cake, key-lime-cake, german-chocolate-cake, white-chocolate-cake
- Cheesecakes: classic-cheesecake, cinnamon-roll-cheesecake, oreo-cheesecake, pecan-pie-cheesecake, red-velvet-cheesecake, sweet-potato-cheesecake, banana-pudding-cheesecake, peach-cobbler-cheesecake, blueberry-cheesecake

### Product images (0 of 30 provided)
Each product currently shows a "Photo needed: …" placeholder. Save each photo to `/images/products/<slug>.jpg` at a 4:3 ratio. Do not reuse one dessert's photo for another product.

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
