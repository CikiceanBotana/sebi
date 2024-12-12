/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Remove swcMinify as it's enabled by default in newer versions
  // Remove experimental.appDir as it's now the default in Next.js 13+
  webpack: (config) => {
    // Add support for glTF/GLB files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });

    // Resolve issues with Node.js-specific modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    // Add path alias resolution
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src')
    };

    return config;
  },
};

module.exports = nextConfig;