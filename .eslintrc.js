module.exports = {
  root: true,
  extends: ['eslint:recommended', 'plugin:react/recommended', 'prettier'],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: 'detect' } },
  env: { es2021: true, jest: true },
  rules: { 'react/react-in-jsx-scope': 'off' }
};
