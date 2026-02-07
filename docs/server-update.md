# Server setup and updates

How to deploy and update the app on a server (first time and when code changes).

## First-time setup on the server

1. **Clone the repo** (use your public repo URL):

   ```bash
   git clone https://github.com/YOUR_ORG_OR_USER/Re4uWebApp.git
   cd Re4uWebApp
   ```

2. **Create and fill `.env`**:

   ```bash
   cp .env.example .env
   # Edit .env: set DB_PASSWORD, DIRECTUS_SECRET, DIRECTUS_ADMIN_EMAIL,
   # DIRECTUS_ADMIN_PASSWORD, DIRECTUS_URL (e.g. https://yourdomain.com/directus),
   # DIRECTUS_PUBLIC_TOKEN (after creating it in Directus)
   ```

3. **Start the backend** (PostgreSQL + Directus + Caddy):

   ```bash
   docker compose up -d
   ```

4. **Install Node deps and build the Next.js app**:

   ```bash
   npm ci
   npm run build
   ```

5. **Run the Next.js app** (choose one):

   - **Process manager (recommended)** – e.g. with PM2:

     ```bash
     npm install -g pm2
     pm2 start npm --name "re4u-web" -- start
     pm2 save && pm2 startup
     ```

   - **Plain Node** (for testing):

     ```bash
   npm run start
   ```

6. **Point Caddy at the app**  
   The Caddyfile proxies `/` to `host.docker.internal:3000`. On the server, Next.js runs on the host, so Caddy will forward to it. Ensure the app is listening on port **3000** (Next.js default for `npm run start`).

7. **Optional: use your domain**  
   Set `PROXY_HOST=yourdomain.com` in `.env` and, if needed, adjust the Caddyfile to listen for that host. Put your reverse proxy (or Caddy) in front of HTTPS (e.g. Caddy auto-HTTPS or another proxy).

---

## Updating the server when code changes

After you push new code to the public repo, on the server:

### 1. Pull latest code

```bash
cd /path/to/Re4uWebApp
git pull origin main   # or your default branch name, e.g. initial
```

### 2. Update backend (only if Docker or env changed)

If you changed `docker-compose.yml`, `.env`, or Directus extensions:

```bash
docker compose up -d --build
# If you added new env vars, edit .env first
```

If only the Next.js app code changed, you can skip this step.

### 3. Rebuild and restart the Next.js app

```bash
npm ci          # clean install (or npm install)
npm run build
pm2 restart re4u-web   # if using PM2
# or stop and run: npm run start
```

### One-liner (typical update)

```bash
cd /path/to/Re4uWebApp && git pull origin main && npm ci && npm run build && pm2 restart re4u-web
```

Add `docker compose up -d` in the middle if you changed Docker or env.

---

## Checklist

| Step              | When                         |
|-------------------|------------------------------|
| `git pull`        | Every update                 |
| `docker compose up -d` | When compose/env/Directus changes |
| `npm ci && npm run build` | Every update (app code)      |
| `pm2 restart re4u-web` | After rebuilding the app     |

## Optional: deploy script

Create `scripts/update-server.sh` on the server (or run these commands):

```bash
#!/bin/bash
set -e
cd /path/to/Re4uWebApp
git pull origin main
docker compose up -d
npm ci
npm run build
pm2 restart re4u-web
echo "Update complete."
```

Run with `bash scripts/update-server.sh` after editing the `cd` path.
