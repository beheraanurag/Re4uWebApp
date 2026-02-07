import { createDirectus, readItems, rest, staticToken } from "@directus/sdk";
import type { Author, Post, Tag } from "@/lib/types";

type DirectusSchema = {
  posts: Post[];
  authors: Author[];
  tags: Tag[];
};

const directusUrl = process.env.DIRECTUS_URL || "http://localhost:8055";
const directusToken = process.env.DIRECTUS_PUBLIC_TOKEN;

const directus = directusToken
  ? createDirectus<DirectusSchema>(directusUrl)
      .with(staticToken(directusToken))
      .with(rest())
  : createDirectus<DirectusSchema>(directusUrl).with(rest());

const baseFields = ["*", "author.*", "tags.tags_id.*"] as const;

function slugify(text: string): string {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-|-$/g, "") || "post";
}

function toTag(item: unknown): { id: string | number; name: string; slug: string } | null {
  if (!item || typeof item !== "object") return null;
  const raw = item as Record<string, unknown>;
  const tag = (raw.tags_id ?? raw) as Record<string, unknown> | null;
  if (!tag || typeof tag !== "object") return null;
  const id = tag.id;
  const name = tag.name;
  const slug = tag.slug;
  if (id == null || name == null || slug == null) return null;
  return {
    id: typeof id === "string" || typeof id === "number" ? id : String(id),
    name: String(name),
    slug: String(slug),
  };
}

function normalizePost(post: any): Post {
  const rawTags = post?.tags;
  const tags: Array<{ id: string | number; name: string; slug: string }> = [];
  if (Array.isArray(rawTags)) {
    for (const item of rawTags) {
      const tag = toTag(item);
      if (tag) tags.push(tag);
    }
  }
  const rawSlug = post?.slug;
  const slug =
    rawSlug != null && String(rawSlug).trim() !== ""
      ? String(rawSlug).trim()
      : post?.title
        ? slugify(post.title)
        : post?.id != null
          ? String(post.id)
          : "post";
  return {
    ...post,
    slug,
    tags,
  };
}

export function getAssetUrl(assetId?: string | null) {
  if (!assetId) return null;
  return `${directusUrl}/assets/${assetId}`;
}

export async function getLatestPosts(limit = 6) {
  try {
    const items = await directus.request(
      readItems("posts", {
        filter: { status: { _eq: "published" } },
        sort: ["-published_at"],
        limit,
        fields: baseFields as any,
      })
    );
    return items.map(normalizePost);
  } catch {
    return [];
  }
}

export async function getPostsPage(page = 1, limit = 8) {
  try {
    const items = await directus.request(
      readItems("posts", {
        filter: { status: { _eq: "published" } },
        sort: ["-published_at"],
        page,
        limit,
        fields: baseFields as any,
      })
    );
    return items.map(normalizePost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  if (!slug || slug === "null" || slug === "undefined") return null;
  try {
    const items = await directus.request(
      readItems("posts", {
        filter: { slug: { _eq: slug }, status: { _eq: "published" } },
        limit: 1,
        fields: baseFields as any,
      })
    );
    if (items.length) return normalizePost(items[0]);
    const fallback = await directus.request(
      readItems("posts", {
        filter: { status: { _eq: "published" } },
        limit: 200,
        fields: baseFields as any,
      })
    );
    const normalized = fallback.map(normalizePost);
    const match = normalized.find((p) => p.slug === slug);
    return match ?? null;
  } catch {
    return null;
  }
}
