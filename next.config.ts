import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure Prisma's engine-less client files (incl. query_compiler_bg.wasm)
  // are bundled into Vercel's serverless functions.
  outputFileTracingIncludes: {
    "/*": ["./node_modules/.prisma/client/**/*"],
    "/**/*": ["./node_modules/.prisma/client/**/*"],
  },
};

export default nextConfig;
