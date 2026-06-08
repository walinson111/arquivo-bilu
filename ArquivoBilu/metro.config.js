const { getDefaultConfig } = require("expo/metro-config");
const path = require("path");

const config = getDefaultConfig(__dirname);

// 1. Garante que o Metro saiba ler os arquivos de imagem
config.resolver.assetExts.push("jpg", "jpeg", "png", "asset");

// 2. FORÇA INSTÂNCIA ÚNICA: Resolve o Three.js estritamente para a raiz do projeto
config.resolver.resolverMainFields = ['sbmodern', 'browser', 'main'];

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  'three': path.resolve(__dirname, 'node_modules/three'),
};

// Evita que pacotes dentro de node_modules usem suas próprias versões internas do Three
config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;