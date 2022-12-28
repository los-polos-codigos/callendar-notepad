module.exports = {
  env: {
    'react-native/react-native': true,
  },
  extends: ['plugin:react/recommended', 'airbnb'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', 'react-native'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'linebreak-style': 0,
    'react/function-component-definition': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-one-expression-per-line': 0,
    'object-curly-newline': 0,
    'comma-dangle': 0,
    'consistent-return': 0,
    'react/forbid-prop-types': 0,
    'no-return-assign': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
        moduleDirectory: ['node_modules', 'src', 'src/utils'],
      },
    },
  },
};
