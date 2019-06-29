/**
 *      Micro Plugin Concept
 *
 *      Divide the load of a plugin (in this case webpack plugin - bundlesize)
 *      using small mini or can say "Micro" plugins
 *
 *      Not sure how this will take a shape , pretty much thinking to refine again
 *      about the implementation
 *
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

const {
    SyncHook
} = require("tapable")
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
		this.hooks = {
            onSizeExceed : new SyncHook(["callType","bundleSize","pluginOptions"]),
            onSizeSafe : new SyncHook(["callType","bundleSize","pluginOptions"]),
            onSizeWarn : new SyncHook(["callType","bundleSize","pluginOptions"]),
        };

        this.microPluginStats = {
            ...pluginOptions,
            ...this.hooks,
            bundleSize : "",

        }
        this.microPluginOptionsHandler()


    }
    microPluginOptionsHandler(){
        const {microPlugins} = this.pluginOptions

        if (typeof microPlugins === "undefined" ){
            // No plugin attached
        }else{
            if(typeof microPlugins === "function"){ // Single Plugin
                this.microPluginHandler(microPlugins)
            }else{
                if(typeof microPlugins === "object"){ // Array of Plugin
                    microPlugins.map(plugin => this.microPluginHandler(plugin))
                }
            }
        }

    }
    microPluginHandler(plugin){
        const {microPluginStats} = this
        plugin.commit(microPluginStats,this.hooks)
    }
    messageLoggin(bundleSize, fullSizeInfo) {
        const {
            sizeLimit
        } = this.pluginOptions
        if (bundleSize < sizeLimit) {
            info("Safe:Bundle-Size", fullSizeInfo)
            this.sizeLimitSafeHandler(bundleSize)
        } else {
            if (bundleSize == sizeLimit) {
                warn("Warn:Bundle-Size", fullSizeInfo)
                this.sizeLimitWarnHandler(bundleSize)
            } else {

                error(fullSizeInfo, {
                    label: "Unsafe:Bundle-Size",
                    exit: false
                })
                this.sizeLimitExceedHandler(bundleSize)
            }
        }
    }
    sizeLimitSafeHandler(bundleSize){
        const {
            pluginOptions
        } = this
        this.hooks.onSizeSafe.call({
            callType:"Bundle Size is Safe",
            bundleSize,
            pluginOptions
        })
    }
    sizeLimitWarnHandler(bundleSize){
        const {
            pluginOptions
        } = this
        this.hooks.onSizeWarn.call({
            callType:"Warning Bundle size may Increase",
            bundleSize,
            pluginOptions
        })
    }
    sizeLimitExceedHandler(bundleSize){
        const {
            pluginOptions
        } = this
        this.hooks.onSizeExceed.call({
            callType:"Size Limit Increases",
            bundleSize,
            pluginOptions
        })
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

}