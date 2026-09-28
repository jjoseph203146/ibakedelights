import type { Metadata } from "next";
import Link from "next/link";
import { InquiryForm } from "@/components/inquiry-form";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, text, email, or send an event inquiry to iBake Delights.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section aria-labelledby="ct-h" className="border-b border-border bg-pink-50">
        <div className="mx-auto flex max-w-content flex-col gap-7 px-4 py-[clamp(40px,6vw,72px)] sm:px-10">
          <div className="flex max-w-[680px] flex-col gap-3">
            <p className="m-0 text-sm font-extrabold tracking-[0.14em] text-primary uppercase">Contact</p>
            <h1 id="ct-h" className="m-0 font-serif text-[clamp(40px,5vw,58px)] leading-[1.05] font-normal">
              We&apos;d love to hear from you.
            </h1>
          </div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-4">
            <div className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-[22px]">
              <span className="text-[13px] font-extrabold tracking-[0.1em] text-muted uppercase">Call or text</span>
              <a href={siteConfig.phoneHref} className="text-[22px] font-extrabold text-ink no-underline">
                {siteConfig.phone}
              </a>
            </div>
            <div className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-[22px]">
              <span className="text-[13px] font-extrabold tracking-[0.1em] text-muted uppercase">Email</span>
              <a href={siteConfig.emailHref} className="text-lg font-extrabold break-words text-ink">
                {siteConfig.email}
              </a>
            </div>
            <div className="flex flex-col gap-1.5 rounded-md border border-border bg-card p-[22px]">
              <span className="text-[13px] font-extrabold tracking-[0.1em] text-muted uppercase">
                Social · @ibakedelights
              </span>
              <span className="flex gap-[18px] text-lg font-extrabold">
                <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer">
                  Instagram ↗
                </a>
                <a href={siteConfig.facebookUrl} target="_blank" rel="noopener noreferrer">
                  Facebook ↗
                </a>
              </span>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-label="Choose how to reach us"
        className="mx-auto grid max-w-content grid-cols-[repeat(auto-fit,minmax(min(100%,380px),1fr))] gap-5 px-4 pt-[clamp(40px,5vw,64px)] sm:px-10"
      >
        <div className="flex flex-col items-start gap-2.5 rounded-md border border-border bg-card p-[26px]">
          <h2 className="m-0 text-xl font-extrabold">Placing a regular order?</h2>
          <p className="m-0 text-base leading-relaxed text-muted">
            Menu items are ordered and paid for securely on Square — no form needed.
          </p>
          <Link
            href="/menu"
            className="mt-1 rounded bg-primary px-[22px] py-3 text-base font-extrabold text-white no-underline hover:bg-primary-hover"
          >
            Go to the Menu
          </Link>
        </div>
        <div className="flex flex-col items-start gap-2.5 rounded-md border border-border bg-blush p-[26px]">
          <h2 className="m-0 text-xl font-extrabold">Planning an event or custom order?</h2>
          <p className="m-0 text-base leading-relaxed">
            Use the inquiry form below and we&apos;ll follow up with availability and pricing.
          </p>
          <a
            href="#inquiry"
            className="mt-1 rounded bg-ink px-[22px] py-3 text-base font-extrabold text-white no-underline hover:bg-ink-hover"
          >
            Jump to the Form
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-[900px] px-4 py-[clamp(40px,5vw,64px)] pb-[clamp(56px,7vw,96px)] sm:px-10">
        <InquiryForm />
      </section>
    </>
  );
}
