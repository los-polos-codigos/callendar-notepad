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
          },
        },
      ],
    ],
  };
};
