import { prisma } from "@/lib/db";
import type { Post } from "@/lib/types";

function mapRowToPost(row: {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  content: string;
  authorName: string | null;
  updatedAt: Date;
  createdAt: Date;
}): Post {
  return {
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt ?? null,
    cover_image: row.coverImage ?? null,
    content: row.content,
    published_at: row.updatedAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
    status: "published",
    author: row.authorName
      ? { id: row.id, name: row.authorName, avatar: null, bio: null }
      : null,
    tags: [],
  };
}

export async function getLatestPosts(limit = 6): Promise<Post[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
      take: limit,
    });
    return rows.map(mapRowToPost);
  } catch {
    return [];
  }
}

export async function getPostsPage(page = 1, limit = 9): Promise<Post[]> {
  try {
    const rows = await prisma.post.findMany({
      where: { published: true },
      orderBy: { updatedAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });
    return rows.map(mapRowToPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const row = await prisma.post.findUnique({
      where: { slug },
    });
    if (!row || !row.published) return null;
    return mapRowToPost(row);
  } catch {
    return null;
  }
}
