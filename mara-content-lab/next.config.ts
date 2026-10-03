import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: ".next-mara",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
