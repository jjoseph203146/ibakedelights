/**
 * iBake Delights — product catalog (single source of truth).
 *
 * Every ProductCard, the homepage's Customer Favorites section, and the
 * Menu's category filters all read from PRODUCTS / CATEGORIES / featured
 * below. Do not duplicate product info in page or component code — add or
 * edit a dessert here only.
 *
 * Ported from design-reference/design/products.js (the approved design
 * handoff). Prices are integer cents; priceLabel is derived from them.
 */

export type ProductCategory = "cupcakes" | "cakes" | "cheesecakes";

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  /** Integer cents. */
  priceCents: number;
  /** Customer-facing formatted price, e.g. "$30.00". */
  priceLabel: string;
  /** e.g. "dozen" for cupcakes — never show a per-cupcake price. */
  unitLabel?: string;
  /** Local path under /public. Not yet provided by the client — see CLIENT-CHECKLIST.md. */
  image: string;
  /** Exact Square product-page URL. null = "Ordering link coming soon". Never guess. */
  squareUrl: string | null;
  featured: boolean;
  /** Intentionally unset until the client confirms — never invent allergens. */
  allergens?: string[];
}

export interface Category {
  id: ProductCategory;
  label: string;
  notice?: string;
}

const fmt = (cents: number) => "$" + (cents / 100).toFixed(2);

type ProductRow = [
  id: string,
  slug: string,
  name: string,
  category: ProductCategory,
  description: string,
  priceCents: number,
  featured?: boolean,
];

const C: ProductCategory = "cupcakes";
const K: ProductCategory = "cakes";
const H: ProductCategory = "cheesecakes";

// [id, slug, name, category, description, priceCents, featured]
const ROWS: ProductRow[] = [
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
  ["ch-09", "blueberry-cheesecake", "Blueberry Cheesecake", H, "Creamy, light, decadent cheesecake with a blueberry purée swirl and graham cracker crust.", 5500],
];

// Square product-page URLs, pulled from ibakedelights.com's live Square Online store catalog.
const SQUARE_URLS: Record<string, string> = {
  "banana-pudding-cupcake": "https://ibakedelights.square.site/product/banana-pudding-cupcake/31",
  "red-velvet-cupcake": "https://ibakedelights.square.site/product/red-velvet-cupcake/1",
  "carrot-cake-cupcake": "https://ibakedelights.square.site/product/carrot-cake-cupcake/6",
  "key-lime-cupcake": "https://ibakedelights.square.site/product/key-lime-cupcake/2",
  "white-chocolate-cupcake": "https://ibakedelights.square.site/product/white-chocolate-cupcake/10",
  "classic-vanilla-cupcake-chocolate-icing": "https://ibakedelights.square.site/product/classic-vanilla-cupcake-chocolate-icing/3",
  "double-chocolate-delight-cupcake": "https://ibakedelights.square.site/product/double-chocolate-delight-cupcake/12",
  "classic-vanilla-cupcake-vanilla-icing": "https://ibakedelights.square.site/product/classic-vanilla-cupcake-vanilla-icing/4",
  "german-chocolate-cupcake": "https://ibakedelights.square.site/product/german-chocolate-cupcake/11",
  "classic-vanilla-cupcake-strawberry-icing": "https://ibakedelights.square.site/product/classic-vanilla-cupcake-strawberry-icing/5",
  "strawberry-cupcake": "https://ibakedelights.square.site/product/strawberry-cupcake/13",
  "carrot-cake": "https://ibakedelights.square.site/product/carrot-cake/15",
  "cream-cheese-pound-cake": "https://ibakedelights.square.site/product/cream-cheese-pound-cake/9",
  "classic-vanilla-cake-chocolate-icing": "https://ibakedelights.square.site/product/classic-vanilla-cake-chocolate-icing/19",
  "double-chocolate-delight-cake": "https://ibakedelights.square.site/product/double-chocolate-delight-cake/20",
  "strawberry-cake": "https://ibakedelights.square.site/product/strawberry-cake/21",
  "red-velvet-cake": "https://ibakedelights.square.site/product/red-velvet-cake/14",
  "peach-pound-cake": "https://ibakedelights.square.site/product/peach-pound-cake/22",
  "key-lime-cake": "https://ibakedelights.square.site/product/key-lime-cake/16",
  "german-chocolate-cake": "https://ibakedelights.square.site/product/german-chocolate-cake/18",
  "white-chocolate-cake": "https://ibakedelights.square.site/product/white-chocolate-cake/17",
  "classic-cheesecake": "https://ibakedelights.square.site/product/classic-cheesecake/23",
  "cinnamon-roll-cheesecake": "https://ibakedelights.square.site/product/cinnamon-roll-cheesecake/26",
  "oreo-cheesecake": "https://ibakedelights.square.site/product/oreo-cheesecake/27",
  "pecan-pie-cheesecake": "https://ibakedelights.square.site/product/pecan-pie-cheesecake/25",
  "red-velvet-cheesecake": "https://ibakedelights.square.site/product/red-velvet-cheesecake/28",
  "sweet-potato-cheesecake": "https://ibakedelights.square.site/product/sweet-potato-cheesecake/24",
  "banana-pudding-cheesecake": "https://ibakedelights.square.site/product/banana-pudding-cheesecake/40",
  "peach-cobbler-cheesecake": "https://ibakedelights.square.site/product/peach-cobbler-cheesecake/223",
  "blueberry-cheesecake": "https://ibakedelights.square.site/product/blueberry-cheesecake/238",
};

export const PRODUCTS: Product[] = ROWS.map(
  ([id, slug, name, category, description, priceCents, featured]) => ({
    id,
    slug,
    name,
    category,
    description,
    priceCents,
    priceLabel: fmt(priceCents),
    unitLabel: category === C ? "dozen" : undefined,
    image: "/images/products/" + slug + ".jpg",
    squareUrl: SQUARE_URLS[slug] ?? null,
    featured: !!featured,
  }),
);

/** Featured display order on the homepage. */
const FEATURED_ORDER = [
  "sweet-potato-cheesecake",
  "banana-pudding-cheesecake",
  "red-velvet-cupcake",
  "peach-cobbler-cheesecake",
];

export const CATEGORIES: Category[] = [
  { id: "cupcakes", label: "Cupcakes", notice: "Cupcake minimum order: one dozen." },
  { id: "cakes", label: "Cakes" },
  { id: "cheesecakes", label: "Cheesecakes" },
];

export const STORE_URL = "https://ibakedelights.square.site/";

export function getFeaturedProducts(): Product[] {
  return FEATURED_ORDER.map((slug) => PRODUCTS.find((p) => p.slug === slug && p.featured)).filter(
    (p): p is Product => !!p,
  );
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  return PRODUCTS.filter((p) => p.category === category);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
