"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _local = require("./local");

var _local2 = _interopRequireDefault(_local);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let config = {
  "viewDir": _path2.default.join(__dirname, '..', 'views'),
  //静态文件所在的目录
  "staticDir": _path2.default.join(__dirname, '..', 'assets'),
  "env": process.env.NODE_ENV //"development" production

};
const server = {
  //端口号配置
  "port": 80
}; //本地调试环境

if (!config.env || config.env === 'development') {
  config = _lodash2.default.extend(config, _local2.default);
} else {
  config = _lodash2.default.extend(config, server);
}

exports.default = config;