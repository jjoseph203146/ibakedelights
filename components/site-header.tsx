"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Cta } from "./cta";
import { MobileNavigation } from "./mobile-navigation";
import type { NavLink } from "@/lib/site-config";

function activeIdForPath(pathname: string): NavLink["id"] {
  const match = navLinks.find((l) => (l.href === "/" ? pathname === "/" : pathname.startsWith(l.href)));
  return match?.id ?? "home";
}

export function SiteHeader() {
  const pathname = usePathname();
  const activeId = activeIdForPath(pathname);

  return (
    <header className="sticky top-0 z-20 border-b border-border bg-card">
      <div className="bg-pink-50 border-b border-border px-4 py-2 text-center text-sm font-semibold text-ink">
        Homemade desserts from family recipes · Local orders ·{" "}
        <a href={siteConfig.phoneHref} className="font-extrabold text-primary">
          {siteConfig.phone}
        </a>
      </div>

      <div className="relative mx-auto flex min-h-[84px] max-w-content items-center justify-between gap-6 px-4 sm:px-10">
        <Link
          href="/"
          aria-label="iBake Delights home"
          className="flex flex-shrink-0 items-center gap-3 text-ink no-underline"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-brand-pink bg-pink-50 font-serif text-lg text-primary">
            iB
          </span>
          <span className="whitespace-nowrap font-serif text-[clamp(22px,2.4vw,27px)] leading-none">
            {siteConfig.name}
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-[30px] text-base font-semibold nav:flex">
          {navLinks.map((link) => {
            const isActive = link.id === activeId;
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`border-b-2 py-1.5 no-underline ${
                  isActive ? "border-primary text-primary" : "border-transparent text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden flex-shrink-0 nav:block">
          <Cta href="/menu" variant="primary" className="px-6 py-3.5 text-base">
            Order Now
          </Cta>
        </div>

        <div className="flex items-center gap-2 nav:hidden">
          <Link
            href="/menu"
            className="rounded-lg bg-primary px-4 py-3 text-[15px] font-extrabold text-white no-underline shadow-soft-primary hover:bg-primary-hover"
          >
            Order Now
          </Link>
          {/* key={pathname}: remount on navigation so the drawer always starts closed. */}
          <MobileNavigation key={pathname} links={navLinks} activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
