import type { Metadata } from "next";
import { Cta } from "@/components/cta";

export const metadata: Metadata = {
  title: "Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-content flex-col items-center gap-5 px-4 py-[clamp(56px,10vw,120px)] text-center sm:px-10">
      <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">404</p>
      <h1 className="m-0 font-serif text-[clamp(32px,4vw,46px)] leading-[1.1] font-normal">
        We couldn&apos;t find that page.
      </h1>
      <p className="m-0 max-w-[520px] text-lg leading-relaxed text-muted">
        The page you&apos;re looking for may have moved. Try the menu, or head back home.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Cta href="/menu">View the Menu</Cta>
        <Cta href="/" variant="outline">
          Back to Home
        </Cta>
      </div>
    </section>
  );
}
