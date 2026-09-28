import { siteConfig } from "@/lib/site-config";

/**
 * LocalBusiness (Bakery) structured data, rendered site-wide from the root
 * layout. Only includes fields we actually know — no invented address,
 * hours, or price range (see design-reference/CLIENT-CHECKLIST.md: delivery
 * area and hours are intentionally unpublished until the client confirms
 * them). Add `address` and `openingHoursSpecification` once that's settled.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    sameAs: [siteConfig.instagramUrl, siteConfig.facebookUrl],
  };

  return (
    <script
      type="application/ld+json"
      // Static, server-generated JSON — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
