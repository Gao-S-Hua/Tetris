const htmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

function resolve(relatedPath) {
    return path.join(__dirname, relatedPath)
  };
module.exports = {
    entry : {
        main : resolve('../src/index.js')
    },
    output : {
        path : resolve('../dist'),
        filename : 'js/[name]-[hash:8].js',
        chunkFilename : 'js/[name].chunk.[chunkhash:4].js'
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    module:{
        rules:[
            {
                test : /\.(css|less)/, 
                include: [
                    resolve('../src/style'),
                    resolve('../src/component')
                ],
                use:[{loader: MiniCssExtractPlugin.loader},{loader: 'css-loader',options:{modules: true, url: true}}, 'less-loader']
            },
            {
                test : /\.(css|less)/, 
                include: [
                    resolve('../node_modules/antd')
                ],
                use:[{loader: MiniCssExtractPlugin.loader},'css-loader', 'less-loader']
            },
            {test: /\.(js|jsx)$/, exclude: /node_modules/, use: ['babel-loader'] },
            {
                test: /\.(png|jpe?g|gif)$/i, 
                loader: 'file-loader',
                options: {name: '[name].[hash:8].[ext]', outputPath: 'media'} 
            }
       ]
    },
    plugins : [
        new htmlWebpackPlugin({
            template : resolve('../src/assets/index.html'),
            title : "React App 2",
            favicon : resolve('../src/assets/icon.png'),
            minify : {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[hash:4].css',
            chunkFilename: '[id].[chunkhash:4].css',
            ignoreOrder: false
          })
    ],
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
      },
};