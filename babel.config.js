module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          extensions: [
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.android.js',
            '.android.tsx',
            '.ios.js',
            '.ios.tsx',
          ],
          root: ['./src'],
          alias: {
            '@components': './src/components',
            '@helpers': './src/helpers',
            '@navigation': './src/navigation',
            '@screens': './src/screens',
            '@utils': './src/utils',
            '@hooks': './src/hooks',
          },
        },
      ],
    ],
  };
};