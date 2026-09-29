const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Soporte para archivos WebAssembly de expo-sqlite
config.resolver.assetExts.push('wasm');

// Headers necesarios para SharedArrayBuffer / expo-sqlite en Web
config.server.enhanceMiddleware = (middleware) => {
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');

    return middleware(req, res, next);
  };
};

module.exports = config;