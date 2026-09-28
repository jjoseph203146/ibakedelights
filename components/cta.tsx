import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

/**
 * Shared call-to-action button/link. Three variants match the design
 * system's meaning, not just its look — keep them visually distinct:
 *  - "primary" (raspberry): buying — View Menu, Order Now, Order on Square.
 *  - "outline": secondary buying-adjacent actions (Our Story, Plan an Event
 *    from a light section).
 *  - "dark": event/custom-order inquiries — Request an Event Quote, Send
 *    Event Inquiry.
 */
export type CtaVariant = "primary" | "outline" | "dark";

const VARIANT_CLASSES: Record<CtaVariant, string> = {
  primary: "bg-primary text-white shadow-soft-primary hover:bg-primary-hover",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-white",
  dark: "bg-ink text-white shadow-soft hover:bg-ink-hover",
};

interface CtaProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  variant?: CtaVariant;
  external?: boolean;
  children: React.ReactNode;
  className?: string;
}

export function Cta({
  href,
  variant = "primary",
  external = false,
  children,
  className = "",
  ...rest
}: CtaProps) {
  const base =
    "inline-flex items-center justify-center gap-1 rounded-lg font-extrabold no-underline transition-colors " +
    "text-[17px] px-[30px] py-[17px] " +
    VARIANT_CLASSES[variant] +
    " " +
    className;

  if (external || href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={base} {...rest}>
        {children}
      </a>
    );
  }

  // Internal links, including same-page hash anchors like "#menu" or
  // cross-page anchors like "/events#inquiry" — Next's Link handles both.
  return (
    <Link href={href} className={base} {...rest}>
      {children}
    </Link>
  );
}
