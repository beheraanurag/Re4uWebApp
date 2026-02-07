/**
 * PM2 ecosystem config for Re4u Next.js app.
 * Use: pm2 start ecosystem.config.cjs
 * Restart with memory limit to avoid runaway CPU/memory on the server.
 */
module.exports = {
  apps: [
    {
      name: "re4u-web",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      cwd: "./",
      instances: 1,
      exec_mode: "fork",
      max_memory_restart: "800M",
      env: { NODE_ENV: "production" },
      merge_logs: true,
    },
  ],
};
