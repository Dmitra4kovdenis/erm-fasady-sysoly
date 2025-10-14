import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: ["./src/**/*.scss"],
  },
  experimental: {
    serverComponentsExternalPackages: ["pdfkit", "maxrects-packer"],
  },
  api: {
    responseLimit: false,
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default nextConfig;
