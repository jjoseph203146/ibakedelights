import type { Metadata } from "next";
import { Cta } from "@/components/cta";
import { CategoryFilter } from "@/components/category-filter";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Cupcakes, cakes, and cheesecakes made from family recipes. Order on Square — cupcakes are sold by the dozen.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return (
    <>
      <section aria-labelledby="m-h" className="border-b border-border bg-pink-50">
        <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] items-end gap-8 px-4 py-[clamp(40px,6vw,72px)] sm:px-10">
          <div className="flex flex-col gap-3.5">
            <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">The menu</p>
            <h1 className="m-0 font-serif text-[clamp(40px,5vw,58px)] leading-[1.05] font-normal">
              Cupcakes, cakes &amp; cheesecakes
            </h1>
            <p className="m-0 max-w-[560px] text-lg leading-relaxed">
              Pick a dessert and select <b>Order on Square</b> to complete checkout. Cupcakes are sold by
              the dozen.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 rounded-md border border-border bg-card px-[22px] py-5">
            <span className="text-base font-extrabold">Need something for an event?</span>
            <span className="text-[15px] leading-relaxed text-muted">
              Larger quantities and custom requests go through our event inquiry — not the online store.
            </span>
            <Cta href="/events#inquiry" variant="dark" className="mt-1 self-start px-5 py-3 text-[15px]">
              Request an Event Quote
            </Cta>
          </div>
        </div>
      </section>

      <section aria-label="All products" className="mx-auto max-w-content px-4 py-[clamp(36px,5vw,56px)] pb-[clamp(56px,7vw,96px)] sm:px-10">
        <CategoryFilter readHash />
      </section>
    </>
  );
}
