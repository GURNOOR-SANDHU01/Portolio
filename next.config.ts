import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A lockfile in the home directory otherwise makes Next guess the wrong workspace root.
  turbopack: { root: __dirname },
};

export default nextConfig;
