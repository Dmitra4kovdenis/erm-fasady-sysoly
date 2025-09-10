import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: ["./src/**/*.scss"],
  },
};

export default nextConfig;
