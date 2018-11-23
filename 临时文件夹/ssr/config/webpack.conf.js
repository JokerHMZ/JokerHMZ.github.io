/*
 *@Description webpack module、plugins等核心配置文件
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-07-18
 */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const vueLoader = require('./vue-loader.config');
const rootPath = path.join(__dirname, '..');
const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000';
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const _module = {
    rules : [

        {
            test: /\.vue$/,
            loader:'vue-loader',
            options:vueLoader
        },
        {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [path.join(__dirname,'./src'), path.join(__dirname,'./test')],
            options:{
                "presets": [
                    ["env", {
                        "modules": false,
                        "targets": {
                            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
                        }
                    }],
                    "stage-2"
                ],
                "plugins": ["transform-runtime"]
            }
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
const _resolve={
    extensions:['.js','.css']
};
let _devLoaders = _.clone(_module.rules);
_devLoaders.push(cssLoader);
let _prodLoaders = _.clone(_module.rules);
_prodLoaders.push(cssLoader);
let _serverLoaders = _.clone(_module.rules);
const WebpackConfig = {
    dev:{
        entry:rootPath + '/src/webapp/entry-client.js',
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
        entry:rootPath+'src/webapp/entry-server.js',
        module:{
            rules:_serverLoaders
        },
        resolve:_resolve
    },
};

module.exports = WebpackConfig;