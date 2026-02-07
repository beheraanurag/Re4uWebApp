import type { Metadata } from "next";
import Link from "next/link";
import { getCaseStudies } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Case Studies - Researchedit4u",
  description:
    "Proof of impact through real academic editing engagements.",
};

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies();

  return (
    <section className="py-16 md:py-20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-semibold text-slate-900">
            Case studies
          </h1>
          <p className="mt-3 text-slate-600">
            See how we help researchers clarify arguments and meet editorial
            standards.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {studies.map((study) => (
            <Card
              key={study.id}
              className="border border-slate-200 shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-xl">{study.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">{study.summary}</p>
                <Link
                  href={`/case-studies/${study.slug}`}
                  className="mt-4 inline-flex text-sm font-medium text-slate-900 transition-colors hover:text-[#14b8a6]"
                >
                  View case study →
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
