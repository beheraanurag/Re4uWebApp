import type { Service, CaseStudy } from "@/lib/types";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const services: Service[] = [
  {
    id: "editing-support",
    title: "Editing Support",
    shortDescription: "Full manuscript editing and submission support.",
    features: ["Line editing", "Structure feedback", "Journal matching", "Response handling"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "data-services",
    title: "Data Services",
    shortDescription: "Data analysis and statistics support.",
    features: ["Sampling logic", "Instruments", "Analysis pathways", "Methodology support"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "research-planning",
    title: "Research Planning",
    shortDescription: "Research design and planning support.",
    features: ["Study design", "Protocol development", "Ethics alignment", "Timeline planning"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "presentations",
    title: "Presentations",
    shortDescription: "Graphical abstracts and presentation support.",
    features: ["Graphical abstracts", "Figure design", "Slide decks", "Poster design"],
    isActive: true,
    createdAt: new Date().toISOString(),
  },
];

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "From desk rejection to acceptance",
    slug: "desk-rejection-to-acceptance",
    summary: "How we helped a researcher revise and resubmit after desk rejection.",
    problem: "Manuscript desk-rejected for scope and clarity.",
    approach: "Structured revision plan and line editing with reviewer-style feedback.",
    outcome: "Accepted at a suitable journal after one revision round.",
    metricsJson: {},
    status: "published",
    publishedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "AI and similarity check support",
    slug: "ai-similarity-support",
    summary: "Supporting authors through AI detection and similarity concerns.",
    problem: "Author concerned about AI/similarity flags post-revision.",
    approach: "Screening and targeted revision to reduce similarity and AI-like phrasing.",
    outcome: "Manuscript passed checks and moved to review.",
    metricsJson: {},
    status: "published",
    publishedAt: new Date().toISOString(),
  },
];

export async function getServices(): Promise<Service[]> {
  return services;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return caseStudies;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  const study = caseStudies.find((s) => s.slug === slug);
  return study ?? null;
}
