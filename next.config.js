/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      canvas: false,
      encoding: false,
    };
    return config;
  },
  images: {
    domains: [
      "oaidalleapiprodscus.blob.core.windows.net",
      "lh3.googleusercontent.com",
    ],
  },
};

module.exports = nextConfig;
