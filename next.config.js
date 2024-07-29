const nextI18NextConfig = require('./next-i18next.config.js');
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  ...nextI18NextConfig,
};

module.exports = nextConfig;
