const path = require('path');
const merge = require('webpack-merge')
const webpackConfigBase = require('./webpack.base.config');

const PORT = 3000;

const webpackConfigDev = {
    mode : 'development',
    devServer: {
        host : '0.0.0.0',
        contentBase: path.join(__dirname, '../src'),
        open : true,
        compress: true,
        historyApiFallback: true,
        hot : true,
        port: PORT
    }
};

module.exports = merge(webpackConfigBase, webpackConfigDev);