const config = require.resolve('@vue/cli-service/webpack.config.js');

console.log('config:', config);

module.exports = {
  "env": {
    "browser": true,
    "es6": true,
    "node": true
  },
  "parserOptions": {
    "parser": "babel-eslint"
  },
  "extends": ["airbnb-base", "plugin:vue/recommended"],
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".vue"],
      },
      alias: {
        map: [
          ['@', './src'],
        ],
        extensions: ['.vue', '.js', '.json']
      }
    }
  },
  "rules": {
    "implicit-arrow-linebreak": "off",
    "import/prefer-default-export": "off",
    "no-param-reassign": ["error", { "props": false }],
    "no-underscore-dangle": ["error", { "allow": ["_cellVariants"] }]
  },
  "globals": {
    "YETI_CONFIG": "readonly"
  }
}
