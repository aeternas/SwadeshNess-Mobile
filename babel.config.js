module.exports = function(api) {
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'transform-inline-environment-variables',
      {
        include: ['BASE_URL', 'PROD_BASE_URL', 'CUSTOM_PUSH_BRANCH'],
      },
    ],
  ];
  api.cache(true);
  return {
    presets,
    plugins,
  };
};
