module.exports = {
  configureWebpack: (config) => {
    // console.log('config', config);

    config.devtool = 'cheap-module-source-map';
  },
  publicPath: './',
};
