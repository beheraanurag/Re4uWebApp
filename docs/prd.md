# Next.js + shadcn + Directus + Tiptap Blog Site

**Summary**
We’ll build a Next.js (App Router) website with an editorial‑minimal modern design, a blog listing, and blog detail pages. Directus will be self‑hosted via Docker and used as the Ghost‑like admin UI, with a rich‑text field using the Directus Tiptap editor. The public site will consume Directus content via REST/SDK. Deployment target is self‑hosted Node, so we’ll include build/run scripts and environment guidance.

**Public APIs / Interfaces / Types**
- **Directus content model** (Collections):
  - `posts`: `title`, `slug`, `excerpt`, `cover_image` (file), `author` (relation), `tags` (many‑to‑many), `published_at` (datetime), `status` (draft/published), `content` (rich text using Tiptap interface), `updated_at`
  - `authors`: `name`, `avatar` (file), `bio`
  - `tags`: `name`, `slug`
- **Environment variables**
  - `DIRECTUS_URL` (base URL, e.g. `http://localhost:8055`)
  - `DIRECTUS_PUBLIC_TOKEN` (for read‑only API access)
- **Next.js routes**
  - `/` Home page (hero + featured/latest posts)
  - `/blog` Blog listing
  - `/blog/[slug]` Blog detail

**Key Decisions (locked)**
- Directus self‑hosted with Docker Compose.
- Admin editing happens inside Directus (Ghost‑like workflow).
- Editorial minimal visual style.
- Standard post model.
- Self‑hosted Node deployment.

**Implementation Plan**
1. **Repo setup**
   - Initialize a new Next.js app in the repo root using App Router + TypeScript.
   - Install Tailwind and shadcn/ui.
   - Add a non‑default type pairing (e.g., IBM Plex Serif + IBM Plex Sans) and define CSS variables for editorial styling.

2. **Design system + UI**
   - Create a small design system: typography scale, spacing, colors, and editorial components (`PostCard`, `PostMeta`, `TagPill`, `Hero`).
   - Use shadcn components where appropriate (buttons, badges, cards).
   - Build a soft gradient or subtle pattern background for modern feel (light neutral).

3. **Directus local setup**
   - Add `docker-compose.yml` for Directus + Postgres.
   - Configure `DIRECTUS_URL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`.
   - Provide a quickstart section in `README` for local startup.

4. **Directus schema**
   - Define collections `posts`, `authors`, `tags` with relationships.
   - `content` field uses Directus Rich Text (Tiptap) interface.
   - Add a `status` field (draft/published) and `published_at`.
   - Create a public role with read‑only access to published posts.

5. **Data fetching layer**
   - Implement a small data client for Directus REST/SDK.
   - Fetch published posts for listing and post detail by slug.
   - Add minimal caching or `revalidate` (ISR) for blog pages.

6. **Public pages**
   - `/` hero section + latest posts grid.
   - `/blog` with pagination or “load more”.
   - `/blog/[slug]` with cover image, meta, content rendering.

7. **Content rendering**
   - Render Directus Rich Text (Tiptap JSON/HTML depending on output).
   - Sanitize output if using HTML.

8. **Deployment guidance**
   - Add `README` with build/run commands for self‑hosted Node.
   - Provide environment variable setup instructions.

**Tests / Validation**
- Manual smoke tests:
  - Directus admin login works.
  - Create a post with Tiptap editor and publish.
  - `/blog` shows the post.
  - `/blog/[slug]` renders correctly.
- Build check:
  - `npm run build` passes.
- API check:
  - Directus public token can fetch published posts.

**Assumptions**
- Directus Rich Text editor uses Tiptap and is acceptable to satisfy the “tiptap editor” requirement.
- Public site only needs read access to published content; admin access stays inside Directus.
- Basic SEO (title/meta/OG) will be included as part of page setup.