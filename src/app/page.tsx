import { getPublishedPosts } from "@/actions/posts";
import { getCaseStudies, getServices } from "@/lib/api";
import { Hero } from "@/components/sections/Hero";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustSection } from "@/components/sections/TrustSection";
import { BlogPreview } from "@/components/sections/BlogPreview";
import { CaseStudiesPreview } from "@/components/sections/CaseStudiesPreview";
import { FaqSection } from "@/components/sections/FaqSection";

// Cache for 60s to reduce CPU; revalidate in background (was force-dynamic)
export const revalidate = 60;

export default async function HomePage() {
  const [services, posts, studies] = await Promise.all([
    getServices(),
    getPublishedPosts(),
    getCaseStudies(),
  ]);

  return (
    <>
      <Hero />
      <TrustSection />
      <ServicesPreview services={services.slice(0, 6)} />
      <HowItWorks />
      <BlogPreview posts={posts.slice(0, 3)} />
      <CaseStudiesPreview studies={studies.slice(0, 2)} />
      <FaqSection />
    </>
  );
}
