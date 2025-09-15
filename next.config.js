// next.config.js
module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.watchOptions = {
        ignored: [
          '**/node_modules',
          '**/.git',
        ],
      };
    }
    return config;
  },
};
  