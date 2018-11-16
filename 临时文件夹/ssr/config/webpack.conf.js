/*
 *@Description webpack module、plugins等核心配置文件
 *@Author yuanzhijia@yidengxuetang.com
 *@Date 2016-07-18
 */
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const pagePath = path.join(__dirname,'../src/web/views')
const widgetPath = path.join(__dirname,'../src/web/widget')

const jsEntris = {};
fs.readdirSync(pagePath).map((o,index)=>{
    let _fd =path.join(pagePath,o);
    fs.readdirSync(_fd).map((innero,ifile)=>{
        if(/.entry.js$/.test(innero)){
            jsEntris[innero.replace('.entry.js',"")]=path.join(_fd,innero)
        }
    })
});
const _entries=Object.assign(jsEntris);
const _module = {
    rules : [
        {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [ 'css-loader', 'postcss-loader' ]
            })
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
const _resolve={
    extensions:['.js','.css']
};
const _devLoaders = _.clone(_module.rules);
const _prodLoaders = _.clone(_module.rules);
const WebpackConfig = {
    dev:{
        entry:_entries,
        module:{
            rules:_devLoaders
        },
        resolve:_resolve
    },
    prod:{
        entry:_entries,
        module:{
            rules:_prodLoaders
        },
        resolve:_resolve
    }
};

module.exports = WebpackConfig;