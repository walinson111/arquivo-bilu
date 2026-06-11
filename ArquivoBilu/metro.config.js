const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

config.resolver.assetExts.push("jpg", "jpeg", "png", "asset");

config.watchFolders = [
  path.resolve(__dirname, "assets"),
];

config.resolver.resolverMainFields = ['sbmodern', 'browser', 'main'];

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'three': path.resolve(__dirname, 'node_modules/three'),
};

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;