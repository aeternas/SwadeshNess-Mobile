module.exports = function(api) {
  const presets = ['module:metro-react-native-babel-preset'];
  const plugins = [
    [
      'transform-inline-environment-variables',
      {
        include: ['BASE_URL'],
      },
    ],
  ];
  api.cache(true);
  return {
    presets,
    plugins,
  };
};
