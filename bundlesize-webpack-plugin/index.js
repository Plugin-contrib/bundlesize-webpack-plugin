/**
 * This is a demo project for an acticle I am writing on aligator.io
 * Will soon add the link of that here once its published.
 * This is just for demo purpose and learning purpose
 * --- Author
 * --- Aniketh Saha
 * --- https://twitter.com/anik220798
 */

const fs = require("fs");
const { resolve } = require("path");
// Community Standard Method - https://stackoverflow.com/a/18650828/9339537
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return {
    bundleSize: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
    fullSizeInfo:
      parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  };
}
module.exports = class BundlesizeWebpackPlugin {
  constructor(options) {
    this.options = options || {
      sizeLimit: 10
    };
  }
  apply(compiler) {
    compiler.hooks.done.tap("BundleSizePlugin", stats => {
      const { path, filename } = stats.compilation.options.output;
      const bundlePath = resolve(path, filename);
      const { size } = fs.statSync(bundlePath);
      const { bundleSize, fullSizeInfo } = formatBytes(size);
      const { sizeLimit } = this.options;
      if (bundleSize < sizeLimit) {
        console.log(
          "Safe:Bundle-Size",
          fullSizeInfo,
          "\n SIZE LIMIT:",
          sizeLimit
        );
      } else {
        if (bundleSize === sizeLimit) {
          console.warn(
            "Warn:Bundle-Size",
            fullSizeInfo,
            "\n SIZE LIMIT:",
            sizeLimit
          );
        } else {
          console.error(
            "Unsafe:Bundle-Size",
            fullSizeInfo,
            "\n SIZE LIMIT:",
            sizeLimit
          );
        }
      }
    });
  }
};
