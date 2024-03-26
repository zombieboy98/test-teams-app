/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add the node_modules directory to webpack's module resolution
    config.resolve.alias['cldr$'] = path.resolve(
      __dirname,
      'node_modules',
      'cldrjs'
    );
    config.resolve.alias['cldr/event$'] = path.resolve(
      __dirname,
      'node_modules',
      'cldrjs'
    );
    config.resolve.alias['cldr/supplemental$'] = path.resolve(
      __dirname,
      'node_modules',
      'cldrjs'
    );

    return config;
  },
};

export default nextConfig;
