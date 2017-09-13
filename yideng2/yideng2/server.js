/**
 * Created by he.mingze on 2017/9/11.
 */
let koa=require('koa'),
    router=require('koa-router'),
    swig=require('koa-swig'),
    co = require('co'),
    path=require('path'),
    convert=require('koa-convert'),
    server=require('koa-static'),
    request=require('request'),
    bodyParser = require('koa-bodyparser'),

    app=new koa();
let home=new router();
app.use(convert(server(path.join(__dirname,'public'))));
app.context.render = co.wrap(swig({
    root:path.join(__dirname,'views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));
app.use(bodyParser());
// 子路由1
home.get('index/index', async ( ctx,next )=>{
    ctx.body =await ctx.render('index.html');
    app.use( async ( ctx ) => {
        if ( ctx.url === '/receive' && ctx.method === 'POST' ) {
            // 当POST请求的时候，中间件koa-bodyparser解析POST表单里的数据，并显示出来
            let postData = ctx.request.body;
            request.post({
                url:'http://127.0.0.1:8000/yideng_phpserver/yideng2/main.php',
                formData:postData
            },function (error, response, body){
                ctx.body=body;
            });
        }
    })
});
// 子路由2
let page = new router();
page.get('*', async ( ctx )=>{
    ctx.body = '404 page!';
});

// 装载所有子路由
let rout= new router();
rout.use('/', home.routes(), home.allowedMethods());
rout.use('*', page.routes(), page.allowedMethods());

// 加载路由中间件
app.use(rout.routes()).use(rout.allowedMethods());

app.listen(8888, () => {
    console.log('koa2 is running')
});
