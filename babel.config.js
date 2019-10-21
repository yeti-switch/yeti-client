module.exports = api => {
  api.cache(false)
  return {
    plugins: ['@babel/plugin-proposal-class-properties']
  }
}