module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/prop-types': 'off',
    'react/jsx-props-no-spreading': 'off',
    'no-unused-vars': 'off',
    'import/newline-after-import': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    'no-autofocus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'no-nested-ternary': 'off',
    'max-len': 'off',
    'react/button-has-type': 'off',
    'react/jsx-tag-spacing': 'off',
    'no-plusplus': 'off',
    'no-continue': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'import/no-named-as-default': 'off',
  },
};