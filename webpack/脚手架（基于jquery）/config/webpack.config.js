const webpack=require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const utils=require('./utils');
const path=require('path');
const config=require('./index');


const webpackConfig={
    mode:'production',
    entry:{
        app:config.build.entry
    },
    output:{
        path:path.join(__dirname,'../dist'),
        publicPath: config.build.publicPath,
        filename:"static/js/[name].[chunkhash].js"
    },
    node: {
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty'
    },
    devtool:config.build.devtool,
    module: {
        rules:[
            {
                test: /\.(htm|html)$/i,
                loader: 'html-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [path.join(__dirname,'../src'), path.join(__dirname,'../test')]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 5000,
                    name: path.join('static', `${config.build.imgFolder}/[name].[hash:7].[ext]`)
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join('static', `${config.build.mediaFolder}/[name].[hash:7].[ext]`)
                }
            },
            {
                test: /\.(woff|woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: path.join('static', `${config.build.fontFolder}/[name].[hash:7].[ext]`)
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
            ...utils.styleLoaders({
                sourceMap: true,
                extract: true,
                usePostCSS: true
            })
        ]
    },
    optimization:{
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    compress: {
                        warnings: false
                    }
                },
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        runtimeChunk: {
            name: 'runtime'
        },
        splitChunks:{
            chunks: "all",
            minSize: 0,
            minChunks: 2,
            name: 'commom',
            cacheGroups: {
                vendor: { // 抽离第三方插件
                    minChunks: 1,
                    test: require.resolve('jquery'), // 指定是 node_modules 下的第三方包
                    chunks: 'all',
                    name: 'jquery', // 打包后的文件名，任意命名
                    priority: 10 // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
                },
                utils: { // 抽离自定义公共代码
                    test: /\.js$/,
                    chunks: 'all',
                    name: 'common',
                    minSize: 0
                }
            }
        }
    },
    plugins:[
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            },
            chunksSortMode: 'dependency'
        }),
        new webpack.HashedModuleIdsPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[chunkhash].css'
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, `../src/static/${config.build.mediaFolder}`),
                to: `static/${config.build.mediaFolder}`,
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, `../src/static/${config.build.fontFolder}`),
                to: `static/${config.build.fontFolder}`,
                ignore: ['.*']
            }
        ])
    ],
};

if (config.build.productionGzip) {
    const CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

module.exports=webpackConfig;