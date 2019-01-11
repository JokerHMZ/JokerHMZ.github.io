/**
 *@Description 开发环境Webpack配置项
 */
const path = require('path');
const conf = require('./webpack.conf');
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const vueConfig = require('./vue-loader.config');
//摘取vue模板里的style
vueConfig.loaders = {
    extractCSS: true
};
const _options = {
    output:{
        path: conf.rootPath + '/build/assets/',
        publicPath: '/',
        filename: 'scripts/[name].bundle.js'
    },
    plugins:[
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new ExtractTextPlugin('styles/[name].bundle.css'),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            filename: 'scripts/[name].js',
            minChunks: Infinity
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        /*
        * VueSSRClientPlugin用处：
        * 1.生成vue-ssr-client-manifest,json
        * 2.保证chunk执行的顺利
        */
        new VueSSRClientPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/webapp/index.html',
            inject: false
        })
    ]
};
const options = Object.assign(conf.dev,_options);
module.exports = options;