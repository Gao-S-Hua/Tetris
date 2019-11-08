const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const webpackConfigBuild = {
    mode : 'production',
    // output : {
        //publicPath : 'www.host.com/',
    // },
    plugins : [
        new BundleAnalyzerPlugin()
    ]
};

module.exports = merge(webpackConfigBase, webpackConfigBuild);