"use client";

import { useEffect } from "react";
import { Cta } from "@/components/cta";
import { siteConfig } from "@/lib/site-config";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="mx-auto flex max-w-content flex-col items-center gap-5 px-4 py-[clamp(56px,10vw,120px)] text-center sm:px-10">
      <h1 className="m-0 font-serif text-[clamp(32px,4vw,46px)] leading-[1.1] font-normal">
        Something went wrong.
      </h1>
      <p className="m-0 max-w-[520px] text-lg leading-relaxed text-muted">
        Please try again. If this keeps happening, call or text us at{" "}
        <a href={siteConfig.phoneHref} className="font-bold text-primary">
          {siteConfig.phone}
        </a>
        .
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Cta href="#" onClick={(e) => { e.preventDefault(); reset(); }}>
          Try again
        </Cta>
        <Cta href="/" variant="outline">
          Back to Home
        </Cta>
      </div>
    </section>
  );
}
