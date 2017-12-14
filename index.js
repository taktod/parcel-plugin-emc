module.exports = (bundler) => {
  bundler.addAssetType('emc', require.resolve("./EmcAsset"));
  bundler.addPackager('emc', require.resolve("./EmcPackager"));
};
