import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '100MB'
    }
  },
  reactStrictMode: true,
};

export default nextConfig;
