const { i18n } = require('./next-i18next.config.js');
const path = require('path');
const { loadCustomBuildParams } = require('./next-utils.config')
const { esmExternals = false, tsconfigPath } =
  loadCustomBuildParams()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals,
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

