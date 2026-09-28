"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import type { NavLink } from "@/lib/site-config";

interface MobileNavigationProps {
  links: NavLink[];
  activeId: NavLink["id"];
}

/**
 * The hamburger button plus its stacked nav drawer, shown below the 900px
 * breakpoint (see SiteHeader). Manages its own open/closed state; SiteHeader
 * remounts it with `key={pathname}` so a route change always starts closed.
 */
export function MobileNavigation({ links, activeId }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const drawerId = useId();

  // Close the drawer on Escape for keyboard users.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <div className="nav:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={drawerId}
        aria-label="Menu"
        className="flex h-12 w-12 flex-col items-center justify-center gap-[5px] rounded-lg border border-border bg-card"
      >
        <span className="block h-0.5 w-5 bg-ink" />
        <span className="block h-0.5 w-5 bg-ink" />
        <span className="block h-0.5 w-5 bg-ink" />
      </button>

      {open && (
        <nav
          id={drawerId}
          aria-label="Main"
          className="absolute inset-x-0 top-full flex flex-col border-t border-border bg-card px-4 pt-2 pb-4 shadow-md sm:px-10"
        >
          {links.map((link) => {
            const isActive = link.id === activeId;
            return (
              <Link
                key={link.id}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={`border-b border-[#F3DDE3] py-3.5 text-lg font-bold no-underline ${
                  isActive ? "text-primary" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
