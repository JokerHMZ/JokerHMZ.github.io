/**
 *@Description 开发环境Webpack配置项
 */
const path = require('path');
const webpack = require('webpack');
const conf = require('./webpack.conf');
const _options = {
    output:{
        path: path.join(__dirname, '../build/'),
        publicPath: '/',
        filename: 'assets/scripts/[name].bundle.js'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
}
const options = Object.assign(conf.dev,_options)
module.exports = options;