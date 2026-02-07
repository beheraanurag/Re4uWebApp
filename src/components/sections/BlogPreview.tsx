import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type PostPreview = {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags?: string[];
};

export function BlogPreview({ posts }: { posts: PostPreview[] }) {
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
              Resources
            </div>
            <h2 className="m-0 text-3xl font-bold leading-[1.12] tracking-[-0.02em] md:text-[34px]">
              Insights & Guides
            </h2>
            <p className="mt-2.5 text-[15.5px] leading-relaxed text-[#5a6980]">
              Practical resources on rejection, journal choice, and peer review.
            </p>
          </div>
          <Link
            href="/blog"
            className="whitespace-nowrap text-sm font-semibold text-[#0b2d5c] hover:underline hover:text-[#0b3c71]"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden rounded-[18px] border border-[#d7e0ee] bg-white shadow-[0_12px_30px_rgba(11,18,32,.08)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(11,18,32,.06)]"
            >
              <CardContent className="p-5">
                <h3 className="mb-2 text-lg font-bold text-[#0b1220]">
                  {post.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-[#5a6980]">
                  {post.excerpt}
                </p>
                {(post.tags ?? []).length > 0 && (
                  <div className="mb-4 flex flex-wrap gap-2">
                    {(post.tags ?? []).map((tag) => (
                      <Badge
                        key={tag}
                        className="rounded-full border border-[rgba(215,223,236,.95)] bg-[rgba(238,243,251,.7)] px-2 py-1 text-xs font-semibold text-[#0b2d5c]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
                <Link
                  href={`/blog/${post.slug}`}
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
