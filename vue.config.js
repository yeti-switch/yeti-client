module.exports = {
  configureWebpack: (config) => {
    // console.log('config', config);

    config.devtool = 'cheap-module-source-map';
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: '@kazupon/vue-i18n-loader',
        },
      ],
    };
  },
  publicPath: './',
};
