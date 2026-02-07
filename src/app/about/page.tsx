import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Researchedit4u",
  description: "Learn about our mission, process, and ethical standards.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#d4e7f7] via-[#e8f4fd] to-[#f5f9fc]">
        <div className="container flex flex-col gap-12 px-4 py-24 sm:px-6 lg:px-8 md:py-32">
          <div className="flex items-start">
            <div className="flex items-center gap-2.5 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm text-slate-800">
              <div className="h-2 w-2 flex-shrink-0 rounded-full bg-[#1e3a5f]" />
              <span>
                Share what you&apos;re working on — get next-step options in 1
                working day.
              </span>
            </div>
          </div>

          <div className="max-w-5xl">
            <h1 className="text-5xl font-bold leading-[1.15] text-slate-900 md:text-6xl lg:text-7xl">
              Share what you&apos;re working on —{" "}
              <span className="text-[#14b8a6]">
                get next-step options in 1 working day.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-slate-600 md:text-xl">
              Get practical resources on rejection, journal choice, and peer
              review. No spam.
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <div className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800">
              Ethics-first
            </div>
            <div className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800">
              Privacy-respectful
            </div>
            <div className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-800">
              Unsubscribe anytime
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container grid gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-3xl font-semibold">About Researchedit4u</h2>
            <p className="mt-4 text-slate-600">
              We are an academic editing partner focused on clarity, rigor, and
              research integrity. Our editors work with scholars across
              disciplines to elevate submissions and protect author voice.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-xl font-semibold">Our process</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-600">
              <li>Initial diagnostic review and scope alignment.</li>
              <li>Line edits with structured feedback and suggestions.</li>
              <li>Final review for consistency and submission readiness.</li>
            </ul>
          </div>
        </div>
        <div className="container mt-12 grid gap-6 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold">Ethical commitment</h3>
            <p className="mt-2 text-sm text-slate-600">
              We never fabricate content or claims. We enhance clarity, not
              authorship.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold">Quality standards</h3>
            <p className="mt-2 text-sm text-slate-600">
              Every engagement includes a quality checklist and reviewer-style
              notes.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="text-lg font-semibold">Supportive guidance</h3>
            <p className="mt-2 text-sm text-slate-600">
              We coach researchers on revisions and submission strategies.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
