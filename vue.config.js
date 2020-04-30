module.exports = {
  configureWebpack: (config) => {
    config.devtool = 'cheap-module-source-map';
  },
  publicPath: './',
};
