import Koa from 'koa'
import path from 'path'
import config from './config/config';
import router from 'koa-simple-router';
import controllers from './controllers/controllerInit';
import errorHandler from './middleware/errorHandler';
import log4js from 'log4js'
import render from 'koa-swig'
import serve from 'koa-static';
import co from 'co';

const app = new Koa();

//模板处理 render
app.context.render = co.wrap(render({
    root: config.viewDir,
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));

//日志处理
log4js.configure({
    appenders: { myLog: { type: 'file', filename:path.join(__dirname,'./log/error.log') } },
    categories: { default: { appenders: ['myLog'], level: 'error' } }
});
const logger = log4js.getLogger('myLog');
logger.level='error';

if (config.env == "development") {
    const webpack = require('webpack');
    const {devMiddleware, hotMiddleware} = require('koa-webpack-middleware');
    const devConfig = require('../config/webpack.dev');
    const compile = webpack(devConfig)
    app.use(devMiddleware(compile, {
        // display no info to console (only warnings and errors)
        noInfo: false,
        // display nothing to the console
        quiet: false,
        // switch into lazy mode
        // that means no watching, but recompilation on every request
        lazy: false,
        // watch options (only lazy: false)
        watchOptions: {
            aggregateTimeout: 300,
            poll: true
        },
        // public path to bind the middleware to
        // use the same as in webpack
        publicPath: "/",
        // custom headers
        headers: {
            "Access-Control-Allow-Origin": "*"
        },
        // options for formating the statistics
        stats: {
            colors: true
        }
    }))
    app.use(hotMiddleware(compile, {
        log: console.log,
        path: '/__webpack_hmr',
        heartbeat: 10 * 1000
    }))
}

//错误处理
errorHandler.error(app,logger)

//路由处理
controllers.getAllrouters(app, router);

//静态资源文件夹
app.use(serve(config.staticDir));

//监听端口
app.listen(config.port, () => {
    console.log('server is listening on port :', config.port);
});
export default app;
