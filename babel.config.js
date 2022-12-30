module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            components: './src/components',
            utils: './src/utils',
            icons: './src/utils/icons',
            theme: './src/theme',
            api: './src/api',
            layouts: './src/layouts',
            core: './src/core',
            views: './src/views',
            hooks: './src/hooks',
          },
        },
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
        },
      ],
    ],
  };
};
