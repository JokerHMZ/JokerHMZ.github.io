"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koa = require("koa");

var _koa2 = _interopRequireDefault(_koa);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _config = require("./config/config");

var _config2 = _interopRequireDefault(_config);

var _koaSimpleRouter = require("koa-simple-router");

var _koaSimpleRouter2 = _interopRequireDefault(_koaSimpleRouter);

var _controllerInit = require("./controllers/controllerInit");

var _controllerInit2 = _interopRequireDefault(_controllerInit);

var _errorHandler = require("./middleware/errorHandler");

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _log4js = require("log4js");

var _log4js2 = _interopRequireDefault(_log4js);

var _koaSwig = require("koa-swig");

var _koaSwig2 = _interopRequireDefault(_koaSwig);

var _koaStatic = require("koa-static");

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _co = require("co");

var _co2 = _interopRequireDefault(_co);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = new _koa2.default(); //模板处理 render

app.context.render = _co2.default.wrap((0, _koaSwig2.default)({
  root: _config2.default.viewDir,
  autoescape: true,
  cache: 'memory',
  // disable, set to false
  ext: 'html',
  writeBody: false
})); //日志处理

_log4js2.default.configure({
  appenders: {
    myLog: {
      type: 'file',
      filename: _path2.default.join(__dirname, './log/error.log')
    }
  },
  categories: {
    default: {
      appenders: ['myLog'],
      level: 'error'
    }
  }
});

const logger = _log4js2.default.getLogger('myLog');

logger.level = 'error';

if (_config2.default.env == "development") {
  const webpack = require('webpack');

  const {
    devMiddleware,
    hotMiddleware
  } = require('koa-webpack-middleware');

  const devConfig = require('../config/webpack.dev');

  const compile = webpack(devConfig);
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
  }));
  app.use(hotMiddleware(compile, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }));
} //错误处理


_errorHandler2.default.error(app, logger); //路由处理


_controllerInit2.default.getAllrouters(app, _koaSimpleRouter2.default); //静态资源文件夹


app.use((0, _koaStatic2.default)(_config2.default.staticDir)); //监听端口

app.listen(_config2.default.port, () => {
  console.log('server is listening on port :', _config2.default.port);
});
exports.default = app;