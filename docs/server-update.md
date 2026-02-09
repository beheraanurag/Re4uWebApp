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
   # Edit .env: set DB_PASSWORD, DATABASE_URL (e.g. postgresql://blog:blog@localhost:5432/blog)
   ```

3. **Start Postgres** (if using Docker):

   ```bash
   docker compose up -d
   npx prisma db push
   npm run seed:blog
   ```

4. **Install Node deps and build the Next.js app**:

   ```bash
   npm ci
   npm run build
   ```

5. **Run the Next.js app** (choose one):

   - **Process manager (recommended)** – PM2 with memory limit (see `ecosystem.config.cjs`):

     ```bash
     npm install -g pm2
     pm2 start ecosystem.config.cjs
     pm2 save && pm2 startup
     ```

   - **Plain Node** (for testing):

     ```bash
     npm run start
     ```

   **Important:** Always run **production** on the server (`npm run build` then `npm run start` or PM2). **Never run `npm run dev`** on the server—dev mode uses much more CPU and memory.

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

---

## High CPU usage

If the Next.js process uses a lot of CPU on the server:

1. **Use production only** – Run `npm run build` and `npm run start` (or PM2). Do **not** run `npm run dev` on the server.
2. **Use PM2 with the ecosystem file** – `pm2 start ecosystem.config.cjs` restarts the app if it exceeds 800MB memory and keeps a single instance.
3. **Page caching** – The app uses ISR (`revalidate = 60`) on the homepage, blog, and case studies so responses are cached for 60 seconds instead of re-rendering on every request. After pulling the latest code and rebuilding, CPU should drop under normal traffic.
4. **Restart after deploy** – Always run `pm2 restart re4u-web` after `npm run build` so the new build is used.

---

## Site not loading (http://your-server-ip/)

For **http://62.72.56.143/** (or your server IP) to show the site, **both** must be true:

1. **Caddy (proxy)** is running in Docker and listening on port **80**.
2. **Next.js** is running on the **host** on port **3000** (Caddy proxies `/` to `host.docker.internal:3000`).

**On the server, run:**

```bash
# 1. Go to project
cd /path/to/Re4uWebApp   # replace with real path, e.g. /root/Re4uWebApp

# 2. Pull latest (includes proxy in compose)
git pull origin initial

# 3. Start full stack (db + directus + proxy). Proxy will appear as re4u-proxy / re4uwebapp-proxy-1
docker compose up -d

# 4. Build and run Next.js on the host (so Caddy can proxy to it)
npm ci
npm run build
pm2 start ecosystem.config.cjs
# or: pm2 restart re4u-web   if it was already added
pm2 save
```

**Check:**

```bash
docker ps                    # should show proxy, directus, db (3 containers)
ss -tlnp | grep -E ':80|:3000'   # 80 = Caddy, 3000 = Next.js
pm2 list                     # re4u-web should be online
```

**Firewall:** If port 80 is closed, open it (e.g. `ufw allow 80 && ufw reload`).

---

## Site not running – fix (only Re4uWebApp in PM2, high ↺)

If **http://62.72.56.143/** does not load and you see only **Re4uWebApp** in `pm2 list` (with a high **↺** restart count), the site is down because:

- **Re4uWebApp** is crash-looping (old start method, no memory limit).
- **re4u-web** (from `ecosystem.config.cjs`) was removed, so there is no stable Next.js on port 3000 for Caddy to proxy to.

**On the server, run:**

```bash
cd /opt/Re4uWebApp

# 1. Remove the crash-looping app
pm2 delete Re4uWebApp

# 2. Ensure build exists (required for next start)
npm run build

# 3. Start the app with the ecosystem config (memory limit, stable)
pm2 start ecosystem.config.cjs
pm2 save
```

Then check:

```bash
pm2 list          # only re4u-web, status "online", ↺ 0 or low
curl -s -o /dev/null -w "%{http_code}" http://127.0.0.1:3000   # should be 200
```

After that, **http://62.72.56.143/** should load (Caddy on 80 → Next.js on 3000).

---

## PM2: re4u-web keeps restarting (↺ high)

If you see **two** apps (e.g. **Re4uWebApp** and **re4u-web**) or one app with a high **↺** (restart) count:

1. **Remove the old app** so only **re4u-web** (from `ecosystem.config.cjs`) runs:
   ```bash
   pm2 delete Re4uWebApp    # remove the old one (exact name from pm2 list)
   pm2 start ecosystem.config.cjs   # ensure re4u-web is running
   pm2 save
   ```
2. Use **one** way to run the app: either `pm2 start ecosystem.config.cjs` (recommended) or `pm2 start npm --name "re4u-web" -- start`, not both. Prefer the ecosystem file (memory limit, single instance).
3. If **re4u-web** still restarts a lot, check logs: `pm2 logs re4u-web` (e.g. port in use, out of memory, or build missing — run `npm run build` first).
