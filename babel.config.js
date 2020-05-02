module.exports = (api) => {
  api.cache(false);
  return {
    plugins: ['@babel/plugin-proposal-class-properties'],
    presets: ['@babel/preset-env'],
    env: {
      test: {
        plugins: ['@babel/plugin-transform-runtime'],
      },
    },
  };
};
