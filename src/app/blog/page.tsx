import Link from "next/link";
import { Card } from "@/components/ui/card";
import { BlogHero } from "@/components/blog-hero";
import { getPostsPage, getAssetUrl } from "@/lib/directus";
import type { Post } from "@/lib/types";

export const revalidate = 60;

type BlogPageProps = {
  searchParams?: Promise<{ page?: string }>;
};

function formatBlogDate(value?: string | null): string {
  if (!value) return "";
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPostCard({ post }: { post: Post }) {
  const coverUrl = getAssetUrl(post.cover_image);
  return (
    <Card
      className="rounded-blog border overflow-hidden transition-all hover:shadow-blog2"
      style={{
        borderColor: "var(--stroke)",
        background: "var(--card)",
        boxShadow: "var(--shadow-blog)",
      }}
    >
      {coverUrl ? (
        <div className="aspect-[16/10] w-full overflow-hidden">
          <img
            src={coverUrl}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
      ) : null}
      <div className="p-4 sm:p-5">
        <div className="mb-2 sm:mb-3">
          {post.published_at ? (
            <p
              className="text-[10px] sm:text-xs mb-1.5 sm:mb-2"
              style={{ color: "var(--muted-blog)" }}
            >
              {formatBlogDate(post.published_at)}
            </p>
          ) : null}
          <h3 className="text-lg sm:text-xl font-bold mb-1.5 sm:mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p
            className="text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-3"
            style={{ color: "var(--muted-blog)" }}
          >
            {post.excerpt}
          </p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center text-xs sm:text-sm font-bold hover:underline"
          style={{ color: "var(--green)" }}
        >
          Read more →
        </Link>
      </div>
    </Card>
  );
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const page = Math.max(Number(resolvedParams?.page ?? 1), 1);
  const posts = await getPostsPage(page, 9);

  return (
    <div className="blog-page min-h-screen bg-white">
      <BlogHero />

      <section className="py-6 sm:py-8">
        <div className="max-w-[1180px] mx-auto px-4 sm:px-[18px]">
          {posts.length ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {posts.map((post) => (
                  <BlogPostCard key={post.id} post={post} />
                ))}
              </div>
              <div
                className="flex items-center justify-between text-sm mt-8"
                style={{ color: "var(--muted-blog)" }}
              >
                <Link
                  className={`rounded-full border px-4 py-2 ${page === 1
                      ? "pointer-events-none opacity-40"
                      : "hover:opacity-90"
                    }`}
                  style={{ borderColor: "var(--stroke)" }}
                  href={page === 1 ? "#" : `/blog?page=${page - 1}`}
                >
                  Previous
                </Link>
                <span>Page {page}</span>
                <Link
                  className={`rounded-full border px-4 py-2 ${posts.length < 9
                      ? "pointer-events-none opacity-40"
                      : "hover:opacity-90"
                    }`}
                  style={{ borderColor: "var(--stroke)" }}
                  href={
                    posts.length < 9 ? "#" : `/blog?page=${page + 1}`
                  }
                >
                  Next
                </Link>
              </div>
            </>
          ) : (
            <div
              className="rounded-blog2 border border-dashed p-10 text-center text-sm"
              style={{
                borderColor: "var(--stroke)",
                color: "var(--muted-blog)",
              }}
            >
              No posts found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
