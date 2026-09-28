/**
 * Site-wide constants — business info, contact details, and nav structure.
 * Referenced by SiteHeader, SiteFooter, page metadata, and structured data.
 * Single source of truth: do not hardcode phone/email/social elsewhere.
 */

export const siteConfig = {
  name: "iBake Delights",
  shortName: "iBake Delights",
  tagline: "Homemade cupcakes, cakes, and cheesecakes from family recipes.",
  description:
    "Homemade cupcakes, cakes, and cheesecakes prepared from family recipes. Local ordering through Square, plus custom event inquiries in the Atlanta area.",
  // TODO(client): replace with the real production domain once it's chosen —
  // this only backs metadata/OG/sitemap URLs, never shown to visitors as copy.
  url: "https://ibakedelights.com",
  phone: "(470) 219-8338",
  phoneHref: "tel:+14702198338",
  email: "ibakedelights@yahoo.com",
  emailHref: "mailto:ibakedelights@yahoo.com",
  instagramUrl: "https://www.instagram.com/ibakedelights/",
  facebookUrl: "https://www.facebook.com/ibakedelights/",
  squareStoreUrl: "https://ibakedelights.square.site/",
} as const;

export interface NavLink {
  id: "home" | "menu" | "events" | "about" | "contact";
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { id: "home", label: "Home", href: "/" },
  { id: "menu", label: "Menu", href: "/menu" },
  { id: "events", label: "Events", href: "/events" },
  { id: "about", label: "About", href: "/about" },
  { id: "contact", label: "Contact", href: "/contact" },
];
