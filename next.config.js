const { i18n } = require('./next-i18next.config.js');
const path = require('path');
// You can remove the following 2 lines when integrating our example.
const { loadCustomBuildParams } = require('./next-utils.config')
const { esmExternals = false, tsconfigPath } =
  loadCustomBuildParams()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals, // https://nextjs.org/blog/next-11-1#es-modules-support
  },
  i18n,
  reactStrictMode: true,
  typescript: {
    tsconfigPath,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
}

// module.exports = nextConfig;

const withVideos = require('next-videos')

module.exports = withVideos(nextConfig)

