import type { Service } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function ServicesPreview({ services }: { services: Service[] }) {
  return (
    <section
      id="sec-offers"
      className="py-8 md:py-14"
      style={{
        background:
          "radial-gradient(900px 450px at 20% -10%, rgba(24, 198, 182, .10), transparent 60%), radial-gradient(900px 450px at 85% 0%, rgba(11, 42, 85, .10), transparent 55%), #f5f8ff",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          className="overflow-hidden rounded-[26px] border border-[rgba(17,34,68,.16)]"
          style={{
            background:
              "linear-gradient(180deg, rgba(255, 255, 255, .72), rgba(255, 255, 255, .55))",
            boxShadow: "0 10px 24px rgba(10, 18, 30, .08)",
          }}
        >
          <div className="grid grid-cols-1 gap-4 p-4 sm:gap-6 sm:p-6 md:grid-cols-[1.2fr_0.8fr] md:p-7 lg:p-8">
            <div>
              <div className="mb-2 text-[10px] uppercase tracking-[0.18em] text-[rgba(11,42,85,.70)] sm:mb-2.5 sm:text-xs">
                Services
              </div>
              <h2 className="m-0 text-2xl font-bold leading-[1.12] tracking-[-0.02em] sm:text-3xl md:text-[36px]">
                Choose a focused engagement or a full manuscript review.
              </h2>
              <p className="mt-2 max-w-[58ch] text-sm leading-relaxed text-[#5b677a] sm:mt-2.5 sm:text-base">
                From quick AI/similarity checks to comprehensive editing and journal
                matching—pick the support that fits your timeline and goals.
              </p>
            </div>
            <div className="mt-0 text-sm leading-relaxed text-[#5b677a] md:mt-0 sm:text-[15px]">
              <p>
                All services include transparent quotes, ethical handling, and
                submission-ready deliverables. Fast turnarounds available.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2 sm:gap-4 sm:p-4 md:p-6 lg:grid-cols-4">
            {services.map((service) => (
              <Card
                key={service.id}
                className="relative flex min-h-[280px] flex-col overflow-hidden rounded-[18px] border border-[rgba(17,34,68,.16)] bg-white p-3 shadow-[0_10px_24px_rgba(10,18,30,.08)] transition-shadow hover:shadow-[0_14px_32px_rgba(10,18,30,.12)] sm:min-h-[300px] sm:rounded-[22px] sm:p-4 md:min-h-[320px] md:p-5"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-70"
                  style={{
                    background:
                      "radial-gradient(600px 220px at 15% 0%, rgba(24, 198, 182, .10), transparent 60%)",
                  }}
                />
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="mb-2 flex min-w-0 flex-1 items-center justify-between gap-2 sm:mb-2.5">
                    <div className="min-w-0 flex-1 truncate text-[10px] uppercase tracking-[0.16em] text-[rgba(11,42,85,.70)] sm:text-xs">
                      {service.title.split(" ")[0]}
                    </div>
                    <div className="flex-shrink-0 whitespace-nowrap rounded-full border border-[rgba(17,34,68,.10)] bg-[#eef3ff] px-2 py-1 text-[10px] text-[rgba(11,42,85,.78)] sm:px-2.5 sm:py-1.5 sm:text-xs">
                      Service
                    </div>
                  </div>
                  <h3 className="m-0 mb-1.5 line-clamp-2 text-base font-semibold leading-tight tracking-[-0.01em] sm:mb-2 sm:text-lg">
                    {service.title}
                  </h3>
                  <p className="m-0 mb-2 line-clamp-2 text-xs font-semibold text-[rgba(11,42,85,.82)] sm:mb-3 sm:text-sm">
                    {service.shortDescription}
                  </p>
                  <ul className="m-0 mb-2.5 list-disc space-y-1 p-0 pl-3.5 text-xs leading-relaxed text-[#5b677a] sm:mb-3.5 sm:pl-4.5 sm:text-sm sm:space-y-1.5">
                    {service.features.slice(0, 3).map((feature) => (
                      <li key={feature} className="line-clamp-1">
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto flex flex-col gap-2 border-t border-dashed border-[rgba(17,34,68,.18)] pt-2 sm:flex-row sm:items-center sm:gap-2.5 sm:pt-2.5">
                    <Button
                      asChild
                      className="w-full rounded-full bg-gradient-to-b from-[#0b2a55] to-[#071e3b] px-3 py-2 text-center text-xs font-bold text-white shadow-[0_12px_28px_rgba(7,30,59,.22)] transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:px-3.5 sm:py-2.5 sm:text-sm"
                    >
                      <Link href={`/services#${service.id}`}>Get quote</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full rounded-full border-transparent bg-transparent px-1.5 py-0 text-xs font-bold text-[rgba(11,42,85,.88)] hover:underline sm:w-auto sm:text-sm"
                      asChild
                    >
                      <Link href={`/services#${service.id}`}>Learn more</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
