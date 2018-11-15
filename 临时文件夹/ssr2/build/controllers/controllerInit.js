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

      _.get('/index', _indexController2.default.index());

      _.get('/index.html', _indexController2.default.index()); // _.get('/about', index.index());
      // _.get('/counter', index.index());
      // _.get('/topics/:id', index.index());
      // _.get('/test', index.index());
      // _.get('/index/getdata', index.getData());

    }));
  }

};
exports.default = controllerInit;