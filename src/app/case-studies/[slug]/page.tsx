import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy } from "@/lib/api";
import { Card } from "@/components/ui/card";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) return {};
  return {
    title: `${study.title} - Researchedit4u`,
    description: study.summary,
  };
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params;
  const study = await getCaseStudy(slug);
  if (!study) notFound();

  return (
    <section>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="text-4xl font-semibold">{study.title}</h1>
          <p className="mt-3 text-slate-600">{study.summary}</p>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Card className="space-y-2">
            <h2 className="text-lg font-semibold">Problem</h2>
            <p className="text-sm text-slate-600">{study.problem}</p>
          </Card>
          <Card className="space-y-2">
            <h2 className="text-lg font-semibold">Approach</h2>
            <p className="text-sm text-slate-600">{study.approach}</p>
          </Card>
          <Card className="space-y-2">
            <h2 className="text-lg font-semibold">Outcome</h2>
            <p className="text-sm text-slate-600">{study.outcome}</p>
          </Card>
          <Card className="space-y-2">
            <h2 className="text-lg font-semibold">Metrics</h2>
            <pre className="text-xs text-slate-600">
              {JSON.stringify(study.metricsJson, null, 2)}
            </pre>
          </Card>
        </div>
      </div>
    </section>
  );
}
