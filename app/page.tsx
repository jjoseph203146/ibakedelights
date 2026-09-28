import type { Metadata } from "next";
import { Cta } from "@/components/cta";
import { ProductCard } from "@/components/product-card";
import { CategoryFilter } from "@/components/category-filter";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { getFeaturedProducts } from "@/data/products";

export const metadata: Metadata = {
  title: "Homemade cupcakes, cakes & cheesecakes",
  description:
    "Desserts made with generations of love. Homemade cupcakes, cakes, and cheesecakes from family recipes, ordered locally through Square.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-h"
        className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-6 px-4 py-[clamp(24px,4vw,48px)] pb-[clamp(48px,6vw,80px)] sm:px-10"
      >
        <div className="flex flex-col justify-between gap-9 rounded-md bg-blush px-6 py-8 sm:px-12 sm:py-14">
          <div className="flex flex-col gap-5">
            <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">
              Family recipes · Local ordering
            </p>
            <h1 className="m-0 text-[clamp(40px,5.2vw,62px)] leading-[1.05] font-normal tracking-[-0.01em] text-balance font-serif">
              Desserts made with generations of love.
            </h1>
            <p className="m-0 text-[clamp(17px,1.6vw,19px)] leading-relaxed">
              Homemade cupcakes, cakes, and cheesecakes prepared from family recipes and available for
              local ordering.
            </p>
          </div>
          <div className="flex flex-col gap-3.5">
            <div className="flex flex-wrap gap-3">
              <Cta href="#menu">View Menu</Cta>
              <Cta href="/events" variant="outline">
                Plan an Event
              </Cta>
            </div>
            <span className="text-sm">Checkout is completed securely on Square.</span>
          </div>
        </div>

        <div className="grid min-h-[clamp(380px,48vw,620px)] grid-rows-[minmax(0,1.6fr)_minmax(0,1fr)] gap-5">
          <PhotoPlaceholder label="Hero: dessert close-up" alt="Close-up of a homemade cheesecake" className="min-h-0" />
          <div className="grid min-h-0 grid-cols-2 gap-5">
            <PhotoPlaceholder label="Cupcake detail" alt="Frosted cupcakes" />
            <PhotoPlaceholder label="Baking process" alt="Baking in the kitchen" />
          </div>
        </div>
      </section>

      {/* Customer Favorites */}
      <section
        aria-labelledby="fav-h"
        className="mx-auto flex max-w-content flex-col gap-7 px-4 pb-[clamp(56px,7vw,88px)] sm:px-10"
      >
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h2 id="fav-h" className="m-0 font-serif text-[clamp(32px,4vw,46px)] leading-[1.1] font-normal">
              Customer Favorites
            </h2>
            <p className="m-0 text-lg text-muted">Four of our most-ordered desserts.</p>
          </div>
          <a href="#menu" className="font-extrabold no-underline">
            Browse all desserts ↓
          </a>
        </div>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,250px),1fr))] gap-5">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} level={3} />
          ))}
        </div>
      </section>

      {/* Browse All Desserts */}
      <section
        id="menu"
        aria-labelledby="menu-h"
        className="scroll-mt-[120px] border-t border-b border-border bg-pink-50"
      >
        <div className="mx-auto flex max-w-content flex-col gap-7 px-4 py-[clamp(56px,7vw,88px)] sm:px-10">
          <div className="flex flex-col gap-2">
            <h2 id="menu-h" className="m-0 font-serif text-[clamp(32px,4vw,46px)] leading-[1.1] font-normal">
              Browse All Desserts
            </h2>
            <p className="m-0 text-lg text-muted">
              Cupcakes, cakes, and cheesecakes — all made from family recipes.
            </p>
          </div>
          <CategoryFilter />
        </div>
      </section>

      {/* Ordering vs events */}
      <section
        aria-labelledby="how-h"
        className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-6 px-4 py-[clamp(56px,7vw,88px)] sm:px-10"
      >
        <div className="flex flex-col items-start gap-[18px] rounded-md border border-border bg-pink-50 p-[clamp(28px,4vw,48px)]">
          <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">
            Everyday orders
          </p>
          <h2 id="how-h" className="m-0 font-serif text-[clamp(28px,3vw,36px)] leading-[1.1] font-normal">
            How local ordering works
          </h2>
          <ol className="m-0 flex flex-col gap-2 pl-[22px] text-lg leading-loose">
            <li>Choose a dessert from the menu</li>
            <li>Complete checkout securely through Square</li>
            <li>Receive local delivery based on availability</li>
          </ol>
          <Cta href="#menu" className="mt-auto">
            Choose a Dessert
          </Cta>
        </div>
        <div className="flex flex-col items-start gap-[18px] rounded-md bg-blush p-[clamp(28px,4vw,48px)]">
          <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">
            Events &amp; custom orders
          </p>
          <h2 className="m-0 font-serif text-[clamp(28px,3vw,36px)] leading-[1.1] font-normal">
            Hire us for your next event
          </h2>
          <p className="m-0 text-lg leading-relaxed">
            Birthdays, baby showers, family gatherings, corporate events, and other celebrations. Send
            an inquiry and we&apos;ll follow up about availability and pricing.
          </p>
          <Cta href="/events#inquiry" variant="dark" className="mt-auto">
            Request an Event Quote
          </Cta>
        </div>
      </section>

      {/* Story teaser */}
      <section aria-labelledby="story-h" className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-[clamp(32px,6vw,80px)] px-4 py-[clamp(56px,7vw,88px)] sm:px-10">
          <PhotoPlaceholder
            label="Kitchen / bakers photo"
            alt="The bakers at work in the kitchen"
            className="aspect-[5/4]"
          />
          <div className="flex flex-col items-start gap-5">
            <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">
              Our family recipes
            </p>
            <h2 id="story-h" className="m-0 font-serif text-[clamp(32px,4vw,46px)] leading-[1.1] font-normal text-balance">
              The same recipes, still made by hand.
            </h2>
            <p className="m-0 text-lg leading-relaxed text-muted">
              Our desserts come from recipes passed down through generations. We bake every order
              ourselves, from scratch, in small batches.
            </p>
            <Cta href="/about" variant="outline">
              Our Story
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}
