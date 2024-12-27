/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8055',
        pathname: '/assets/**',
      }
    ],
    unoptimized: true
  },
  env: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: 'asset/resource',
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, './src')
    };

    return config;
  },
  async rewrites() {
    const directusEndpoints = [
      'admin', 'auth', 'server', 'extensions', 'users', 
      'permissions', 'fields', 'translations', 'roles', 
      'policies', 'collections', 'presets', 'settings', 
      'relations', 'dashboards', 'panels', 'flows', 
      'notifications', 'files', 'assets', 'items', 
      'folders', 'versions', 'revisions', 'comments', 
      'shares', 'access', 
      'utils/random/string',
      'utils',
      'auth/refresh',
      'roles'
    ];

    return {
      beforeFiles: [
        ...directusEndpoints.flatMap(endpoint => [
          {
            source: `/${endpoint}`,
            destination: `http://127.0.0.1:8055/${endpoint}`,
          },
          {
            source: `/${endpoint}/:path*`,
            destination: `http://127.0.0.1:8055/${endpoint}/:path*`,
          }
        ])
      ],
      afterFiles: [
        {
          source: '/assets/:path*',
          destination: 'http://127.0.0.1:8055/assets/:path*',
        },
        {
          source: '/extensions/sources/index.js',
          destination: 'http://127.0.0.1:8055/extensions/sources/index.js',
        }
      ]
    };
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: '*' },
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Expose-Headers', value: 'Content-Range, Content-Length, X-Total-Count' }
        ],
      },
    ];
  }
};

module.exports = nextConfig;