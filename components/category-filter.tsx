"use client";

import { useEffect, useId, useState } from "react";
import { CATEGORIES, PRODUCTS, getProductsByCategory, type ProductCategory } from "@/data/products";
import { ProductCard } from "./product-card";

type FilterValue = "all" | ProductCategory;

const VALID_HASHES: FilterValue[] = ["all", "cupcakes", "cakes", "cheesecakes"];

interface CategoryFilterProps {
  /** When true, the initial category is read from the URL hash (used on the
   *  Menu page so links like /menu#cupcakes land on the right filter), and
   *  the filter re-syncs on hashchange. */
  readHash?: boolean;
  /** Heading level for each category group, so pages keep a sane outline. */
  groupHeadingLevel?: 2 | 3 | 4;
}

export function CategoryFilter({ readHash = false, groupHeadingLevel = 3 }: CategoryFilterProps) {
  const [category, setCategory] = useState<FilterValue>("all");
  const statusId = useId();

  useEffect(() => {
    if (!readHash) return;
    const applyHash = () => {
      const h = window.location.hash.replace("#", "");
      if ((VALID_HASHES as string[]).includes(h)) setCategory(h as FilterValue);
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, [readHash]);

  const tabs = [{ id: "all" as FilterValue, label: "All" }, ...CATEGORIES].map((c) => {
    const count = c.id === "all" ? PRODUCTS.length : getProductsByCategory(c.id).length;
    const pressed = category === c.id;
    return { id: c.id, label: c.label, count, pressed };
  });

  const groups =
    category === "all" ? CATEGORIES : CATEGORIES.filter((c) => c.id === category);

  const totalShown = groups.reduce(
    (sum, g) => sum + getProductsByCategory(g.id).length,
    0,
  );

  const GroupHeading = `h${groupHeadingLevel}` as const;

  return (
    <div className="flex flex-col gap-7">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setCategory(tab.id)}
              aria-pressed={tab.pressed}
              className={`flex min-h-[46px] cursor-pointer items-center gap-2 rounded-lg border px-[18px] py-2.5 text-base font-bold ${
                tab.pressed
                  ? "border-primary bg-primary text-white shadow-soft-primary"
                  : "border-border bg-card text-ink"
              }`}
            >
              {tab.pressed && <span aria-hidden="true">✓</span>}
              {tab.label} <span className="font-semibold opacity-85">({tab.count})</span>
            </button>
          ))}
        </div>
        <p id={statusId} aria-live="polite" className="m-0 text-[15px] text-muted">
          Showing {totalShown} {category === "all" ? "desserts" : category}
        </p>
      </div>

      <p className="m-0 rounded-lg border border-border bg-card px-4 py-3 text-[15px] leading-relaxed text-ink">
        Online orders are securely completed through Square. Product availability and order details are
        confirmed during checkout.
      </p>

      {groups.map((group) => {
        const items = getProductsByCategory(group.id);
        const headingId = `group-heading-${group.id}`;
        return (
          <section
            key={group.id}
            id={`group-${group.id}`}
            aria-labelledby={headingId}
            className="flex flex-col gap-[18px] pt-2"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-2.5 border-b border-border pb-3">
              <GroupHeading id={headingId} className="m-0 font-serif text-[clamp(26px,3vw,32px)] font-normal text-ink">
                {group.label} <span className="font-sans text-base font-semibold text-muted">{items.length} items</span>
              </GroupHeading>
              {group.notice && (
                <p className="m-0 rounded-lg border border-brand-pink bg-pink-50 px-3 py-1.5 text-[15px] font-extrabold text-primary">
                  {group.notice}
                </p>
              )}
            </div>

            {items.length === 0 ? (
              <p className="m-0 rounded-lg border border-border bg-card px-4 py-6 text-center text-base text-muted">
                No desserts in this category yet — check back soon.
              </p>
            ) : (
              <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-5">
                {items.map((product) => (
                  <ProductCard key={product.id} product={product} level={4} />
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
