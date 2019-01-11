/**
 *@Description 开发环境Webpack配置项
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');
const conf = require('./webpack.conf');
const _options = {
    output:{
        path: path.join(__dirname, '../build/assets/'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    plugins:[
        new ExtractTextPlugin('styles/[name].bundle.css'),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
        }),
        new HtmlWebpackPlugin({
            filename: '../views/index.html',
            template: 'src/web/views/index/pages/index.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: '../views/layout.html',
            template: 'src/web/views/common/pages/layout.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: '../widget/footer.html',
            template: 'src/web/widget/footer/footer.html',
            inject: false
        }),
        new HtmlWebpackPlugin({
            filename: '../widget/header.html',
            template: 'src/web/widget/header/header.html',
            inject: false
        }),
        new HtmlAfterWebpackPlugin({})
    ]
}
const options = Object.assign(conf.dev,_options)
module.exports = options;