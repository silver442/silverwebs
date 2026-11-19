import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // AGENTS.md vive fuera del proyecto (carpeta superior); evita que `next dev` lo regenere aquí.
  agentRules: false,
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    agentUpgrade: "security",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
