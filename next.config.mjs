/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(pdf)$/,
      type: "asset/resource",
    });
    return config;
  },
};

export default nextConfig;
