"use client";

import { useId, useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import { EVENT_TYPES, PRODUCT_INTERESTS, inquirySchema } from "@/lib/validation";

type Status = "editing" | "sending" | "sent" | "error";

const inputClass =
  "rounded-lg border border-input-border bg-white px-3 py-3 text-base text-ink";
const labelClass = "flex flex-col gap-1.5 text-[15px] font-bold";
const errorClass = "text-sm font-semibold text-primary";

export function InquiryForm() {
  const [status, setStatus] = useState<Status>("editing");
  const [firstName, setFirstName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const headingId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const raw = {
      name: String(fd.get("name") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      date: String(fd.get("date") || ""),
      type: String(fd.get("type") || ""),
      guests: String(fd.get("guests") || ""),
      zip: String(fd.get("zip") || ""),
      interests: fd.getAll("interest").map(String),
      message: String(fd.get("message") || ""),
      company: String(fd.get("company") || ""),
    };

    const parsed = inquirySchema.safeParse(raw);
    if (!parsed.success) {
      const flat = parsed.error.flatten().fieldErrors;
      const next: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(flat)) {
        if (msgs?.[0]) next[key] = msgs[0];
      }
      setFieldErrors(next);
      setStatus("error");
      setErrorMessage("Please check the highlighted fields below.");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || "Something went wrong.");
      }
      setFirstName(parsed.data.name.split(" ")[0] || "");
      setStatus("sent");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "We couldn't send your inquiry. Please call or text us instead.",
      );
    }
  }

  if (status === "sent") {
    return (
      <div
        id="inquiry"
        className="rounded-lg border border-border bg-card p-[clamp(22px,4vw,40px)] shadow-soft text-ink"
      >
        <div role="status" className="flex flex-col items-start gap-3.5">
          <span className="text-sm font-extrabold tracking-[0.12em] text-primary uppercase">
            Inquiry received — not an order
          </span>
          <h2 className="m-0 font-serif text-[32px] leading-[1.15] font-normal">
            Thank you{firstName ? `, ${firstName}` : ""}. We&apos;ll be in touch.
          </h2>
          <p className="m-0 text-[17px] leading-relaxed text-muted">
            Your event is not booked yet. iBake Delights will contact you regarding availability,
            pricing, and payment. Questions in the meantime? Call or text {siteConfig.phone}.
          </p>
          <button
            type="button"
            onClick={() => setStatus("editing")}
            className="cursor-pointer rounded-lg border-2 border-ink bg-transparent px-5 py-3 text-[15px] font-extrabold text-ink"
          >
            Send another inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div id="inquiry" className="rounded-lg border border-border bg-card p-[clamp(22px,4vw,40px)] shadow-soft text-ink">
      <form
        onSubmit={handleSubmit}
        aria-labelledby={headingId}
        noValidate
        className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-[18px]"
      >
        <div className="col-span-full flex flex-col gap-2">
          <h2 id={headingId} className="m-0 font-serif text-[clamp(28px,3.4vw,36px)] leading-[1.15] font-normal">
            Hire us for your next event
          </h2>
          <p className="m-0 text-base leading-relaxed text-muted">
            Prefer to talk? Call or text{" "}
            <a href={siteConfig.phoneHref} className="font-extrabold text-primary">
              {siteConfig.phone}
            </a>
            .
          </p>
        </div>

        {status === "error" && (
          <p role="alert" className="col-span-full m-0 rounded-lg border border-primary bg-pink-50 px-4 py-3 font-semibold text-primary">
            {errorMessage}
          </p>
        )}

        {/* Honeypot — hidden from sighted users and skipped by screen readers. Real visitors never fill this in. */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label>
            Company
            <input type="text" name="company" tabIndex={-1} autoComplete="off" />
          </label>
        </div>

        <label className={labelClass}>
          Full name *
          <input name="name" required autoComplete="name" className={inputClass} aria-invalid={!!fieldErrors.name} />
          {fieldErrors.name && <span className={errorClass}>{fieldErrors.name}</span>}
        </label>

        <label className={labelClass}>
          Email *
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            aria-invalid={!!fieldErrors.email}
          />
          {fieldErrors.email && <span className={errorClass}>{fieldErrors.email}</span>}
        </label>

        <label className={labelClass}>
          Phone number
          <input name="phone" type="tel" autoComplete="tel" className={inputClass} />
        </label>

        <label className={labelClass}>
          Event date *
          <input name="date" type="date" required className={inputClass} aria-invalid={!!fieldErrors.date} />
          {fieldErrors.date && <span className={errorClass}>{fieldErrors.date}</span>}
        </label>

        <label className={labelClass}>
          Event type *
          <select name="type" required defaultValue="" className={inputClass} aria-invalid={!!fieldErrors.type}>
            <option value="" disabled>
              Select one
            </option>
            {EVENT_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
          {fieldErrors.type && <span className={errorClass}>{fieldErrors.type}</span>}
        </label>

        <label className={labelClass}>
          Number of guests
          <input name="guests" type="number" min={1} inputMode="numeric" className={inputClass} />
        </label>

        <label className={labelClass}>
          Delivery ZIP code
          <input name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} className={inputClass} />
        </label>

        <fieldset className="col-span-full m-0 flex flex-col gap-2.5 border-0 p-0">
          <legend className="mb-2.5 p-0 text-[15px] font-bold">Products of interest</legend>
          <div className="flex flex-wrap gap-2.5">
            {PRODUCT_INTERESTS.map((interest) => (
              <label
                key={interest}
                className="flex cursor-pointer items-center gap-2 rounded-lg border border-border bg-pink-50 px-3.5 py-2.5 text-base font-semibold"
              >
                <input type="checkbox" name="interest" value={interest} className="h-[18px] w-[18px] accent-primary" />
                {interest}
              </label>
            ))}
          </div>
        </fieldset>

        <label className={`${labelClass} col-span-full`}>
          Message
          <textarea
            name="message"
            rows={5}
            placeholder="Flavors you're considering, quantities, theme, or questions"
            className={`${inputClass} resize-y font-sans`}
          />
        </label>

        <p className="col-span-full m-0 rounded-lg bg-pink-50 px-4 py-3 text-[15px] leading-relaxed font-bold text-ink">
          Submitting this form does not confirm an order. iBake Delights will contact you regarding
          availability, pricing, and payment.
        </p>

        <div className="col-span-full flex flex-wrap items-center gap-4">
          <button
            type="submit"
            disabled={status === "sending"}
            className="cursor-pointer rounded-lg border-0 bg-ink px-[30px] py-4 shadow-soft text-[17px] font-extrabold text-white hover:bg-ink-hover disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? "Sending…" : "Send Event Inquiry"}
          </button>
          <span className="text-sm text-muted">* Required · No payment is taken here.</span>
        </div>
      </form>
    </div>
  );
}
