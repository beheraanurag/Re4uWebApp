# Docker setup (Re4u server)

The server stack runs **PostgreSQL**, **Directus**, and **Caddy** (reverse proxy) in Docker with pinned images, named volumes, and env-based configuration.

## Prerequisites

- Docker and Docker Compose (v2+)
- `.env` with required variables (see below)

## Quick start

1. **Copy env and set required values:**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set at least:

   - `DB_PASSWORD` – PostgreSQL password (e.g. strong random string)
   - `DIRECTUS_ADMIN_EMAIL` – admin login email
   - `DIRECTUS_ADMIN_PASSWORD` – admin login password
   - `DIRECTUS_URL` – public URL for Directus: **`http://localhost/directus`** when using the proxy (default), or `http://localhost:8055` if you skip the proxy
   - `DIRECTUS_SECRET` – random secret for Directus (e.g. `openssl rand -hex 32`)

2. **Start the stack:**

   ```bash
   docker compose up -d
   ```

3. **Check status:**

   ```bash
   docker compose ps
   ```

4. **Access via reverse proxy (default):**

   - **Next.js app**: **http://localhost** (run `npm run dev` on the host; proxy forwards to port 3000)
   - **Directus**: **http://localhost/directus/**
   - Direct access to Directus: **http://localhost:8055** (optional, if `DIRECTUS_PORT` is set)

## What this setup does

| Area | Approach |
|------|----------|
| **Images** | Pinned versions: `postgres:16-alpine`, `directus/directus:11` (no `latest`) |
| **Secrets** | All from `.env`; no hardcoded passwords or keys |
| **Persistence** | Named volumes for DB and uploads; extensions stay as bind mount for local dev |
| **Startup** | Directus waits for DB healthcheck; optional Directus healthcheck for orchestration |
| **Restart** | `restart: unless-stopped` so containers come back after reboot |
| **Network** | Single bridge network `re4u_network` for service isolation |
| **Reverse proxy** | Caddy on port 80: `/` → Next.js (host:3000), `/directus/*` → Directus |

## Reverse proxy (Caddy)

Caddy fronts the stack on port **80** (and **443**):

- **`/`** → Next.js app at `host.docker.internal:3000` (run `npm run dev` on your machine).
- **`/directus`**, **`/directus/*`** → Directus (path prefix stripped).

Set **`DIRECTUS_URL=http://localhost/directus`** (or `http://PROXY_HOST/directus`) in `.env` so Directus and the Next.js app use the correct base URL. Optional env vars:

- `PROXY_HOST` (default: `localhost`) – hostname Caddy listens for
- `PROXY_HTTP_PORT` (default: `80`), `PROXY_HTTPS_PORT` (default: `443`) – proxy ports

On Linux, `host.docker.internal` is added via `extra_hosts: host-gateway` so Caddy can reach the host.

## Optional env vars (with defaults)

In `.env` you can override:

- `DB_USER` (default: `directus`)
- `DB_NAME` (default: `directus`)
- `DB_PORT` (default: `5432`)
- `DIRECTUS_PORT` (default: `8055`)
- `PROXY_HOST` (default: `localhost`), `PROXY_HTTP_PORT` (default: `80`), `PROXY_HTTPS_PORT` (default: `443`)

## Volumes

- **`re4u_directus_db_data`** – PostgreSQL data (survives `docker compose down`)
- **`re4u_directus_uploads`** – Directus file uploads
- **`./directus/extensions`** – Bind mount so you can edit extensions without rebuilding

To list volumes:

```bash
docker volume ls | grep re4u
```

To remove everything (including data):

```bash
docker compose down -v
```

## Useful commands

```bash
# Logs
docker compose logs -f proxy
docker compose logs -f directus
docker compose logs -f db

# Restart one service
docker compose restart directus

# Stop
docker compose down

# Rebuild after changing compose/env
docker compose up -d
```

## Troubleshooting

- **“Set DB_PASSWORD in .env”** – Ensure `.env` exists and contains `DB_PASSWORD=...` and `DIRECTUS_SECRET=...`.
- **Directus won’t start** – Check `docker compose logs directus`; often DB not ready yet (healthcheck will retry).
- **Port in use** – Change `DB_PORT`, `DIRECTUS_PORT`, or `PROXY_HTTP_PORT` in `.env` and run `docker compose up -d` again.
- **502 / connection refused to Next.js** – Ensure `npm run dev` is running on the host (port 3000). Caddy proxies `/` to `host.docker.internal:3000`.
