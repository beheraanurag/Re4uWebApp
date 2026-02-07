import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/actions/posts";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/about`, lastModified: new Date() },
    { url: `${baseUrl}/services`, lastModified: new Date() },
    { url: `${baseUrl}/blog`, lastModified: new Date() },
    { url: `${baseUrl}/case-studies`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];
  const posts = await getPublishedPosts();
  const postPages: MetadataRoute.Sitemap = posts
    .filter((p) => p.slug && p.slug !== "null")
    .map((p) => ({
      url: `${baseUrl}/blog/${p.slug}`,
      lastModified: new Date(),
    }));
  return [...staticPages, ...postPages];
}
