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
