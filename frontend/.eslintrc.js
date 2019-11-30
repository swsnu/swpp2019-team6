module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb', 'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/prefer-stateless-function": 0,
    "react/jsx-filename-extension": 0,
    "react/jsx-one-expression-per-line": 0,
    "react/destructuring-assignment": 0,
    "react/prop-types": 0,
    "react/state-in-constructor": 0,
    "react/jsx-props-no-spreading": 0,
    "arrow-body-style": 0,
    "object-shorthand": 0,
    "import/prefer-default-export": 0,
    "camelcase":0,
    "no-underscore-dangle":0,
    "no-unused-vars":0,
    "no-plusplus": ["error", { "allowForLoopAfterthoughts": true }],
    "no-param-reassign":0,
    "linebreak-style":0,
    "react/no-array-index-key":0,
  },
};
