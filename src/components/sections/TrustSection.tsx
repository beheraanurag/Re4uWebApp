"use client";

import { AnimatedNumber } from "@/components/core/animated-number";

export function TrustSection() {
  return (
    <section
      id="sec-trustband"
      className="py-8 md:py-12"
      style={{
        background:
          "radial-gradient(1200px 600px at 30% -10%, rgba(11, 74, 162, .08), transparent 60%), radial-gradient(900px 500px at 90% 0%, rgba(15, 118, 110, .06), transparent 55%), #f6f8fc",
        fontFamily:
          '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        WebkitFontSmoothing: "antialiased",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          className="relative max-sm:rounded-[24px] overflow-hidden rounded-[32px] shadow-[0_24px_80px_rgba(15,23,42,0.15)]"
          style={{
            background:
              "radial-gradient(circle at top left, #0b3b6f 0, #021f42 40%, #011b3a 100%)",
            padding: "20px 24px 24px",
          }}
        >
          <div
            className="pointer-events-none absolute opacity-75"
            style={{
              inset: "-40%",
              background:
                "radial-gradient(circle at 10% 0%, rgba(56, 189, 248, 0.22), transparent 55%), radial-gradient(circle at 90% 100%, rgba(129, 140, 248, 0.18), transparent 55%)",
            }}
          />
          <div className="relative z-10 flex flex-col gap-[18px]">
            <p className="m-0 text-base font-semibold uppercase tracking-[0.04em] text-[#cbd5f5] sm:text-lg">
              Trusted worldwide for{" "}
              <span className="font-bold text-white">ethical publication support.</span>
            </p>
            <div className="flex flex-col items-stretch gap-5 md:flex-row md:gap-8">
              <div className="flex max-md:justify-start flex-[3] flex-wrap justify-between gap-4">
                <article className="flex min-w-[120px] flex-1 flex-col gap-1">
                  <p className="m-0 text-xs uppercase tracking-[0.08em] text-[rgba(191,219,254,0.9)]">
                    Researchers supported
                  </p>
                  <p className="m-0 text-[26px] font-bold leading-[1.1] text-white sm:text-[32px]">
                    <AnimatedNumber
                      value={4051}
                      className="inline-block"
                      springOptions={{ bounce: 0, duration: 2000 }}
                    />
                    <span className="text-xl opacity-90 sm:text-2xl">+</span>
                  </p>
                  <p className="m-0 text-[13px] text-[rgba(226,232,240,0.9)]">
                    Researchers across disciplines.
                  </p>
                </article>
                <article className="flex min-w-[120px] flex-1 flex-col gap-1">
                  <p className="m-0 text-xs uppercase tracking-[0.08em] text-[rgba(191,219,254,0.9)]">
                    Journal acceptances
                  </p>
                  <p className="m-0 text-[26px] font-bold leading-[1.1] text-white sm:text-[32px]">
                    <AnimatedNumber
                      value={200}
                      className="inline-block"
                      springOptions={{ bounce: 0, duration: 2000 }}
                    />
                    <span className="text-xl opacity-90 sm:text-2xl">+</span>
                  </p>
                  <p className="m-0 text-[13px] text-[rgba(226,232,240,0.9)]">
                    Papers accepted in SCI/Scopus journals.
                  </p>
                </article>
                <article className="flex min-w-[120px] flex-1 flex-col gap-1">
                  <p className="m-0 text-xs uppercase tracking-[0.08em] text-[rgba(191,219,254,0.9)]">
                    Team experience
                  </p>
                  <p className="m-0 text-[26px] font-bold leading-[1.1] text-white sm:text-[32px]">
                    <AnimatedNumber
                      value={15}
                      className="inline-block"
                      springOptions={{ bounce: 0, duration: 2000 }}
                    />
                    <span className="text-xl opacity-90 sm:text-2xl">+</span>
                  </p>
                  <p className="m-0 text-[13px] text-[rgba(226,232,240,0.9)]">
                    Years of combined editorial experience.
                  </p>
                </article>
                <article className="flex min-w-[120px] flex-1 flex-col gap-1">
                  <p className="m-0 text-xs uppercase tracking-[0.08em] text-[rgba(191,219,254,0.9)]">
                    Satisfaction score
                  </p>
                  <p className="m-0 text-[26px] font-bold leading-[1.1] text-white sm:text-[32px]">
                    <AnimatedNumber
                      value={95}
                      className="inline-block"
                      springOptions={{ bounce: 0, duration: 2000 }}
                    />
                    <span className="text-xl opacity-90 sm:text-2xl">%</span>
                  </p>
                  <p className="m-0 text-[13px] text-[rgba(226,232,240,0.9)]">
                    Client rating based on feedback.
                  </p>
                </article>
              </div>
              <div className="grid max-sm:grid-cols-1 flex-[2] grid-cols-1 gap-2.5 sm:grid-cols-2">
                {[
                  {
                    emoji: "🛡",
                    title: "COPE aligned",
                    desc: "Ethical editing support.",
                  },
                  {
                    emoji: "📑",
                    title: "ICMJE aware",
                    desc: "Author guidelines respected.",
                  },
                  {
                    emoji: "📊",
                    title: "Reporting ready",
                    desc: "CONSORT · PRISMA · STROBE.",
                  },
                  {
                    emoji: "✒️",
                    title: "No ghostwriting",
                    desc: "Author-owned manuscripts.",
                  },
                ].map((item) => (
                  <article
                    key={item.title}
                    className="group relative flex flex-col gap-[3px] overflow-hidden rounded-[14px] border border-[rgba(148,163,184,0.45)] bg-[rgba(15,23,42,0.72)] text-xs text-[rgba(226,232,240,0.96)] transition-all hover:-translate-y-0.5 hover:border-[rgba(96,165,250,0.95)] hover:shadow-[0_14px_32px_rgba(15,23,42,0.75)]"
                    style={{ padding: "9px 11px" }}
                  >
                    <div className="flex items-center gap-1.5 font-semibold relative z-10">
                      <div className="flex h-[18px] w-[18px] flex-shrink-0 grid place-items-center rounded-full bg-[rgba(15,23,42,0.9)] text-[11px]">
                        {item.emoji}
                      </div>
                      <span>{item.title}</span>
                    </div>
                    <p className="relative z-10 m-0 text-[11px] text-[rgba(203,213,225,0.96)]">
                      {item.desc}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
