# Lumen Press (Next.js + Prisma + shadcn/ui)

Modern editorial site with a blog powered by Prisma and PostgreSQL. No Directus.

## Requirements

- Node.js 20.9+ (Next.js 16 requirement)
- Docker (optional, for local Postgres)

## Quickstart

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Set in `.env` (see [docs/docker.md](docs/docker.md)): `DB_PASSWORD` and `DATABASE_URL` with the same credentials (e.g. `blog`/`blog`/`blog`).

3. Start Postgres (if using Docker):

```bash
docker compose up -d
```

4. Create blog schema and seed:

```bash
npm install
npx prisma db push
npm run seed:blog
```

5. Run the Next.js app:

```bash
npm run dev
```

Open **http://localhost:3000** and **http://localhost:3000/blog**.

## Blog (Prisma)

- **Schema:** `prisma/schema.prisma` – `Post` model (title, slug, content, excerpt, coverImage, published, authorName, etc.).
- **Data layer:** `src/lib/blog.ts` – `getLatestPosts`, `getPostsPage`, `getPostBySlug`.
- **Seed:** `npm run seed:blog` – creates 3 sample posts (idempotent).

Content is stored as HTML in `Post.content`. Cover images use full URLs in `Post.coverImage`.

## Deployment and server updates

- **First-time setup:** See [docs/server-update.md](docs/server-update.md) for clone, `.env`, Docker, and running the Next.js app (e.g. with PM2).
- **After pushing new code:** On the server run:
  ```bash
  cd /path/to/Re4uWebApp
  git pull origin main    # or your branch name
  docker compose up -d    # only if you changed Docker/env
  npm ci && npm run build
  npx prisma db push      # if schema changed
  pm2 restart re4u-web    # or restart your process manager
  ```
  Full steps: [docs/server-update.md](docs/server-update.md).

## Scripts

- `npm run dev` – local dev
- `npm run build` – production build
- `npm run start` – production server
- `npm run seed:blog` – seed sample blog posts (idempotent)
