import "dotenv/config";
import { createDirectus, rest, staticToken, readItems, createItem } from "@directus/sdk";

const DIRECTUS_URL = process.env.DIRECTUS_URL || "http://localhost:8055";
let directusAdminToken = process.env.DIRECTUS_ADMIN_TOKEN;
const DIRECTUS_ADMIN_EMAIL = process.env.DIRECTUS_ADMIN_EMAIL;
const DIRECTUS_ADMIN_PASSWORD = process.env.DIRECTUS_ADMIN_PASSWORD;

async function loginWithEmail() {
  if (!DIRECTUS_ADMIN_EMAIL || !DIRECTUS_ADMIN_PASSWORD) return null;
  const res = await fetch(`${DIRECTUS_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: DIRECTUS_ADMIN_EMAIL,
      password: DIRECTUS_ADMIN_PASSWORD,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Directus login failed: ${text}`);
  }
  const data = await res.json();
  return data?.data?.access_token as string | undefined;
}

/** Client with rest() has .request(); SDK types are strict so we use a loose type for seed script. */
type DirectusRestClient = { request: (op: unknown) => Promise<unknown> };
let directusClient: DirectusRestClient | null = null;

type DirectusCollection = {
  collection: string;
};

function isConnectionRefused(err: unknown): boolean {
  const cause = err instanceof Error ? (err as { cause?: { code?: string } }).cause : null;
  return cause != null && typeof cause === "object" && (cause as { code?: string }).code === "ECONNREFUSED";
}

async function directusRequest(path: string, init?: RequestInit) {
  let res: Response;
  try {
    res = await fetch(`${DIRECTUS_URL}${path}`, {
      ...init,
      headers: {
        Authorization: `Bearer ${directusAdminToken}`,
        "Content-Type": "application/json",
        ...(init?.headers ?? {}),
      },
    });
  } catch (err) {
    if (isConnectionRefused(err)) {
      throw new Error(
        `Cannot connect to Directus at ${DIRECTUS_URL}. Is Directus running? Start with: docker compose up -d. If using port 8055, set DIRECTUS_URL=http://localhost:8055`
      );
    }
    throw err;
  }

  if (!res.ok) {
    const text = await res.text();
    if (res.status === 401) {
      throw new Error(
        `Directus API 401: Invalid token or credentials. Set DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD in .env to log in with credentials, or create a new token in Directus (admin user → Access Tokens). Original: ${text}`
      );
    }
    if (res.status === 403) {
      throw new Error(
        `Directus API 403 (no permission). The token/user must be an Administrator with full access. ` +
          `Use the admin account: set DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD in .env and remove or leave empty DIRECTUS_ADMIN_TOKEN so the script logs in as admin. ` +
          `Or create a new token in Directus (admin user → Access Tokens) and set DIRECTUS_ADMIN_TOKEN. Original: ${text}`
      );
    }
    throw new Error(`Directus API error ${res.status}: ${text}`);
  }
  return res.json();
}

async function ensureCollection(name: string, meta?: Record<string, any>) {
  const collections = await directusRequest("/collections");
  const exists = collections.data?.some((c: DirectusCollection) => c.collection === name);
  if (exists) return;

  await directusRequest("/collections", {
    method: "POST",
    body: JSON.stringify({ collection: name, meta }),
  });
}

async function ensureField(collection: string, field: string, payload: Record<string, any>) {
  const fields = await directusRequest(`/fields/${collection}`);
  const exists = fields.data?.some((f: any) => f.field === field);
  if (exists) return;

  await directusRequest(`/fields/${collection}`, {
    method: "POST",
    body: JSON.stringify({ field, ...payload }),
  });
}

async function updateField(collection: string, field: string, payload: Record<string, any>) {
  await directusRequest(`/fields/${collection}/${field}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

async function ensureSchema() {
  await ensureCollection("authors", { icon: "person", note: "Blog authors" });
  await ensureCollection("tags", { icon: "tag", note: "Blog tags" });
  await ensureCollection("posts", { icon: "article", note: "Blog posts" });
  await ensureCollection("posts_tags", { icon: "link", note: "Posts ↔ Tags" });

  await ensureField("authors", "name", {
    type: "string",
    meta: { interface: "input", required: true },
  });
  await ensureField("authors", "avatar", {
    type: "uuid",
    meta: { interface: "file-image", special: ["file"] },
    schema: {
      foreign_key_table: "directus_files",
      foreign_key_column: "id",
      on_delete: "SET NULL",
      on_update: "CASCADE",
    },
  });
  await ensureField("authors", "bio", {
    type: "text",
    meta: { interface: "input-multiline" },
  });

  await ensureField("tags", "name", {
    type: "string",
    meta: { interface: "input", required: true },
  });
  await ensureField("tags", "slug", {
    type: "string",
    meta: { interface: "input", required: true },
  });

  await ensureField("posts", "title", {
    type: "string",
    meta: { interface: "input", required: true },
  });
  await ensureField("posts", "slug", {
    type: "string",
    meta: { interface: "input", required: false },
  });
  try {
    const postsFields = await directusRequest("/fields/posts");
    const slugField = postsFields.data?.find((f: any) => f.field === "slug");
    if (slugField) {
      await updateField("posts", "slug", {
        meta: {
          ...slugField.meta,
          required: false,
          note: "Leave empty to auto-fill from title on save (create Flow 'Post slug from title' in README).",
          options: { placeholder: "Leave empty → auto from title" },
        },
      });
    }
  } catch {
    // PATCH may fail on some Directus versions
  }
  await ensureField("posts", "excerpt", {
    type: "text",
    meta: { interface: "input-multiline" },
  });
  await ensureField("posts", "cover_image", {
    type: "uuid",
    meta: { interface: "file-image", special: ["file"] },
    schema: {
      foreign_key_table: "directus_files",
      foreign_key_column: "id",
      on_delete: "SET NULL",
      on_update: "CASCADE",
    },
  });
  await ensureField("posts", "author", {
    type: "uuid",
    meta: { interface: "select-dropdown-m2o" },
    schema: {
      foreign_key_table: "authors",
      foreign_key_column: "id",
      on_delete: "SET NULL",
      on_update: "CASCADE",
    },
  });
  await ensureField("posts", "published_at", {
    type: "dateTime",
    meta: { interface: "input-datetime" },
  });
  await ensureField("posts", "status", {
    type: "string",
    meta: {
      interface: "select-dropdown",
      options: { choices: [{ text: "draft", value: "draft" }, { text: "published", value: "published" }] },
    },
  });
  await ensureField("posts", "content", {
    type: "text",
    meta: { interface: "input-rich-text-html" },
  });
  await ensureField("posts", "updated_at", {
    type: "dateTime",
    meta: { special: ["date-updated"], interface: "input-datetime" },
  });

  await ensureField("posts_tags", "posts_id", {
    type: "uuid",
    meta: { interface: "select-dropdown-m2o" },
    schema: {
      foreign_key_table: "posts",
      foreign_key_column: "id",
      on_delete: "CASCADE",
      on_update: "CASCADE",
    },
  });
  await ensureField("posts_tags", "tags_id", {
    type: "uuid",
    meta: { interface: "select-dropdown-m2o" },
    schema: {
      foreign_key_table: "tags",
      foreign_key_column: "id",
      on_delete: "CASCADE",
      on_update: "CASCADE",
    },
  });

  await ensureField("posts", "tags", {
    type: "alias",
    meta: {
      interface: "list-m2m",
      special: ["m2m"],
      many_collection: "posts",
      many_field: "tags",
      one_collection: "tags",
      junction_field: "posts_id",
      one_field: "tags_id",
      related_collection: "tags",
    },
  });
}

const EDITOR_ROLE_NAME = "Editor";
const EDITOR_POLICY_NAME = "Editor content";

async function ensureEditorRole() {
  const rolesRes = await directusRequest("/roles?filter[name][_eq]=" + encodeURIComponent(EDITOR_ROLE_NAME));
  const existingRole = rolesRes.data?.[0];
  let roleId: string;

  if (existingRole?.id) {
    roleId = existingRole.id;
  } else {
    const createRoleRes = await directusRequest("/roles", {
      method: "POST",
      body: JSON.stringify({
        name: EDITOR_ROLE_NAME,
        description: "Can only edit content (posts, authors, tags). No access to Settings, Data Model, or Users.",
        icon: "edit_note",
      }),
    });
    roleId = createRoleRes.data?.id;
    if (!roleId) throw new Error("Failed to create Editor role.");
  }

  const policiesRes = await directusRequest("/policies?filter[name][_eq]=" + encodeURIComponent(EDITOR_POLICY_NAME));
  const existingPolicy = policiesRes.data?.[0];
  let policyId: string;

  if (existingPolicy?.id) {
    policyId = existingPolicy.id;
    await directusRequest(`/policies/${policyId}`, {
      method: "PATCH",
      body: JSON.stringify({ roles: [roleId] }),
    });
  } else {
    const createPolicyRes = await directusRequest("/policies", {
      method: "POST",
      body: JSON.stringify({
        name: EDITOR_POLICY_NAME,
        description: "Full CRUD on blog content; read/create/update files. No admin or schema access.",
        icon: "article",
        app_access: true,
        admin_access: false,
        roles: [roleId],
      }),
    });
    policyId = createPolicyRes.data?.id;
    if (!policyId) throw new Error("Failed to create Editor policy.");
  }

  const permissionsRes = await directusRequest("/permissions?filter[policy][_eq]=" + policyId);
  const existingPerms = (permissionsRes.data ?? []) as { collection: string; action: string }[];
  const needed = [
    { collection: "posts", action: "create" },
    { collection: "posts", action: "read" },
    { collection: "posts", action: "update" },
    { collection: "posts", action: "delete" },
    { collection: "authors", action: "create" },
    { collection: "authors", action: "read" },
    { collection: "authors", action: "update" },
    { collection: "authors", action: "delete" },
    { collection: "tags", action: "create" },
    { collection: "tags", action: "read" },
    { collection: "tags", action: "update" },
    { collection: "tags", action: "delete" },
    { collection: "posts_tags", action: "create" },
    { collection: "posts_tags", action: "read" },
    { collection: "posts_tags", action: "update" },
    { collection: "posts_tags", action: "delete" },
    { collection: "directus_files", action: "create" },
    { collection: "directus_files", action: "read" },
    { collection: "directus_files", action: "update" },
  ];
  const hasKey = (p: { collection: string; action: string }) =>
    existingPerms.some((e) => e.collection === p.collection && e.action === p.action);
  const toCreate = needed.filter((p) => !hasKey(p));
  if (toCreate.length === 0) return;

  await directusRequest("/permissions", {
    method: "POST",
    body: JSON.stringify({
      data: toCreate.map(({ collection, action }) => ({
        collection,
        action,
        policy: policyId,
        permissions: {},
        validation: {},
        presets: {},
        fields: [],
      })),
    }),
  });
}

const PUBLIC_ROLE_NAME = "Public";
const PUBLIC_POLICY_NAME = "Public read";

async function ensurePublicRole() {
  const rolesRes = await directusRequest("/roles?filter[name][_eq]=" + encodeURIComponent(PUBLIC_ROLE_NAME));
  const existingRole = rolesRes.data?.[0];
  let roleId: string;

  if (existingRole?.id) {
    roleId = existingRole.id;
  } else {
    const createRoleRes = await directusRequest("/roles", {
      method: "POST",
      body: JSON.stringify({
        name: PUBLIC_ROLE_NAME,
        description: "Read-only access for public site (blog posts, authors, tags).",
        icon: "public",
      }),
    });
    roleId = createRoleRes.data?.id;
    if (!roleId) throw new Error("Failed to create Public role.");
  }

  const policiesRes = await directusRequest("/policies?filter[name][_eq]=" + encodeURIComponent(PUBLIC_POLICY_NAME));
  const existingPolicy = policiesRes.data?.[0];
  let policyId: string;

  if (existingPolicy?.id) {
    policyId = existingPolicy.id;
    await directusRequest(`/policies/${policyId}`, {
      method: "PATCH",
      body: JSON.stringify({ roles: [roleId] }),
    });
  } else {
    const createPolicyRes = await directusRequest("/policies", {
      method: "POST",
      body: JSON.stringify({
        name: PUBLIC_POLICY_NAME,
        description: "Read-only access to blog content for DIRECTUS_PUBLIC_TOKEN.",
        icon: "visibility",
        app_access: false,
        admin_access: false,
        roles: [roleId],
      }),
    });
    policyId = createPolicyRes.data?.id;
    if (!policyId) throw new Error("Failed to create Public policy.");
  }

  const permissionsRes = await directusRequest("/permissions?filter[policy][_eq]=" + policyId);
  const existingPerms = (permissionsRes.data ?? []) as { collection: string; action: string }[];
  const needed = [
    { collection: "posts", action: "read" },
    { collection: "authors", action: "read" },
    { collection: "tags", action: "read" },
    { collection: "posts_tags", action: "read" },
    { collection: "directus_files", action: "read" },
  ];
  const hasKey = (p: { collection: string; action: string }) =>
    existingPerms.some((e) => e.collection === p.collection && e.action === p.action);
  const toCreate = needed.filter((p) => !hasKey(p));
  if (toCreate.length === 0) return;

  await directusRequest("/permissions", {
    method: "POST",
    body: JSON.stringify({
      data: toCreate.map(({ collection, action }) => ({
        collection,
        action,
        policy: policyId,
        permissions: {},
        validation: {},
        presets: {},
        fields: [],
      })),
    }),
  });
  console.log("Public role configured. Create a user with role 'Public', generate a static token, set DIRECTUS_PUBLIC_TOKEN in .env");
}

async function uploadFileFromUrl(url: string, title: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download image: ${url}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  const blob = new Blob([arrayBuffer], { type: response.headers.get("content-type") ?? "image/jpeg" });
  const form = new FormData();
  form.append("file", blob, `${title}.jpg`);
  form.append("title", title);

  const res = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${directusAdminToken}`,
    },
    body: form,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to upload image: ${text}`);
  }
  const data = await res.json();
  return data.data?.id as string;
}

async function getOrCreateByField(collection: string, field: string, value: string, payload: Record<string, any>) {
  if (!directusClient) {
    throw new Error("Directus client not initialized.");
  }
  const items = (await directusClient.request(
    readItems(collection as never, { filter: { [field]: { _eq: value } }, limit: 1 }) as unknown
  )) as Record<string, unknown>[];
  if (items.length) return items[0];
  return directusClient.request(
    createItem(collection as never, payload as never) as unknown
  ) as Promise<Record<string, unknown>>;
}

async function seed() {
  // Prefer login with email/password when set (avoids invalid or expired DIRECTUS_ADMIN_TOKEN)
  if (DIRECTUS_ADMIN_EMAIL && DIRECTUS_ADMIN_PASSWORD) {
    try {
      const token = await loginWithEmail();
      if (token) directusAdminToken = token;
    } catch (_) {
      // keep existing token if login fails
    }
  }
  if (!directusAdminToken) {
    directusAdminToken = (await loginWithEmail()) ?? undefined;
  }
  if (!directusAdminToken) {
    console.error("Missing or invalid credentials. Set DIRECTUS_ADMIN_EMAIL and DIRECTUS_ADMIN_PASSWORD in .env, or a valid DIRECTUS_ADMIN_TOKEN.");
    process.exit(1);
  }

  directusClient = createDirectus(DIRECTUS_URL)
    .with(staticToken(directusAdminToken))
    .with(rest()) as DirectusRestClient;

  // If token is invalid (401), try login with email/password and retry
  try {
    await ensureSchema();
  } catch (err: unknown) {
    const msg = String(err);
    if (msg.includes("401") || msg.includes("INVALID_CREDENTIALS")) {
      if (DIRECTUS_ADMIN_EMAIL && DIRECTUS_ADMIN_PASSWORD) {
        const token = await loginWithEmail();
        directusAdminToken = token ?? undefined;
        if (directusAdminToken) {
          directusClient = createDirectus(DIRECTUS_URL)
            .with(staticToken(directusAdminToken))
            .with(rest()) as DirectusRestClient;
          await ensureSchema();
        } else {
          throw err;
        }
      } else {
        throw err;
      }
    } else {
      throw err;
    }
  }

  try {
    await ensureEditorRole();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("403") || msg.includes("FORBIDDEN") || msg.includes("permission")) {
      console.warn(
        "Skipping Editor role creation: token lacks permission to manage roles/policies. Create the Editor role manually in Directus (Settings → User Roles / Access Policies)."
      );
    } else {
      throw err;
    }
  }

  try {
    await ensurePublicRole();
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    if (msg.includes("403") || msg.includes("FORBIDDEN") || msg.includes("permission")) {
      console.warn(
        "Skipping Public role: token lacks permission. In Directus, give the Public role read access to posts, authors, tags, posts_tags, directus_files and set DIRECTUS_PUBLIC_TOKEN to a token for that role."
      );
    } else {
      throw err;
    }
  }

  const authors = await Promise.all([
    getOrCreateByField("authors", "name", "Ava Lin", {
      name: "Ava Lin",
      bio: "Design director exploring systems, calm interfaces, and editorial clarity.",
    }),
    getOrCreateByField("authors", "name", "Noah Reed", {
      name: "Noah Reed",
      bio: "Product writer and researcher documenting studio practice and release notes.",
    }),
  ]);

  const tagNames = [
    "Editorial Systems",
    "Design Strategy",
    "Product Notes",
    "Studio Culture",
    "Typography",
    "Research",
    "Interface Craft",
  ];

  const tags = await Promise.all(
    tagNames.map((name) =>
      getOrCreateByField("tags", "slug", name.toLowerCase().replace(/\s+/g, "-"), {
        name,
        slug: name.toLowerCase().replace(/\s+/g, "-"),
      })
    )
  );

  const coverImages = await Promise.all([
    uploadFileFromUrl(
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1600&q=80",
      "Calm Interfaces"
    ),
    uploadFileFromUrl(
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1600&q=80",
      "Editorial System"
    ),
    uploadFileFromUrl(
      "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?auto=format&fit=crop&w=1600&q=80",
      "Workshop Notes"
    ),
    uploadFileFromUrl(
      "https://images.unsplash.com/photo-1517816743773-6e0fd518b4a6?auto=format&fit=crop&w=1600&q=80",
      "Typography Strategy"
    ),
  ]);

  const now = new Date().toISOString();

  const posts = [
    {
      title: "Designing for Calm Interfaces",
      slug: "designing-for-calm-interfaces",
      excerpt:
        "A field guide for building product surfaces that breathe—calm, legible, and intentional.",
      cover_image: coverImages[0],
      author: authors[0].id,
      tags: [{ tags_id: tags[1].id }, { tags_id: tags[6].id }],
      published_at: now,
      status: "published",
      content: `
        <h2>Why calm matters</h2>
        <p>Teams build velocity when the interface removes noise. Calm UI isn’t bland—it's intentional clarity that lets the product speak.</p>
        <ul>
          <li>Reduce simultaneous actions</li>
          <li>Favor soft contrast and rhythm</li>
          <li>Let hierarchy do the explaining</li>
        </ul>
        <h3>Design signals we rely on</h3>
        <table>
          <thead>
            <tr><th>Signal</th><th>Outcome</th></tr>
          </thead>
          <tbody>
            <tr><td>Whitespace</td><td>Improved comprehension</td></tr>
            <tr><td>Muted palettes</td><td>Less cognitive fatigue</td></tr>
            <tr><td>Consistent spacing</td><td>Faster scanning</td></tr>
          </tbody>
        </table>
        <p>When calm becomes a system, velocity follows.</p>
      `,
    },
    {
      title: "The Editorial System Behind Lumen",
      slug: "the-editorial-system-behind-lumen",
      excerpt:
        "How we structure voice, pacing, and narrative so every post feels cohesive and unmistakably ours.",
      cover_image: coverImages[1],
      author: authors[1].id,
      tags: [{ tags_id: tags[0].id }, { tags_id: tags[3].id }],
      published_at: now,
      status: "published",
      content: `
        <h2>Editorial foundations</h2>
        <p>We treat writing as a design system: consistent tokens, reusable components, and deliberate cadence.</p>
        <h3>Editorial tokens</h3>
        <table>
          <thead>
            <tr><th>Token</th><th>Intent</th></tr>
          </thead>
          <tbody>
            <tr><td>Lead sentence</td><td>Clarify the promise</td></tr>
            <tr><td>Section rhythm</td><td>Keep momentum</td></tr>
            <tr><td>Close</td><td>Offer a next step</td></tr>
          </tbody>
        </table>
        <p>The result is a consistent voice that scales with the team.</p>
      `,
    },
    {
      title: "From Workshop to Release Notes",
      slug: "from-workshop-to-release-notes",
      excerpt:
        "A behind-the-scenes look at how we turn workshop artifacts into clear product updates.",
      cover_image: coverImages[2],
      author: authors[1].id,
      tags: [{ tags_id: tags[2].id }, { tags_id: tags[5].id }],
      published_at: now,
      status: "published",
      content: `
        <h2>Turning insights into outcomes</h2>
        <p>We move from raw notes to a shared narrative in three steps: align, distill, publish.</p>
        <table>
          <thead>
            <tr><th>Stage</th><th>Artifact</th></tr>
          </thead>
          <tbody>
            <tr><td>Align</td><td>Workshop summary</td></tr>
            <tr><td>Distill</td><td>Release draft</td></tr>
            <tr><td>Publish</td><td>Final notes</td></tr>
          </tbody>
        </table>
        <p>Each release note becomes a small piece of editorial memory.</p>
      `,
    },
    {
      title: "Typography as Product Strategy",
      slug: "typography-as-product-strategy",
      excerpt:
        "A typographic system shapes perception—this is how we choose voices for modern products.",
      cover_image: coverImages[3],
      author: authors[0].id,
      tags: [{ tags_id: tags[4].id }, { tags_id: tags[6].id }],
      published_at: now,
      status: "published",
      content: `
        <h2>Type as signal</h2>
        <p>Typography guides attention and trust. We choose typefaces like we choose product language.</p>
        <table>
          <thead>
            <tr><th>Decision</th><th>Effect</th></tr>
          </thead>
          <tbody>
            <tr><td>Serif headlines</td><td>Editorial depth</td></tr>
            <tr><td>Sans body</td><td>Modern clarity</td></tr>
            <tr><td>Consistent weights</td><td>Predictable rhythm</td></tr>
          </tbody>
        </table>
        <p>Type is the quiet scaffolding of product trust.</p>
      `,
    },
  ];

  for (const post of posts) {
    if (!directusClient) {
      throw new Error("Directus client not initialized.");
    }
    const existing = (await directusClient.request(
      readItems("posts" as never, { filter: { slug: { _eq: post.slug } }, limit: 1 }) as unknown
    )) as Record<string, unknown>[];
    if (existing.length) continue;

    const { tags: tagLinks, ...postPayload } = post;
    const created = (await directusClient.request(
      createItem("posts" as never, postPayload as never) as unknown
    )) as { id: string };
    const postId = (created as { id: string }).id;
    if (postId && Array.isArray(tagLinks) && tagLinks.length > 0) {
      for (const link of tagLinks) {
        const tagsId = link?.tags_id ?? link;
        if (tagsId) {
          await directusClient.request(
            createItem("posts_tags" as never, {
              posts_id: postId,
              tags_id: typeof tagsId === "object" ? (tagsId as { id: string }).id : tagsId,
            } as never) as unknown
          );
        }
      }
    }
  }
}

seed()
  .then(() => {
    console.log("Directus seed complete.");
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
