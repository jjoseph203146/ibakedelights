/**
 * iBake Delights — product catalog (single source of truth).
 * Every card, featured list, and filter reads from PRODUCTS. Do not duplicate product info in components.
 *
 * @typedef {"cupcakes"|"cakes"|"cheesecakes"} ProductCategory
 * @typedef {Object} Product
 * @property {string} id
 * @property {string} slug
 * @property {string} name
 * @property {ProductCategory} category
 * @property {string} description
 * @property {number} priceCents      integer cents
 * @property {string} priceLabel      customer-facing price
 * @property {string} [unitLabel]     e.g. "dozen" (cupcakes: 1-dozen minimum; never show per-cupcake price)
 * @property {string} image           planned local path — TODO: file not yet provided (see HANDOFF-CHECKLIST.md)
 * @property {string|null} squareUrl  exact Square product page; null = "Ordering link coming soon"
 * @property {boolean} featured
 * @property {string[]} [allergens]   intentionally unset — do not invent
 */
(function () {
  const C = "cupcakes", K = "cakes", H = "cheesecakes";
  const fmt = (c) => "$" + (c / 100).toFixed(2);
  // [id, slug, name, category, description, priceCents, featured]
  // squareUrl: paste the exact Square product URL into SQUARE_URLS below (keyed by slug).
  const rows = [
    ["cc-01", "banana-pudding-cupcake", "Banana Pudding Cupcake", C, "Banana cupcake filled with vanilla pudding and topped with banana-flavored cream cheese icing and vanilla wafer crumble.", 3200],
    ["cc-02", "red-velvet-cupcake", "Red Velvet Cupcake", C, "Moist, smooth, velvety cake with a hint of cocoa and topped with silky-smooth cream cheese icing.", 3000, true],
    ["cc-03", "carrot-cake-cupcake", "Carrot Cake Cupcake", C, "Moist, delicious cake with carrots, walnuts, a hint of cinnamon, and silky-smooth cream cheese icing.", 3000],
    ["cc-04", "key-lime-cupcake", "Key Lime Cupcake", C, "Light and fluffy citrus-lime cake topped with silky-smooth cream cheese icing.", 3000],
    ["cc-05", "white-chocolate-cupcake", "White Chocolate Cupcake", C, "Light and decadent white-chocolate-infused cake topped with white-chocolate-infused cream cheese icing.", 3000],
    ["cc-06", "classic-vanilla-cupcake-chocolate-icing", "Classic Vanilla Cupcake with Chocolate Icing", C, "Vanilla cake with silky-smooth chocolate cream cheese icing.", 3000],
    ["cc-07", "double-chocolate-delight-cupcake", "Double Chocolate Delight Cupcake", C, "Rich, moist chocolate cake topped with chocolate cream cheese icing for the extreme chocolate lover.", 3000],
    ["cc-08", "classic-vanilla-cupcake-vanilla-icing", "Classic Vanilla Cupcake with Vanilla Icing", C, "Vanilla white cake with silky-smooth vanilla cream cheese icing.", 3000],
    ["cc-09", "german-chocolate-cupcake", "German Chocolate Cupcake", C, "Rich and indulgent German chocolate cake topped with coconut and pecan icing.", 3200],
    ["cc-10", "classic-vanilla-cupcake-strawberry-icing", "Classic Vanilla Cupcake with Strawberry Icing", C, "Vanilla cake with silky-smooth strawberry cream cheese icing.", 3000],
    ["cc-11", "strawberry-cupcake", "Strawberry Cupcake", C, "Light and decadent strawberry-infused cake topped with strawberry-infused cream cheese icing.", 3000],
    ["ck-01", "carrot-cake", "Carrot Cake", K, "Moist, delicious cake with carrots, walnuts, a hint of cinnamon, and silky-smooth cream cheese frosting.", 5000],
    ["ck-02", "cream-cheese-pound-cake", "Cream Cheese Pound Cake", K, "Dense, buttery, flavorful, and slightly sweet Southern classic.", 5000],
    ["ck-03", "classic-vanilla-cake-chocolate-icing", "Classic Vanilla Cake with Chocolate Icing", K, "Vanilla white cake with silky-smooth chocolate cream cheese icing.", 5000],
    ["ck-04", "double-chocolate-delight-cake", "Double Chocolate Delight Cake", K, "Rich, moist chocolate cake topped with chocolate cream cheese icing for the extreme chocolate lover.", 5500],
    ["ck-05", "strawberry-cake", "Strawberry Cake", K, "Light and decadent strawberry-infused cake topped with strawberry-infused cream cheese icing.", 5000],
    ["ck-06", "red-velvet-cake", "Red Velvet Cake", K, "Moist, smooth, velvety cake with a hint of cocoa and topped with silky-smooth cream cheese frosting.", 5000],
    ["ck-07", "peach-pound-cake", "Peach Pound Cake", K, "Dense, buttery, flavorful, and slightly sweet Southern tradition infused with real peaches.", 5000],
    ["ck-08", "key-lime-cake", "Key Lime Cake", K, "Light and fluffy citrus-lime cake topped with silky-smooth cream cheese icing.", 5000],
    ["ck-09", "german-chocolate-cake", "German Chocolate Cake", K, "Rich and indulgent German chocolate cake topped with coconut and pecan icing.", 5500],
    ["ck-10", "white-chocolate-cake", "White Chocolate Cake", K, "Light and decadent white-chocolate-infused cake topped with white-chocolate-infused cream cheese icing.", 6000],
    ["ch-01", "classic-cheesecake", "Classic Cheesecake", H, "Creamy, light, rich cheesecake with a graham cracker crust.", 5000],
    ["ch-02", "cinnamon-roll-cheesecake", "Cinnamon Roll Cheesecake", H, "Creamy, light, cinnamon-swirled cheesecake with a cinnamon roll crust and cream cheese icing drizzle.", 5500],
    ["ch-03", "oreo-cheesecake", "Oreo Cheesecake", H, "Creamy, light, Oreo-filled cheesecake with an Oreo cookie crust.", 5500],
    ["ch-04", "pecan-pie-cheesecake", "Pecan Pie Cheesecake", H, "Creamy, light, rich cheesecake with a buttery pecan and brown sugar topping.", 6000],
    ["ch-05", "red-velvet-cheesecake", "Red Velvet Cheesecake", H, "Layers of creamy, rich cheesecake and velvety smooth red velvet cake topped with cream cheese icing.", 5500],
    ["ch-06", "sweet-potato-cheesecake", "Sweet Potato Cheesecake", H, "Creamy, light, rich cheesecake with sweet potato swirled throughout on a graham cracker crust.", 5500, true],
    ["ch-07", "banana-pudding-cheesecake", "Banana Pudding Cheesecake", H, "Creamy, light, rich cheesecake with a banana purée swirl, vanilla wafer crust, vanilla pudding topping, and vanilla wafer crumble.", 5500, true],
    ["ch-08", "peach-cobbler-cheesecake", "Peach Cobbler Cheesecake", H, "Creamy, light, rich cheesecake with a peach cobbler purée swirl, graham cracker crust, peach cobbler filling, and peaches.", 5500, true],
    ["ch-09", "blueberry-cheesecake", "Blueberry Cheesecake", H, "Creamy, light, decadent cheesecake with a blueberry purée swirl and graham cracker crust.", 5500]
  ];

  // TODO(client): paste exact Square product-page URLs here. Leave null until confirmed — never guess.
  const SQUARE_URLS = {
    // "sweet-potato-cheesecake": "https://ibakedelights.square.site/product/...",
  };

  const PRODUCTS = rows.map(([id, slug, name, category, description, priceCents, featured]) => ({
    id, slug, name, category, description, priceCents,
    priceLabel: fmt(priceCents),
    unitLabel: category === C ? "dozen" : undefined,
    image: "/images/products/" + slug + ".jpg", // TODO: image not yet provided
    squareUrl: SQUARE_URLS[slug] || null,
    featured: !!featured
  }));

  // Featured display order on the homepage
  const FEATURED_ORDER = ["sweet-potato-cheesecake", "banana-pudding-cheesecake", "red-velvet-cupcake", "peach-cobbler-cheesecake"];

  const CATEGORIES = [
    { id: "cupcakes", label: "Cupcakes", notice: "Cupcake minimum order: one dozen." },
    { id: "cakes", label: "Cakes" },
    { id: "cheesecakes", label: "Cheesecakes" }
  ];

  const STORE_URL = "https://ibakedelights.square.site/";

  window.IBAKE = {
    PRODUCTS, CATEGORIES, STORE_URL,
    featured: () => FEATURED_ORDER.map(s => PRODUCTS.find(p => p.slug === s && p.featured)).filter(Boolean),
    byCategory: (c) => PRODUCTS.filter(p => p.category === c)
  };
})();
