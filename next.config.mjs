/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,

  output: "standalone",

  poweredByHeader: false,

  compress: false,

  devIndicators: {
    buildActivity: true,
    buildActivityPosition: "bottom-right",
  },

  experimental: {
    adjustFontFallbacks: true,
  },
};
export default config;
