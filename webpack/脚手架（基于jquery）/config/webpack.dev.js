const webpack=require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const path=require('path');
const utils= require('./utils');
const config= require('./index');
const localIp=utils.getLocalIp();

module.exports={
    mode: 'development',
    entry:{
        app:config.build.entry
    },
    output:{
        path:path.join(__dirname,'../dist'),
        publicPath: config.dev.assetsPublicPath,
        filename:"static/js/[name].[hash:7].js"
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    module: {
        rules:[
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname,'./src'), path.join(__dirname,'./test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:  `static/${config.build.imgFolder}/[name].[hash:7].[ext]`
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:   `static/${config.build.mediaFolder}/[name].[hash:7].[ext]`
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name:   `static/${config.build.fontFolder}/[name].[hash:7].[ext]`
                }
            },
            {
                test: require.resolve('jquery'),
                use: [
                    {
                        loader: 'expose-loader',
                        options: 'jQuery'
                    },{
                        loader: 'expose-loader',
                        options: '$'
                    }
                ]
            },
            ...utils.styleLoaders({ sourceMap: true, usePostCSS: true })
        ]
    },
    devtool: config.dev.devtool,
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../src/static'),
                to: 'static',
                ignore: ['.*']
            }
        ]),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash:7].css'
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin({
            compilationSuccessInfo: {
                messages: [`Your application is running here: http://${localIp}:${config.dev.port}`],
            },
            onErrors: utils.createNotifierCallback()
        })
    ],
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host:localIp,
        port:config.dev.port,
        open: config.dev.autoOpenBrowser,
        overlay: { warnings: false, errors: true },
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
            poll: false,
        }
    },
};
