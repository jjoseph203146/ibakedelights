import type { Metadata } from "next";
import { Cta } from "@/components/cta";
import { PhotoPlaceholder } from "@/components/photo-placeholder";

export const metadata: Metadata = {
  title: "About",
  description: "iBake Delights is a homemade dessert bakery making cupcakes, cakes, and cheesecakes from family recipes.",
  alternates: { canonical: "/about" },
};

const VALUES = [
  {
    term: "Family recipes",
    body: "Every dessert starts from a recipe handed down through generations.",
  },
  {
    term: "Homemade",
    body: "Baked in small batches — not a factory or a chain.",
  },
  {
    term: "Local",
    body: "Made for local orders and delivery based on availability.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section
        aria-labelledby="ab-h"
        className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(32px,6vw,80px)] px-4 py-[clamp(40px,6vw,80px)] sm:px-10"
      >
        <div className="flex flex-col gap-5">
          <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">Our story</p>
          <h1 className="m-0 font-serif text-[clamp(40px,5vw,58px)] leading-[1.05] font-normal text-balance">
            Recipes passed down, baked by hand.
          </h1>
          <p className="m-0 text-lg leading-relaxed">
            iBake Delights is a homemade dessert bakery making cupcakes, cakes, and cheesecakes from
            recipes that have been passed down through our family for generations.
          </p>
          <p className="m-0 text-lg leading-relaxed text-muted">
            We bake cupcakes, cakes, and cheesecakes for local orders, birthdays, showers, family
            gatherings, and events.
          </p>
          {/*
            CLIENT TO WRITE: the bakery's own 1-2 paragraph story — who the two
            bakers are and where the recipes come from. Never invent names or
            dates; remove this placeholder once real copy arrives.
          */}
          <p className="m-0 rounded-lg border border-dashed border-brand-pink bg-card p-3 font-mono text-[13px] leading-relaxed text-muted">
            CLIENT TO WRITE: 1–2 short paragraphs in your own words — who the two bakers are and where
            the recipes come from.
          </p>
        </div>
        <PhotoPlaceholder
          label="Portrait of the two bakers"
          alt="The two bakers in their kitchen"
          className="aspect-[4/5]"
        />
      </section>

      <section aria-labelledby="ab-v" className="border-t border-b border-border bg-pink-50">
        <div className="mx-auto flex max-w-content flex-wrap items-center gap-[clamp(24px,4vw,48px)] px-4 py-[clamp(48px,6vw,80px)] sm:px-10">
          <PhotoPlaceholder
            label="Family recipe card / kitchen detail"
            alt="Handwritten family recipe card"
            className="aspect-square flex-1 basis-[280px]"
          />
          <div className="min-w-0 flex-[2] basis-[520px] flex-col gap-[22px]">
            <h2 id="ab-v" className="m-0 font-serif text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-normal">
              How we bake
            </h2>
            <dl className="m-0 mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] gap-[18px]">
              {VALUES.map((v) => (
                <div key={v.term} className="flex flex-col gap-1.5 rounded-lg border border-border bg-card p-[22px] shadow-soft">
                  <dt className="text-lg font-extrabold">{v.term}</dt>
                  <dd className="m-0 text-base leading-relaxed text-muted">{v.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="ab-cta"
        className="mx-auto flex max-w-content flex-col items-center gap-[18px] px-4 py-[clamp(48px,6vw,80px)] text-center sm:px-10"
      >
        <h2 id="ab-cta" className="m-0 font-serif text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-normal">
          Taste the family recipes
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          <Cta href="/menu">View the Menu</Cta>
          <Cta href="/events" variant="outline">
            Plan an Event
          </Cta>
        </div>
      </section>
    </>
  );
}
