import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "200mb",
    },
    middlewareClientMaxBodySize: 200 * 1024 * 1024, // 200 MB
  },
};

export default nextConfig;
