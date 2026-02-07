PLEASE IMPLEMENT THIS PLAN:
# Seed 3–4 Modern Blog Posts into Directus

**Summary**  
We will create the Directus schema (`authors`, `tags`, `posts`) and then run a one‑off seed script that uses an admin token to insert 3–4 editorial‑style posts. Each post will include a cover image URL from Unsplash, a clean rich‑text body, and at least one table.

**Public APIs / Interfaces / Types**  
- Uses Directus REST API via `@directus/sdk`.
- Admin token read from `DIRECTUS_ADMIN_TOKEN`.
- Base URL from `DIRECTUS_URL`.

**Implementation Steps**

1. **Confirm schema creation in Directus**
   - Collections:
     - `authors`: `name` (string), `avatar` (file), `bio` (text)
     - `tags`: `name` (string), `slug` (string)
     - `posts`:  
       `title` (string), `slug` (string), `excerpt` (text), `cover_image` (file),  
       `author` (many-to-one → `authors`),  
       `tags` (many-to-many → `tags`),  
       `published_at` (datetime), `status` (string: `draft`/`published`),  
       `content` (Rich Text editor / Tiptap),  
       `updated_at` (datetime)

2. **Add a one‑off seed script**
   - Create `scripts/seed-directus.ts` to:
     - Read `DIRECTUS_URL` + `DIRECTUS_ADMIN_TOKEN` from env.
     - Create 1–2 authors and 6–8 tags.
     - Create 4 posts with:
       - Title, slug, excerpt, published_at, status = `published`
       - Cover image as Unsplash URL (stored as `cover_image` if using URL field; if `cover_image` is file-only, use Directus `/files` upload; we’ll handle both in code)
       - Rich content containing headings, paragraphs, a list, and **one table** in HTML.
   - Script is idempotent: check for existing slug/tag name before creating.

3. **Content Style**
   - Tone: modern product/design studio
   - Post themes:
     1. “Designing for Calm Interfaces”
     2. “The Editorial System Behind Lumen”
     3. “From Workshop to Release Notes”
     4. “Typography as Product Strategy”
   - Each includes a short table (e.g., design principle → outcome).

4. **Run the seed**
   - Add script to `package.json`:
     - `seed:directus`: `tsx scripts/seed-directus.ts`
   - Run with:
     - `DIRECTUS_ADMIN_TOKEN=... npm run seed:directus`

5. **Verify**
   - Open Directus UI and confirm:
     - Authors/tags created
     - 4 posts published
   - Visit `/blog` and `/blog/[slug]`

**Tests / Validation**
- Manual:
  - Directus UI shows posts with tags + author + cover image.
  - Public site renders list + detail pages.
  - Table appears correctly in post body.

**Assumptions**
- Directus is running at `http://localhost:8055`.
- We can use admin token temporarily via env var.
- `cover_image` field can accept file upload; if it is strictly file‑only, we will upload via API first.