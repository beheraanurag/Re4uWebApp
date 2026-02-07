export type Tag = {
  id: string | number;
  name: string;
  slug: string;
};

export type Author = {
  id: string | number;
  name: string;
  avatar?: string | null;
  bio?: string | null;
};

export type Post = {
  id: string | number;
  title: string;
  slug: string;
  excerpt?: string | null;
  cover_image?: string | null;
  published_at?: string | null;
  updated_at?: string | null;
  status?: "draft" | "published" | string;
  content?: string | null;
  author?: Author | null;
  tags?: Tag[];
};

export type Service = {
  id: string;
  title: string;
  shortDescription: string;
  features: string[];
  isActive: boolean;
  createdAt: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  problem: string;
  approach: string;
  outcome: string;
  metricsJson: Record<string, unknown>;
  status: string;
  publishedAt: string | null;
};
