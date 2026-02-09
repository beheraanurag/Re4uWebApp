"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";

const steps = [
  {
    short: "Submit",
    name: "Submit requirement",
    title: "Submit requirement",
    body: "Share your manuscript, target journal, and any reviewer comments or deadlines.",
    note: "Clear intake",
  },
  {
    short: "Review",
    name: "Expert review",
    title: "Expert review",
    body: "We match your work with a PhD-level specialist in your field for an initial review.",
    note: "PhD-matched",
  },
  {
    short: "Quote",
    name: "Quote & confirmation",
    title: "Quote & confirmation",
    body: "Receive a transparent quote, timeline, and scope breakdown before we start.",
    note: "Transparent quote",
  },
  {
    short: "Edit & QC",
    name: "Editing & QC",
    title: "Editing & QC",
    body: "Your editor works on the file, followed by an internal quality-check to ensure consistency.",
    note: "Two-layer QC",
  },
  {
    short: "Delivery",
    name: "Final delivery",
    title: "Final delivery",
    body: "Get clean and tracked-changes files, plus support for queries until submission.",
    note: "Submission-ready",
  },
];

export function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const activeStepData = steps[activeStep];
  const visibleSteps = [
    activeStep > 0 ? steps[activeStep - 1] : steps[steps.length - 1],
    steps[activeStep],
    activeStep < steps.length - 1 ? steps[activeStep + 1] : steps[0],
  ]
    .filter(Boolean)
    .slice(0, 3);

  return (
    <section
      id="sec-process"
      className="py-7 md:py-9"
      style={{
        background:
          "radial-gradient(900px 450px at 25% 0%, rgba(10, 166, 166, .08), transparent 55%), radial-gradient(900px 450px at 85% 10%, rgba(11, 58, 120, .10), transparent 55%), #f3f6fb",
      }}
    >
      <div className="mx-auto max-w-[1180px] px-4 sm:px-6">
        <div className="overflow-hidden rounded-[26px] border border-[rgba(215,222,234,.9)] bg-[rgba(255,255,255,.55)] shadow-[0_10px_30px_rgba(13,28,56,.08)]">
          <div className="p-5 md:p-6">
            <div className="grid max-md:grid-cols-1 grid-cols-[1.2fr_0.8fr] gap-5">
              <div>
                <div className="mb-2.5 text-xs uppercase tracking-[0.18em] text-[#5a677f]">
                  How it works
                </div>
                <h2 className="m-0 mb-2.5 text-2xl font-bold leading-[1.15] md:text-[34px]">
                  A reliable workflow built for academic deadlines.
                </h2>
                <p className="mt-1 text-[15.5px] leading-relaxed text-[#5a677f]">
                  From intake to delivery, we keep you informed at every step with
                  transparent timelines and clear communication.
                </p>
              </div>
            </div>

            <div className="mt-4.5 rounded-[20px] border border-[rgba(215,222,234,.95)] bg-[rgba(255,255,255,.65)] p-4 sm:p-5">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-3.5">
                <div className="flex items-center gap-2.5 text-[13px] text-[#5a677f]">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(215,222,234,.95)] bg-[rgba(255,255,255,.8)] px-2.5 py-2">
                    <b className="font-bold text-[#0b1633]">Step {activeStep + 1}</b>
                    <span aria-hidden>•</span>
                    <span>{activeStepData.note}</span>
                  </div>
                </div>
                <div className="whitespace-nowrap text-xs text-[#5a677f] max-md:hidden">
                  Click steps to explore
                </div>
              </div>

              <div className="relative px-1.5 py-4 sm:px-2.5">
                <div
                  className="absolute left-3 right-3 top-7 h-0.5 rounded-full max-sm:hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(11, 58, 120, .18), rgba(10, 166, 166, .18))",
                  }}
                />
                <div
                  className="absolute left-3 top-7 h-0.5 rounded-full transition-all duration-500 max-sm:hidden"
                  style={{
                    width: `${(activeStep / (steps.length - 1)) * 100}%`,
                    background: "linear-gradient(90deg, #0b3a78, #0aa6a6)",
                  }}
                />
                <div className="relative z-10 flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-5 sm:gap-2.5 sm:overflow-visible sm:pb-0">
                  {steps.map((step, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setActiveStep(index)}
                      className="min-h-[54px] min-w-[84px] cursor-pointer appearance-none border-0 bg-transparent p-0 text-center sm:min-w-0"
                      aria-current={index === activeStep ? "true" : "false"}
                    >
                      <div
                        className={`mx-auto mb-1.5 grid h-[32px] w-[32px] place-items-center rounded-full border text-[12.5px] font-extrabold transition-all sm:h-[34px] sm:w-[34px] sm:text-[13px] ${
                          index === activeStep
                            ? "border-[rgba(11,58,120,.35)] bg-gradient-to-b from-[rgba(11,58,120,.14)] to-[rgba(10,166,166,.10)] text-[#0b1633] shadow-[0_14px_26px_rgba(11,58,120,.12)]"
                            : "border-[rgba(215,222,234,1)] bg-[rgba(255,255,255,.9)] text-[#0b3a78] hover:-translate-y-0.5 hover:shadow-[0_10px_20px_rgba(13,28,56,.08)]"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div
                        className={`px-1.5 text-[12px] leading-[1.2] ${
                          index === activeStep
                            ? "font-bold text-[#0b1633]"
                            : "text-[#5a677f]"
                        }`}
                      >
                        {step.short}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="mb-1 flex flex-wrap items-center justify-between gap-3">
                  <h3 className="m-0 text-[15.5px] font-extrabold tracking-[0.01em] sm:text-[16.5px]">
                    {activeStepData.title}
                  </h3>
                  <div className="flex flex-wrap items-center justify-end gap-2.5 text-xs text-[#5a677f]">
                    <span>
                      Step {activeStep + 1} of {steps.length}
                    </span>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleSteps.map((step, idx) => (
                    <Card
                      key={idx}
                      className="relative min-h-[124px] overflow-hidden rounded-[18px] border border-[rgba(215,222,234,.95)] bg-white p-3.5 shadow-[0_10px_22px_rgba(13,28,56,.06)]"
                    >
                      <div className="relative z-10">
                        <div className="mb-2 flex flex-wrap items-center justify-between gap-2.5">
                          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(215,222,234,1)] bg-[rgba(243,246,251,.8)] px-2.5 py-1.5 text-xs text-[#5a677f]">
                            <b className="text-[#0b1633]">
                              {steps.indexOf(step) + 1}
                            </b>
                            <span aria-hidden>•</span>
                            <span>{step.name}</span>
                          </div>
                          <span className="text-xs text-[#5a677f]">
                            Step {steps.indexOf(step) + 1} of {steps.length}
                          </span>
                        </div>
                        <h4 className="m-0 mb-1.5 text-[15.5px] font-semibold tracking-[0.01em]">
                          {step.title}
                        </h4>
                        <p className="m-0 text-[13.5px] leading-relaxed text-[#5a677f]">
                          {step.body}
                        </p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
