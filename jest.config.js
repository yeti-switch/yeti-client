module.exports = {
  'moduleFileExtensions': [
    'js',
    'json',
    'vue'
  ],
  'transform': {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
  }
}
