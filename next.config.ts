import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: ["./src/**/*.scss"],
  },
  experimental: {
    serverComponentsExternalPackages: ["pdfkit", "maxrects-packer"],
  },
};

export default nextConfig;
