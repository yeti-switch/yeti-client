module.exports = (api) => {
  api.cache(false);
  return {
    plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-runtime', 'transform-vue-jsx'],
    presets: ['@babel/preset-env'],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-runtime'],
      },
    },
  };
};
