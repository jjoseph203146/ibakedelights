import type { Metadata } from "next";
import Link from "next/link";
import { Cta } from "@/components/cta";
import { PhotoPlaceholder } from "@/components/photo-placeholder";
import { InquiryForm } from "@/components/inquiry-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Events & Custom Orders",
  description:
    "Homemade desserts for birthdays, baby showers, family gatherings, corporate events, and other celebrations. Send an event inquiry — it's not an order.",
  alternates: { canonical: "/events" },
};

const OCCASIONS = ["Birthdays", "Baby showers", "Family gatherings", "Corporate events", "Other celebrations"];

const STEPS = [
  {
    n: "1",
    title: "Send an inquiry",
    body: "Share your date, guest count, delivery ZIP code, and the desserts you're interested in.",
  },
  {
    n: "2",
    title: "We follow up",
    body: "We'll contact you to discuss availability, options, and pricing.",
  },
  {
    n: "3",
    title: "Confirm and pay",
    body: "Your order is confirmed only once we've agreed on details and payment.",
  },
];

export default function EventsPage() {
  return (
    <>
      <section
        aria-labelledby="ev-h"
        className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,440px),1fr))] gap-6 px-4 py-[clamp(24px,4vw,48px)] pb-[clamp(48px,6vw,72px)] sm:px-10"
      >
        <div className="flex flex-col justify-center gap-[22px] rounded-md bg-blush px-6 py-8 sm:px-12 sm:py-14">
          <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">
            Events &amp; custom orders
          </p>
          <h1 className="m-0 font-serif text-[clamp(40px,5vw,58px)] leading-[1.05] font-normal text-balance">
            Homemade desserts for your celebration.
          </h1>
          <p className="m-0 text-lg leading-relaxed">
            Tell us about your event and we&apos;ll get back to you about availability, pricing, and
            payment.
          </p>
          <ul aria-label="Occasions" className="m-0 flex list-none flex-wrap gap-2 p-0">
            {OCCASIONS.map((o) => (
              <li key={o} className="rounded border border-border bg-card px-3.5 py-2.5 text-base font-bold">
                {o}
              </li>
            ))}
          </ul>
          <Cta href="#inquiry" variant="dark" className="self-start">
            Start an Event Inquiry
          </Cta>
        </div>
        <PhotoPlaceholder
          label="Event dessert table photo"
          alt="Dessert table set up for an event"
          className="min-h-[clamp(320px,42vw,560px)]"
        />
      </section>

      <section aria-labelledby="steps-h" className="border-t border-b border-border bg-pink-50">
        <div className="mx-auto flex max-w-content flex-col gap-7 px-4 py-[clamp(48px,6vw,80px)] sm:px-10">
          <h2 id="steps-h" className="m-0 font-serif text-[clamp(30px,3.6vw,42px)] leading-[1.1] font-normal">
            How event requests work
          </h2>
          <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-5 p-0">
            {STEPS.map((s) => (
              <li key={s.n} className="flex flex-col gap-2 rounded-md border border-border bg-card p-[26px]">
                <span aria-hidden="true" className="font-serif text-4xl leading-none text-primary">
                  {s.n}
                </span>
                <h3 className="m-0 text-lg font-extrabold">{s.title}</h3>
                <p className="m-0 text-base leading-relaxed text-muted">{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="m-0 text-base">
            Just need a dozen cupcakes or a single cake?{" "}
            <Link href="/menu" className="font-extrabold">
              Order from the menu
            </Link>{" "}
            instead.
          </p>
        </div>
      </section>

      <section
        aria-label="Event inquiry form"
        className="mx-auto flex max-w-content flex-wrap items-start gap-[clamp(24px,4vw,56px)] px-4 py-[clamp(48px,6vw,88px)] sm:px-10"
      >
        <div className="flex min-w-0 flex-1 basis-[280px] flex-col gap-[18px]">
          <h2 className="m-0 font-serif text-[clamp(28px,3vw,34px)] leading-[1.15] font-normal">
            Questions first?
          </h2>
          <p className="m-0 text-lg leading-relaxed text-muted">
            Call or text us — we&apos;re happy to talk through ideas before you send an inquiry.
          </p>
          <a href={siteConfig.phoneHref} className="text-2xl font-extrabold text-ink no-underline">
            {siteConfig.phone}
          </a>
          <a href={siteConfig.emailHref} className="text-lg font-bold">
            {siteConfig.email}
          </a>
          <PhotoPlaceholder
            label="Assorted desserts photo"
            alt="Assorted desserts"
            className="mt-2 aspect-[4/5]"
          />
        </div>
        <div className="min-w-0 flex-[2] basis-[520px]">
          <InquiryForm />
        </div>
      </section>
    </>
  );
}
