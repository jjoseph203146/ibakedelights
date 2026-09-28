"use client";

import { useId, useState } from "react";
import type { Product } from "@/data/products";
import { PhotoPlaceholder } from "./photo-placeholder";

interface ProductCardProps {
  product: Product;
  /** Heading level for the product name, so pages keep a sane outline. */
  level?: 2 | 3 | 4 | 5 | 6;
}

const DESCRIPTION_CLAMP_THRESHOLD = 80;

export function ProductCard({ product, level = 3 }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const descId = useId();
  const isLong = product.description.length > DESCRIPTION_CLAMP_THRESHOLD;
  const Heading = `h${level}` as const;

  return (
    <article className="flex h-full flex-col gap-3 rounded-md border border-border bg-card p-3 pb-[18px]">
      <PhotoPlaceholder
        label={`Photo needed: ${product.name}`}
        alt={`Photo of ${product.name}`}
        src={product.image}
        className="aspect-[4/3] w-full"
      />

      <div className="flex flex-1 flex-col gap-2 px-1">
        <Heading className="m-0 font-serif text-[21px] leading-[1.2] font-normal text-ink text-balance">
          {product.name}
        </Heading>

        <div className="text-[19px] font-extrabold text-ink">
          {product.priceLabel}
          {product.unitLabel && (
            <span className="text-[15px] font-semibold text-muted"> / {product.unitLabel}</span>
          )}
        </div>

        {isLong && !open ? (
          <p className="m-0 line-clamp-2 text-[15px] leading-[1.55] text-muted">{product.description}</p>
        ) : (
          <p id={descId} className="m-0 text-[15px] leading-[1.55] text-muted">
            {product.description}
          </p>
        )}

        {isLong && (
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={descId}
            className="cursor-pointer self-start bg-transparent p-0 py-1 text-sm font-bold text-primary underline underline-offset-[3px]"
          >
            {open ? "Show less" : "Full description"}
          </button>
        )}
      </div>

      {product.squareUrl ? (
        <a
          href={product.squareUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Order ${product.name} on Square (opens in a new tab)`}
          className="rounded bg-primary p-3.5 text-center text-base font-extrabold text-white no-underline hover:bg-primary-hover"
        >
          Order on Square ↗
        </a>
      ) : (
        <button
          type="button"
          disabled
          aria-disabled="true"
          title="Square link not yet added"
          className="cursor-not-allowed rounded border border-dashed border-brand-pink bg-pink-50 p-[13px] text-[15px] font-bold text-muted"
        >
          Ordering link coming soon
        </button>
      )}
    </article>
  );
}
