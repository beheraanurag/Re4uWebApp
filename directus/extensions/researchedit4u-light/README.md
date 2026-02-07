# ResearchEdit4U Light Theme

Directus Data Studio theme matching the ResearchEdit4U design system: logo navy `#0b3c71`, ink `#111827`, CTA blue `#1d4ed8`, and supporting tokens from the main site.

## Build

```bash
npm install
npm run build
```

Output is `dist/index.js`. Directus loads extensions from the `directus/extensions` folder (mounted in Docker).

## Usage

1. Ensure `docker-compose.yml` mounts `./directus/extensions:/directus/extensions`.
2. Restart Directus: `docker compose restart directus`.
3. In Directus: **Settings → Theming** (or user-level appearance), select **ResearchEdit4U Light**.

## Design tokens (from plan)

| Role        | Value     |
|------------|-----------|
| Primary    | `#0b3c71` |
| Foreground | `#111827` |
| CTA/Accent | `#1d4ed8` |
| Muted      | `#6b7280` |
| Background | `#f9fafb` / `#f2f7fa` |
| Border     | `#dde6ec` |
| Success    | `#166534` |
| Radius     | `10px`    |
