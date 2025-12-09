module.exports = function(api) {
  api.cache(false);

  const isProduction = process.env.NODE_ENV === 'production';

  const plugins = [
    'react-native-reanimated/plugin',
    ["module:react-native-dotenv", {
      moduleName: "@env",
      path: ".env",
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true
    }]
  ];

  // 프로덕션 환경에서만 console.log 제거
  if (isProduction) {
    plugins.push(['transform-remove-console', { exclude: ['error', 'warn'] }]);
  }

  return {
    presets: ['babel-preset-expo'],
    plugins,
  };
};
