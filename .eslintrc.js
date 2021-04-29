module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'prettier'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1,
          allowFirstLine: false,
        },
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'max-len': [
      'error',
      {
        code: 80,
        tabWidth: 2,
        comments: 80,
        ignoreUrls: true,
      },
    ],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
