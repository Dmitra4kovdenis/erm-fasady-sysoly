import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    additionalData: '@import "styles/tokens.scss";',
  },
};

export default nextConfig;
