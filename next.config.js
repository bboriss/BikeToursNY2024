const { i18n } = require('./next-i18next.config.js');
const path = require('path');

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  i18n,
};

module.exports = nextConfig;


const withVideos = require('next-videos')

module.exports = withVideos()