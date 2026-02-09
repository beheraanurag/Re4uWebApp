"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

const heroSlides = [
  {
    id: 1,
    label: "Slide 1 of 4 · AI & similarity safety",
    title: "Pass AI & plagiarism checks confidently.",
    copy: "Screen your manuscript for AI-like phrasing and high similarity, then use editor feedback to revise until similarity and AI scores are within safe limits.",
    tags: ["AI & similarity review", "Turnitin / iThenticate focus", "Editor feedback built-in"],
    cta: "Explore AI & plagiarism support",
  },
  {
    id: 2,
    label: "Slide 2 of 4 · Abstract & section coaching",
    title: "Clarify your abstract, introduction & flow.",
    copy: "Get targeted feedback on abstract clarity, introduction structure, and overall manuscript flow to strengthen your narrative and improve reviewer reception.",
    tags: ["Abstract refinement", "Introduction structure", "Narrative flow"],
    cta: "See abstract & manuscript support",
  },
  {
    id: 3,
    label: "Slide 3 of 4 · Graphical abstracts & figures",
    title: "Graphical abstracts & figures that impress editors.",
    copy: "Create compelling visual summaries and professional figures that enhance your manuscript's impact and help reviewers quickly understand your research.",
    tags: ["Graphical abstracts", "Figure design", "Visual impact"],
    cta: "View graphical abstract options",
  },
  {
    id: 4,
    label: "Slide 4 of 4 · Editing & submission support",
    title: "End-to-end research paper editing & submission support.",
    copy: "Complete support from initial draft refinement through journal submission, response handling, and final acceptance.",
    tags: ["Full editing", "Submission guidance", "Response handling"],
    cta: "Explore full editing & submission",
  },
];

export function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const currentSlide = heroSlides[activeSlide];

  return (
    <section
      id="sec-hero"
      className="relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at top left, #e3f0ff 0, #f4f6fb 40%, #f9fafb 100%)",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="py-8 pb-6 sm:py-11 sm:pb-9">
          <div className="grid max-lg:grid-cols-1 grid-cols-[1.25fr_1.15fr] items-center gap-6 sm:gap-10">
            <div className="hero__left max-lg:order-1">
              <Badge className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(148,163,184,0.5)] bg-white px-3 py-1 text-[0.75rem] font-medium text-[#0b3c71] sm:text-[0.8rem]">
                <span className="h-2 w-2 flex-shrink-0 rounded-full bg-[#00a2a2]" />
                <span>From draft to journal decision – in one partner</span>
              </Badge>

              <h1 className="mb-1 mt-3 text-2xl font-bold leading-[1.12] tracking-[-0.03em] text-[#101827] sm:mt-4 md:text-[2.36rem] sm:text-[2.0rem]">
                Research paper editing &{" "}
                <span className="text-[#00a2a2]">journal submission support</span>{" "}
                you can trust.
              </h1>

              <p className="mb-0 max-w-[34rem] text-sm text-[#6b7280] sm:text-[0.98rem]">
                Pass AI and plagiarism checks confidently, reduce hidden rejection
                risks, and move from rough draft to submission-ready manuscript with
                ethical, end-to-end support.
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-6 sm:gap-3">
                <Button
                  asChild
                  className="w-full rounded-full bg-gradient-to-br from-[#0b3c71] to-[#132644] px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_30px_rgba(15,23,42,0.45)] transition-all hover:-translate-y-0.5 hover:shadow-lg sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  <Link href="/contact">Book 1:1 Expert Call</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full rounded-full border-slate-300 bg-white/90 px-4 py-2 text-xs font-semibold text-[#0b3c71] hover:bg-[#e4edf8] sm:w-auto sm:px-5 sm:py-2.5 sm:text-sm"
                >
                  See Editing Samples
                </Button>
              </div>

              <div className="mt-4 flex flex-wrap gap-4 text-[0.75rem] text-[#6b7280] sm:mt-6 sm:gap-6 sm:text-[0.82rem]">
                <div>
                  <strong className="block text-[0.8rem] text-[#101827] sm:text-[0.88rem]">
                    Fast turnarounds
                  </strong>
                  24–72 hours for most editing jobs.
                </div>
                <div>
                  <strong className="block text-[0.8rem] text-[#101827] sm:text-[0.88rem]">
                    Ethical & transparent
                  </strong>
                  COPE-aligned support – no ghostwriting.
                </div>
                <div>
                  <strong className="block text-[0.8rem] text-[#101827] sm:text-[0.88rem]">
                    Proven outcomes
                  </strong>
                  4,051+ researchers helped · 200+ acceptances.
                </div>
              </div>
            </div>

            <div
              aria-label="Key services carousel"
              className="relative max-lg:order-2 overflow-hidden rounded-[18px] border border-[rgba(148,163,184,0.65)] p-4 shadow-[0_20px_50px_rgba(15,23,42,0.10)] sm:rounded-[20px] sm:p-6"
              style={{
                background:
                  "radial-gradient(circle at top left, #ffffff 0, #e3f1ff 40%, #dbeafe 100%)",
              }}
            >
              <div className="mb-3 flex items-center justify-between gap-2 text-[0.7rem] text-[#6b7280] sm:mb-4 sm:text-[0.76rem]">
                <Badge className="min-w-0 flex-1 truncate rounded-full border border-[rgba(148,163,184,0.5)] bg-[rgba(15,23,42,0.06)] px-2 py-1 text-[0.7rem] text-[#6b7280] sm:px-3 sm:text-[0.76rem]">
                  {currentSlide.label}
                </Badge>
                <div className="flex flex-shrink-0 items-center gap-1.5" aria-hidden>
                  {heroSlides.map((_, index) => (
                    <span
                      key={index}
                      className={`rounded-full transition-all ${
                        index === activeSlide
                          ? "h-[7px] w-4 bg-[#0b3c71]"
                          : "h-[7px] w-[7px] bg-[rgba(148,163,184,0.8)]"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="relative">
                {heroSlides.map((slide, index) => (
                  <article
                    key={slide.id}
                    className={`grid max-md:grid-cols-1 grid-cols-[1.05fr_1.15fr] items-center gap-4 sm:gap-5 ${
                      index === activeSlide ? "grid" : "hidden"
                    }`}
                    data-label={slide.label}
                    style={{
                      animation: index === activeSlide ? "fadeIn 260ms ease-out" : "none",
                    }}
                  >
                    <div>
                      <h2 className="mb-1 text-base font-semibold text-[#0b3c71] sm:text-[1.15rem]">
                        {slide.title}
                      </h2>
                      <p className="mb-2 text-[0.8rem] text-[#6b7280] sm:mb-3 sm:text-[0.84rem]">
                        {slide.copy}
                      </p>
                      <div className="mb-3 flex flex-wrap gap-1 text-[0.7rem] sm:mb-4 sm:gap-1.5 sm:text-[0.72rem]">
                        {slide.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-[rgba(15,23,42,0.05)] px-1.5 py-0.5 text-[#6b7280] sm:px-2"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="mt-2 inline-flex h-auto cursor-pointer items-center gap-1 border-0 bg-transparent p-0 text-[0.75rem] text-[#0b3c71] hover:underline sm:mt-4 sm:text-[0.8rem]"
                      >
                        {slide.cta}
                        <span className="text-base sm:text-lg">↳</span>
                      </button>
                    </div>
                    <div
                      aria-hidden
                      className="relative h-[160px] w-full overflow-hidden rounded-[12px] border border-[rgba(15,23,42,0.4)] bg-[#020617] sm:h-[200px] sm:rounded-[14px]"
                    >
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-800 to-slate-950">
                        <span className="text-xs text-slate-400 sm:text-sm">
                          Visual placeholder
                        </span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pointer-events-none absolute bottom-3 left-3 right-3 flex flex-col items-end justify-between gap-2 sm:bottom-4 sm:left-auto sm:right-5 sm:flex-row sm:items-center sm:gap-0">
                <div className="order-2 flex gap-2 pointer-events-auto sm:order-1">
                  <button
                    type="button"
                    onClick={prevSlide}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[rgba(148,163,184,0.9)] bg-[rgba(255,255,255,0.96)] text-[0.9rem] transition-all hover:-translate-y-0.5 hover:bg-[#e4edf8] hover:shadow-[0_10px_24px_rgba(15,23,42,0.28)] active:scale-95 sm:h-8 sm:w-8"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full border border-[rgba(148,163,184,0.9)] bg-[rgba(255,255,255,0.96)] text-[0.9rem] transition-all hover:-translate-y-0.5 hover:bg-[#e4edf8] hover:shadow-[0_10px_24px_rgba(15,23,42,0.28)] active:scale-95 sm:h-8 sm:w-8"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
