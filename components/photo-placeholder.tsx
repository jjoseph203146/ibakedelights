/**
 * Stand-in for a photo the client hasn't supplied yet (see
 * design-reference/CLIENT-CHECKLIST.md). Renders a clearly labeled empty
 * state instead of a broken <img> or a stock/borrowed photo — a product's
 * placeholder must never be swapped for another dessert's photo.
 *
 * Once a real file exists at `src`, pass it and this renders a normal
 * next/image instead of the placeholder.
 */
import Image from "next/image";

interface PhotoPlaceholderProps {
  label: string;
  alt: string;
  src?: string | null;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function PhotoPlaceholder({
  label,
  alt,
  src,
  className = "",
  sizes,
  priority,
}: PhotoPlaceholderProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden rounded-lg bg-pink-50 ${className}`} role="img" aria-label={alt}>
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "(min-width: 900px) 25vw, 100vw"}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={label}
      className={`flex items-center justify-center rounded-lg border border-dashed border-brand-pink bg-pink-50 p-4 text-center ${className}`}
    >
      <span className="text-sm font-semibold text-muted">{label}</span>
    </div>
  );
}
