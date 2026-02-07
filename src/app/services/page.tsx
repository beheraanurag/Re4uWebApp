import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ServicesFilter } from "@/components/sections/ServicesFilter";

export const metadata: Metadata = {
  title: "Services - Researchedit4u",
  description:
    "Academic editing services built for research clarity and submission success.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          "radial-gradient(1100px 550px at 15% 5%, rgba(215,168,75,.18), transparent 55%), radial-gradient(900px 520px at 85% 20%, rgba(47,111,104,.14), transparent 55%), linear-gradient(180deg, var(--mist) 0%, var(--paper) 100%)",
      }}
    >
      <section className="py-4 sm:py-8">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-[18px]">
          <div
            className="relative mx-auto my-4 mb-4 overflow-hidden rounded-[calc(var(--radius-service)+14px)] border border-[var(--line)] bg-[rgba(255,255,255,.72)] shadow-[0_10px_24px_rgba(20,35,45,.10)] backdrop-blur-[10px] sm:my-[18px] sm:mb-[22px]"
            style={{ borderRadius: "calc(var(--radius-service) + 14px)" }}
          >
            <div className="relative z-[1] flex min-h-[400px] flex-col gap-2 p-3 sm:h-[500px] sm:gap-3 sm:p-5">
              <div className="topRow flex flex-wrap items-center justify-between gap-2 sm:gap-3">
                <div className="kicker inline-flex items-center gap-1.5 font-extrabold uppercase tracking-[0.18em] text-[var(--muted-service)] text-[10px] sm:gap-2.5 sm:tracking-[0.22em] sm:text-xs">
                  <span className="dot h-2 w-2 rounded-full bg-[rgba(47,111,104,.92)] shadow-[0_10px_20px_rgba(47,111,104,.18)] sm:h-2.5 sm:w-2.5" />
                  Services
                </div>
                <div className="trust flex flex-wrap items-center gap-1.5 text-[11px] font-semibold text-[var(--muted-service)] sm:gap-2.5 sm:text-[12.8px]">
                  <span className="tDot mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[rgba(215,168,75,.95)] shadow-[0_10px_18px_rgba(215,168,75,.16)] sm:mr-1.5 sm:h-2 sm:w-2" />
                  <b className="font-extrabold text-[var(--ink)]">4,051+</b> researchers ·{" "}
                  <b className="font-extrabold text-[var(--ink)]">200+</b> acceptances
                </div>
              </div>
              <div className="slider flex-[1_1_auto] relative min-h-0 overflow-hidden rounded-[calc(var(--radius-service)+10px)] border border-[rgba(221,230,236,.95)] bg-[rgba(255,255,255,.82)] shadow-[0_10px_24px_rgba(20,35,45,.08)]">
                <div className="slide active pointer-events-auto absolute inset-0 grid translate-y-0 transform grid-cols-1 gap-3 p-3 opacity-100 sm:grid-cols-[1.05fr_.95fr] sm:gap-3.5 sm:p-[18px]">
                  <div className="left flex min-w-0 flex-col justify-center gap-2 sm:gap-3">
                    <h1 className="font-serif m-[8px_0_6px] text-xl font-semibold leading-[1.08] tracking-[-0.02em] sm:m-[10px_0_8px] sm:text-[clamp(26px,2.3vw,40px)]">
                      Research paper editing &{" "}
                      <b className="kw font-extrabold text-[var(--ink)]">
                        publication support
                      </b>{" "}
                      you can trust.
                    </h1>
                    <h2 className="m-0 mb-2 font-[650] leading-[1.35] text-[rgba(22,34,50,.92)] text-sm sm:mb-2.5 sm:text-[clamp(15.5px,1.1vw,18px)]">
                      From AI & similarity checks to full manuscript editing and
                      journal submission—ethical, end-to-end support.
                    </h2>
                    <p className="m-0 max-w-[58ch] font-medium leading-[1.65] text-[var(--muted-service)] text-xs sm:text-[14.6px]">
                      Pass AI and plagiarism checks confidently, reduce hidden
                      rejection risks, and move from rough draft to
                      submission-ready manuscript.
                    </p>
                    <div className="ctaRow flex flex-wrap items-center gap-2 sm:gap-2.5">
                      <Button
                        asChild
                        className="btn primary w-full cursor-pointer appearance-none rounded-full border-0 bg-gradient-to-br from-[rgba(47,111,104,1)] to-[rgba(76,139,132,1)] px-3 py-2 font-[750] text-xs text-white shadow-[0_14px_30px_rgba(47,111,104,.20)] transition-all hover:shadow-[0_18px_44px_rgba(47,111,104,.26)] sm:w-auto sm:px-3.5 sm:py-3 sm:text-sm whitespace-nowrap"
                      >
                        <Link href="/contact">Get quote</Link>
                      </Button>
                      <Button
                        variant="outline"
                        className="btn ghost w-full cursor-pointer appearance-none rounded-full border border-[rgba(221,230,236,.95)] bg-[rgba(255,255,255,.92)] px-3 py-2 font-[750] text-[var(--ink)] shadow-[0_10px_20px_rgba(20,35,45,.08)] transition-all hover:bg-white sm:w-auto sm:px-3.5 sm:py-3 sm:text-sm whitespace-nowrap"
                      >
                        See samples
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-[18px]">
          <div className="mb-6 sm:mb-8">
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold sm:text-3xl">
                  Choose a focused engagement or combine services
                </h2>
                <p className="text-sm text-[var(--muted-service)] sm:text-base">
                  From quick AI/similarity checks to comprehensive editing and
                  journal matching—pick the support that fits your timeline and
                  goals.
                </p>
              </div>
              <ServicesFilter services={services} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 sm:gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="rounded-[22px] border border-[var(--line)] bg-white p-6 shadow-[0_10px_24px_rgba(20,35,45,.08)] transition-all hover:shadow-[0_10px_24px_rgba(20,35,45,.10)]"
              >
                <div className="mb-4">
                  <Badge className="mb-2 text-xs">
                    {service.title.split(" ")[0]}
                  </Badge>
                  <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
                  <p className="mb-4 text-sm text-[var(--muted-service)]">
                    {service.shortDescription}
                  </p>
                </div>
                <ul className="mb-4 space-y-2">
                  {service.features.slice(0, 3).map((feature) => (
                    <li
                      key={feature}
                      className="text-sm text-[var(--muted-service)]"
                    >
                      • {feature}
                    </li>
                  ))}
                </ul>
                <Button asChild className="w-full">
                  <Link href={`/services#${service.id}`}>Get quote</Link>
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-[1240px] px-4 sm:px-[18px]">
          <Card className="rounded-[18px] border border-[var(--line)] bg-gradient-to-br from-[rgba(47,111,104,.08)] to-[rgba(215,168,75,.08)] p-6 text-center sm:rounded-[22px] sm:p-8">
            <h2 className="mb-3 text-xl font-bold sm:mb-4 sm:text-2xl">
              Ready to get started?
            </h2>
            <p className="mb-4 text-sm text-[var(--muted-service)] sm:mb-6 sm:text-base">
              Share your manuscript details and get a transparent quote within
              24 hours.
            </p>
            <Button
              asChild
              className="w-full rounded-full bg-gradient-to-br from-[rgba(47,111,104,1)] to-[rgba(76,139,132,1)] px-5 py-2.5 text-sm text-white sm:w-auto sm:px-6 sm:py-3 sm:text-base"
            >
              <Link href="/contact">Book 1:1 Expert Call</Link>
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
