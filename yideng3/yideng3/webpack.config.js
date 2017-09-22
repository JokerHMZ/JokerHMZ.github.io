/**
 * Created by he.mingze on 2017/9/15.
 */
var webpack=require('webpack');
var path=require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MyPlugin=require('./myplugs/myswigplugs');
module.exports={
    entry:{
        thumb:'./src/public/js/es6.es',
        xpraise:'./src/public/js/xpraise.es'
    },
    output:{
        path:path.join(__dirname,'./build/public'),
        publicPath:'/',
        filename:'js/[name]-[hash:8].js'
    },
    module:{
        rules:[
            {
                test:/\.es$/,
                use:[{
                    loader:'babel-loader',
                    query: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test:/\.css/i,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[{
                        loader:'css-loader',
                        options: {
                            minimize: true
                        }
                    },{
                        loader:'less-loader',
                        options: {
                            minimize: true
                        }
                    }]
                })
            }
        ]
    },
    plugins:[
        new MyPlugin({options: ''}),
        new ExtractTextPlugin('css/[name]-[hash:8].css'),
        new webpack.optimize.CommonsChunkPlugin({
            name:'commom',
            filename:'js/[name]-[hash:8].js',
            chunks:[
                'thumb',
                'xpraise'
            ],
            minChunks:2
        }),
        new HtmlWebpackPlugin({
            filename: '../views/index.html',
            template: './src/views/index.html',
            inject:false
        }),
        new HtmlWebpackPlugin({
            filename: '../views/layout.html',
            template: './src/views/layout.html',
            inject:false
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false,
                drop_console:false
            },
            extractComments:false,
            beautify:false,
            output:{
                comments:false
            },
            sourceMap:false
        })
    ],
    watch: true
};