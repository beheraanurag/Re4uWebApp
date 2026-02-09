import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PostMeta } from "@/components/post-meta";
import { TagPill } from "@/components/tag-pill";
import { getPostBySlug } from "@/lib/blog";
import { sanitizeContent } from "@/lib/sanitize";

export const revalidate = 60;

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const coverUrl = post.cover_image ?? null;
  const safeHtml = sanitizeContent(post.content ?? "");

  return (
    <div className="blog-page min-h-screen bg-white">
      <section className="py-8 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <span aria-hidden>←</span>
            Back to blog
          </Link>
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden className="select-none">/</li>
              <li>
                <Link href="/blog" className="hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden className="select-none">/</li>
              <li aria-current="page" className="text-foreground font-medium truncate max-w-[200px] sm:max-w-none">
                {post.title}
              </li>
            </ol>
          </nav>
          {coverUrl ? (
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg mb-6">
              <img
                src={coverUrl}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          ) : null}
          <div
            className="flex flex-wrap items-center gap-2 text-sm mb-3"
            style={{ color: "var(--muted-blog)" }}
          >
            <PostMeta publishedAt={post.published_at} author={post.author} />
          </div>
          <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
            {post.title}
          </h1>
          {post.excerpt ? (
            <p
              className="text-lg mt-4"
              style={{ color: "var(--muted-blog)" }}
            >
              {post.excerpt}
            </p>
          ) : null}
          {post.tags?.length ? (
            <div className="flex flex-wrap gap-2 mt-4">
              {post.tags.map((tag) => (
                <TagPill key={tag.id} tag={tag} />
              ))}
            </div>
          ) : null}

          <article
            className="rich-content mt-8 max-w-none text-foreground"
            dangerouslySetInnerHTML={{ __html: safeHtml }}
          />
        </div>
      </section>
    </div>
  );
}
