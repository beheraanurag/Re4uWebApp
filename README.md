# Lumen Press (Next.js + Directus + shadcn/ui)

Modern editorial site with a blog powered by Directus and a Tiptap editor. The public site reads published content from Directus via REST/SDK.

## Requirements

- Node.js 20.9+ (Next.js 16 requirement)
- Docker (for local Directus + Postgres)

## Quickstart

1. Copy environment variables:

```bash
cp .env.example .env
```

2. Set required Docker env vars in `.env` (see [docs/docker.md](docs/docker.md)):
   - `DB_PASSWORD`, `DIRECTUS_ADMIN_EMAIL`, `DIRECTUS_ADMIN_PASSWORD`, `DIRECTUS_URL`, `DIRECTUS_SECRET` (e.g. `openssl rand -hex 32`).

3. Start the server stack:

```bash
docker compose up -d
```

4. Run the Next.js app:

```bash
npm install
npm run dev
```

**With reverse proxy (default):** open **http://localhost** for the app and **http://localhost/directus/** for Directus.  
**Without proxy:** open **http://localhost:3000** for the app and **http://localhost:8055** for Directus.

## Directus Setup

After Directus starts, visit **http://localhost/directus/** (via proxy) or **http://localhost:8055** (direct) and log in with the admin credentials from `.env`.

Create the following collections:

### `authors`
- `name` (string)
- `avatar` (file)
- `bio` (text)

### `tags`
- `name` (string)
- `slug` (string)

### `posts`
- `title` (string)
- `slug` (string)
- `excerpt` (text)
- `cover_image` (file)
- `author` (many-to-one → `authors`)
- `tags` (many-to-many → `tags`)
- `published_at` (datetime)
- `status` (string: `draft` / `published`)
- `content` (Rich Text interface with Tiptap)
- `updated_at` (datetime)

Create a **Public** role with read-only access to `posts`, `authors`, and `tags` and generate a static token. Put that value in `DIRECTUS_PUBLIC_TOKEN`.

### Directus admin theme (ResearchEdit4U)

The Data Studio can use the ResearchEdit4U design system theme (logo navy `#0b3c71`, ink `#111827`, CTA blue).

**Option A – Theme extension (version-controlled)**  
The custom theme lives in `directus/extensions/researchedit4u-light/`. After changing the theme, rebuild and restart Directus:

```bash
cd directus/extensions/researchedit4u-light && npm run build
docker compose restart directus
```

Then in Directus: **Settings → Theming** (or user appearance), choose **ResearchEdit4U Light** as the theme.

**Option B – Settings only (no code)**  
In Directus: **Settings → Project Settings → Branding**, set **Project Color** to `#0b3c71` and upload a 40×40 **Project Logo**. In **Settings → Theming**, customize the default Light theme (primary, foreground, backgrounds) to match; use **Custom CSS** with `#app` scope if needed for final overrides.

## Seed Sample Content

Create an admin access token in Directus (User profile → Access Tokens) and set it in `.env`:

```bash
DIRECTUS_ADMIN_TOKEN=your_admin_token
```

Then run:

```bash
npm run seed:directus
```

### Editor role

The seed tries to create an **Editor** role that can only do editorial work in Directus (content + files, no Settings/Data Model). If the seed skips it (403 on roles API), create it manually:

1. **Settings → User Roles** → Create role **Editor** (name/description as you like).
2. **Settings → Access Policies** → Create a policy (e.g. **Editor content**):
   - **App Access:** turn **ON**. (If this is off, Editor users see “No App Access” and cannot use the Data Studio.)
   - **Admin Access:** leave **OFF**.
   - Add permissions for: `posts`, `authors`, `tags`, `posts_tags` (create, read, update, delete) and `directus_files` (create, read, update).
3. Assign the policy to the **Editor** role (link the policy to the role in the policy or role form).
4. **User Management** → select the user → set **Role** to **Editor**.

**If an Editor user sees “No App Access”:** the policy attached to the Editor role does not have **App Access** enabled. Edit that policy in **Settings → Access Policies** and enable **App Access**.

### Auto-generate post slug from title

The slug field **does not update in the form** as you type. To have slug filled from the title when you save:

1. **Settings → Flows** → Create new flow named **"Post slug from title"**.
2. **Trigger:** Event Hook, type **Filter** (blocking) — Collection: `posts`, Events: `item.create`, `item.update`.
3. **Operation:** Add a **Run Script** operation with this code:

```js
const payload = $trigger?.payload ?? {};
const title = payload.title;
if (!title) return payload;
const slug = String(title)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .toLowerCase().trim()
  .replace(/\s+/g, '-')
  .replace(/[^\w-]+/g, '').replace(/--+/g, '-');
return { ...payload, slug };
```

4. Save and set the flow to **Active**. When you create or update a post, **leave the Slug field empty** and save — the flow will set the slug from the title before the item is saved.

## Deployment (Self-hosted Node)

```bash
npm install
npm run build
npm run start
```

Ensure `.env` is set on the server with `DIRECTUS_URL` and `DIRECTUS_PUBLIC_TOKEN`.

## Scripts

- `npm run dev` – local dev
- `npm run build` – production build
- `npm run start` – production server
