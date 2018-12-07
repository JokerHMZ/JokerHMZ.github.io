'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _indexModel = require("../models/indexModel");

var _indexModel2 = _interopRequireDefault(_indexModel);

var _cheerio = require("cheerio");

var _cheerio2 = _interopRequireDefault(_cheerio);

var _vueServerRenderer = require("vue-server-renderer");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import config from '../config/config';

/*vue ssr start*/
//创建数据流

/*
*  bundle 目录，vue-ssr-render生成
*  template html页面
*  clientManifest 静态资源清单
 */
function createRenderer(bundle, template, clientManifest) {
  return (0, _vueServerRenderer.createBundleRenderer)(bundle, {
    cache: require('lru-cache')({
      //缓存模板
      max: 1000,
      maxAge: 1000 * 60 * 15
    }),
    runInNewContext: false,
    // 推荐
    template,
    clientManifest
  });
}

const rootPath = _path2.default.join(__dirname, '..');

const template = _fs2.default.readFileSync(rootPath + '/assets/index.html', 'utf-8');

const $ = _cheerio2.default.load(template);

$('title').html('京程一灯');
$("head").append(' <meta name="keywords" content=京程一灯>'); // console.log('模板数据',$.html());

const serverBundle = require('../assets/vue-ssr-server-bundle.json');

const clientManifest = require('../assets/vue-ssr-client-manifest.json');
/*vue ssr end*/


const indexController = {
  getData() {
    return async (ctx, next) => {
      const indexModelIns = new _indexModel2.default();

      const _data = await indexModelIns.getData(); // logger.info('哈哈哈哈');


      ctx.body = _data;
    };
  },

  index() {
    return async (ctx, next) => {
      const s = Date.now();
      const ssrrender = createRenderer(serverBundle, $.html(), clientManifest);
      const context = {
        url: ctx.url
      };

      function createSsrStreamPromise() {
        return new Promise((resolve, reject) => {
          if (!ssrrender) {
            return ctx.body = 'waiting for compilation.. refresh in a moment.';
          }

          const ssrStream = ssrrender.renderToStream(context);
          ctx.status = 200;
          ctx.type = 'html';
          ssrStream.on('error', err => {
            reject(err);
          }).pipe(ctx.res);
        });
      }

      await createSsrStreamPromise(context);
    };
  }

};
exports.default = indexController;