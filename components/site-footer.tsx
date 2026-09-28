import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-pink-50 text-ink">
      <div className="mx-auto flex max-w-content flex-col gap-8 px-5 pt-12 pb-7 sm:px-10">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-8">
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-brand-pink bg-bg font-serif text-[15px] text-primary">
                iB
              </span>
              <span className="font-serif text-[22px]">{siteConfig.name}</span>
            </span>
            <span className="text-[15px] leading-relaxed text-muted">{siteConfig.tagline}</span>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5 text-base">
            <span className="font-extrabold">Explore</span>
            <Link href="/menu" className="text-ink no-underline hover:underline">
              Menu
            </Link>
            <Link href="/events" className="text-ink no-underline hover:underline">
              Events
            </Link>
            <Link href="/about" className="text-ink no-underline hover:underline">
              About
            </Link>
            <Link href="/contact" className="text-ink no-underline hover:underline">
              Contact
            </Link>
          </nav>

          <div className="flex flex-col gap-2.5 text-base">
            <span className="font-extrabold">Reach us</span>
            <a href={siteConfig.phoneHref} className="text-ink no-underline hover:underline">
              {siteConfig.phone}
            </a>
            <a href={siteConfig.emailHref} className="text-ink no-underline hover:underline">
              {siteConfig.email}
            </a>
          </div>

          <div className="flex flex-col gap-2.5 text-base">
            <span className="font-extrabold">Follow @ibakedelights</span>
            <a
              href={siteConfig.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink no-underline hover:underline"
            >
              Instagram
            </a>
            <a
              href={siteConfig.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ink no-underline hover:underline"
            >
              Facebook
            </a>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3 border-t border-border pt-[18px] text-sm text-muted">
          <span>Online orders are securely processed by Square.</span>
          <span>© {new Date().getFullYear()} {siteConfig.name}</span>
        </div>
      </div>
    </footer>
  );
}
