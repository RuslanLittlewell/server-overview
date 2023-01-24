const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@core': 'src/core',
    '@features': 'src/features',
    '@pages': 'src/pages',
    '@shared': 'src/shared',
    '@icons': 'src/assets/icons',
    '@styles': 'src/assets/styles',
    '@actions': 'src/redux/actions',
    '@utils': 'src/utils',
    '@helpers': 'src/helpers',
  })(config);

  return config;
};