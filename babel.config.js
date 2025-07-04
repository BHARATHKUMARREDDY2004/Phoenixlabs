module.exports = function (api) {
  api.cache(true);
  
  // Define plugins explicitly for better clarity
  const plugins = [
    'react-native-reanimated/plugin' // Add Reanimated plugin if you're using it
  ];

  return {
    presets: [
      ['babel-preset-expo', { 
        jsxImportSource: 'nativewind'
      }], 
      'nativewind/babel'
    ],
    plugins,
  };
};
