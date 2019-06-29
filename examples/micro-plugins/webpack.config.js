/**
 *
 *      [WIP] -  Still finding a better way to structure the mini/micro plugins
 *
 *
 */



var path = require('path');
var webpack = require('webpack');

var fs = require('fs');




const bundlesizePlugin = require('../../src')
const sizeExceedBundleSizeMicroPlugin = require("./webpack-plugin-bundlesize-micro-sizeExceed-plugin")
const sizeWarnBundleSizeMicroPlugin = require("./webpack-plugin-bundlesize-micro-sizeWarn-plugin")
const sizeSafeBundleSizeMicroPlugin = require("./webpack-plugin-bundlesize-micro-sizeExceed-plugin")



var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod;
    });



var dir_js = path.resolve(__dirname, '');
var dir_build = path.resolve(__dirname, 'dist');
module.exports = {
    entry: {
        app: path.resolve(dir_js, 'index.js')
    },
    target: 'node',
    output: {
        path: dir_build,
        filename: 'bundle.js'
    },

    externals: nodeModules,
    devServer: {
        contentBase: dir_build,
    },
    stats: {
        colors: true,
        chunkModules: false
    },

    plugins: [
        new bundlesizePlugin({
            sizeLimit: 0,
            microPlugins: [
                new sizeExceedBundleSizeMicroPlugin(),
                new sizeSafeBundleSizeMicroPlugin(),
                new sizeWarnBundleSizeMicroPlugin()

            ]
        }),

    ],

}