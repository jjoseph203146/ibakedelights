import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product/page photos ship locally under /public/images once the client
    // provides them (see design-reference/CLIENT-CHECKLIST.md) — no remote
    // image host is needed.
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
