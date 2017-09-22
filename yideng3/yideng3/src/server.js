/**
 * Created by he.mingze on 2017/9/22.
 */
var koa = require('koa'),
    router = require('koa-simple-router'),
    swig = require('koa-swig'),
    co = require('co'),
    path = require('path'),
    convert = require('koa-convert'),
    server = require('koa-static'),
    request = require('request'),
    rp = require('request-promise'),
    bodyParser = require('koa-bodyparser');
var app = new koa();
app.use(convert(server(path.join(__dirname, 'public'))));
app.context.render = co.wrap(swig({
    root: path.join(__dirname, 'views'),
    autoescape: true,
    cache: 'memory',
    ext: 'html',
    writeBody: false
}));
app.use(bodyParser());
app.use(router(function (_) {
    _.get('/index/index', async function (ctx, next) {
        ctx.body = await ctx.render('index.html');
    });
    _.post('/receive', async function (ctx, next) {
        var option = {
            method: "POST",
            url: 'http://127.0.0.1:8000/yideng_phpserver/yideng2/main.php',
            form: {
                id: ctx.request.body.id
            },
            json: true
        };
        ctx.body = await new Promise(function (resolve, reject) {
            rp(option).then(function (result) {
                // var info=JSON.parse(result);
                var info = result;
                if (info) {
                    resolve({ data: info });
                } else {
                    reject({});
                }
            });
        });
    });
}));
app.listen(8888, function () {
    console.log('koa2 is running');
});