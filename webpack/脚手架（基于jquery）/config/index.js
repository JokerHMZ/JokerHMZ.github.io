const path = require('path')

module.exports = {
    dev: {
        //热启动配置
        assetsPublicPath: '/',
        proxyTable: {},
        port: 3000,
        autoOpenBrowser: false,
        notifyOnErrors: true,

        devtool: 'cheap-module-eval-source-map'
    },

    build: {
        //基本配置
        entry:path.join(__dirname,'../src/static/js/app.js'),
        imgFolder:'image',
        mediaFolder:'media',
        fontFolder:'font',

        //图片加载数组js的名字
        loadImgJsName:'img',

        //公共路径，启用cdn时要改成cdn路径
        publicPath:'./',
        loadImgPublicPath:'../',
        cssImgPublicPath:'../../',

        devtool: '#source-map',

        //gzip配置
        productionGzip: false,
        productionGzipExtensions: ['js', 'css']
    },


    sprite:{
        //精灵图文件夹
        folder:'sprites',
        //精灵图结果文件夹
        resultFolder:'result'
    }
}
