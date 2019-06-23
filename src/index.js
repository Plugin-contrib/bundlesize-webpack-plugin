/**
 * TODOs
 *
 *  1. To implement the current in watchRun hook
 *  2. To recommend some optimizations when size exceeding
 *  3. To implement the logo and make the looks better
 *  4. To suggest optmizations
 *    - read the config and check whether the splitchunk is implemented or not
 *    - Minify plugin
 *    - Codespliting suggestion
 *  5. Typescript Migration
 */




const logo = `
          _______________
         /              /
        /______________/|
        |             | |
        |             | |
        |             | /
        |_____________|/
`


var fs = require("fs");
const {
    info,
    warn,
    error
} = require('prettycli');

// Community Standard Method - https://stackoverflow.com/a/18650828/9339537
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return {
        bundleSize: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)),
        fullSizeInfo: parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
    }
}

module.exports = class WebpackPluginTesting {

    constructor(pluginOptions) {
        this.pluginOptions = pluginOptions || {
            sizeLimit: 10
        }
    }
    apply(compiler) {
        compiler.hooks.watchRun.tap("BundleSizePlugin", (compilation) => {
            // TODO
        })
        compiler.hooks.done.tap("BundleSizePlugin", (stats) => {
            const {
                path,
                filename
            } = stats.compilation.options.output;
            const bundlePath = require("path").resolve(path, filename)
            const {
                size
            } = fs.statSync(bundlePath)
            const {
                bundleSize,
                fullSizeInfo
            } = formatBytes(size)
            this.messageLoggin(bundleSize, fullSizeInfo)
        })
    }
    messageLoggin(bundleSize, fullSizeInfo) {
        const {
            sizeLimit
        } = this.pluginOptions
        if (bundleSize < sizeLimit) {
            info("Safe:Bundle-Size", fullSizeInfo)
        } else {
            if (bundleSize == sizeLimit) {
                warn("Safe:Bundle-Size", fullSizeInfo)
            } else {
                error(fullSizeInfo, {
                    label: "Unsafe:Bundle-Size",
                    exit: false
                })
            }
        }
    }
}