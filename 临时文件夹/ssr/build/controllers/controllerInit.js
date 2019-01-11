'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexController = require("./indexController");

var _indexController2 = _interopRequireDefault(_indexController);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const controllerInit = {
  getAllrouters(app, router) {
    app.use(router(_ => {
      _.get('/', _indexController2.default.index());

      _.get('/about', _indexController2.default.index());

      _.get('/counter', _indexController2.default.index());

      _.get('/topics/:id', _indexController2.default.index());

      _.get('/test', _indexController2.default.index());

      _.get('/index/getdata', _indexController2.default.getData());
    }));
  }

};
exports.default = controllerInit;