import Link from "next/link";
import type { CaseStudy } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";

export function CaseStudiesPreview({ studies }: { studies: CaseStudy[] }) {
  return (
    <section
      className="py-8 md:py-14"
      style={{
        background:
          "radial-gradient(1100px 520px at 20% -10%, rgba(14, 165, 164, .12), transparent 60%), radial-gradient(900px 520px at 90% -10%, rgba(11, 45, 92, .10), transparent 55%), #f6f9fe",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="mb-2.5 text-xs uppercase tracking-[0.18em] text-[#5a6980]">
              Success Stories
            </div>
            <h2 className="m-0 text-3xl font-bold leading-[1.12] tracking-[-0.02em] md:text-[34px]">
              Case Studies
            </h2>
            <p className="mt-2.5 text-[15.5px] leading-relaxed text-[#5a6980]">
              Real outcomes from researchers we&apos;ve supported.
            </p>
          </div>
          <Link
            href="/case-studies"
            className="whitespace-nowrap text-sm font-semibold text-[#0b2d5c] hover:underline hover:text-[#0b3c71]"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((study) => (
            <Card
              key={study.id}
              className="overflow-hidden rounded-[18px] border border-[#d7e0ee] bg-white shadow-[0_12px_30px_rgba(11,18,32,.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(11,18,32,.06)]"
            >
              <CardContent className="p-5">
                <h3 className="mb-2 text-lg font-bold text-[#0b1220]">
                  {study.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#5a6980]">
                  {study.summary}
                </p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="inline-flex items-center gap-1 text-sm font-bold text-[#0b2d5c] hover:text-[#0ea5a4] hover:underline"
                >
                  Read more
                  <span>→</span>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
