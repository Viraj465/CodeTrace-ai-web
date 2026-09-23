import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // `next dev` blocks its HMR/dev resources for any origin other than
  // localhost. Opening the dev site via the LAN address (e.g. from a phone)
  // needs that host listed here.
  allowedDevOrigins: ["192.168.0.100"],
};

export default nextConfig;
