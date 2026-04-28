import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  cacheComponents: true,
  serverExternalPackages: ['zod'],
  turbopack: {
    root: path.resolve(__dirname),
  },
  experimental: {
    taint: true,
  },
};

export default nextConfig;
