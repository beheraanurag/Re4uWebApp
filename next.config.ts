import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Satisfy Next.js 16 when webpack config is present (Turbopack is default)
  turbopack: {},
  webpack: (config) => {
    const existing = config.watchOptions ?? {};
    const ignored = existing.ignored ?? [];
    // Webpack watchOptions.ignored expects glob strings (non-empty), not RegExp
    const extraIgnored = [
      "**/directus/db/**",
      "**/directus/uploads/**",
      "**/directus/extensions/**",
    ];
    const base = Array.isArray(ignored) ? ignored : [ignored];
    const valid = base.filter((x): x is string => typeof x === "string" && x.length > 0);
    config.watchOptions = {
      ...existing,
      ignored: [...valid, ...extraIgnored],
    };
    return config;
  },
};

export default nextConfig;
