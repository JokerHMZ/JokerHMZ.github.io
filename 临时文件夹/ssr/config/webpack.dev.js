/**
 *@Description 开发环境Webpack配置项
 */
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlAfterWebpackPlugin = require('./htmlAfterWebpackPlugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const conf = require('./webpack.conf');
const _options = {
    output:{
        path: path.join(__dirname, '../build/assets/'),
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    plugins:[
        new ExtractTextPlugin('styles/[name].bundle.css'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'dev')
        }),
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: '../views/index.html ',
            template: 'src/webapp/index.html',
            inject: false
        })
    ]
}
const options = Object.assign(conf.dev,_options)
module.exports = options;