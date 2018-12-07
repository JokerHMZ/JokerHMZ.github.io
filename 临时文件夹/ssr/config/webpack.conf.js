/*
 *@Description webpack module、plugins等核心配置文件
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-07-18
 */
const webpack = require('webpack');
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const rootPath = path.join(__dirname, '..');
const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
const vueLoader = require('./vue-loader.config');

const _module = {
    rules : [
        {
            test: /\.vue$/,
            loader:'vue-loader',
            options:vueLoader
        },
        {
            test: /\.js$/,
            use: [{
                loader: "babel-loader"
            }]
        }
    ]
};
//css loader只用于前端的开发环境
const cssLoader =  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', 'postcss-loader' ]
    })
};
const fileloader = {
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=images/[name].[ext]'
};
const _resolve = {
    extensions: [".vue", ".js", ".es", ".css"],
    alias: {
        vue: 'vue/dist/vue.js'
    }
};
let _devLoaders = _.clone(_module.rules);
_devLoaders.push(fileloader);
_devLoaders.push(cssLoader);
let _prodLoaders = _.clone(_module.rules);
_prodLoaders.push({
    test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
    loader: 'file-loader?name=images/[name].[hash:5].[ext]'
});
_prodLoaders.push(cssLoader);
let _serverLoaders = _.clone(_module.rules);
_serverLoaders.push(fileloader);
const WebpackConfig = {
    dev:{
        entry: [webpackHotMiddlewareConfig, rootPath + '/src/webapp/entry-client.js'],
        module:{
            rules:_devLoaders
        },
        resolve:_resolve
    },
    prod:{
        entry:rootPath + '/src/webapp/entry-client.js',
        module:{
            rules:_prodLoaders
        },
        resolve:_resolve
    },
    server:{
        // entry:rootPath+'/src/webapp/entry-server.js',
        entry: [ 'webpack/hot/dev-server',"webpack-hot-middleware/client?http://localhost:8081/", rootPath + '/src/webapp/entry-server.js'],
        module:{
            rules:_serverLoaders
        },
        resolve:_resolve
    },
};

module.exports = WebpackConfig;
module.exports.rootPath = rootPath;