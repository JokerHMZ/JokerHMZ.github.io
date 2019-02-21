const Koa = require('koa');
const app = new Koa();
const http = require('http').createServer(app.callback());
const io = require('socket.io')(http);
const co = require('co');
const render = require('koa-swig');
const route = require('koa-route');
const server = require('koa-static');
const path = require('path');
const groupA=[];
const groupB=[];

http.listen(3000);

app.use(server(path.join(__dirname,'./static')));

app.context.render = co.wrap(render({
    root: path.join(__dirname, './views'),
    autoescape: true,
    cache: 'memory', // disable, set to false
    ext: 'html',
    writeBody: false
}));

function random(name) {
    if(groupA.length>=5&&groupB.length>=5){
        return '人满了'
    }
    if(groupA.length>=5){
        groupB.push(name);
        return 'ok'
    }
    if(groupB.length>=5){
        groupA.push(name);
        return 'ok'
    }
    if(Math.random()-0.5>0){
        groupB.push(name);
    }else{
        groupA.push(name);
    }
    return 'ok'
}

io.on('connection', function(socket){
    socket.emit('open',[groupA,groupB]);
    socket.on('message',function (msg) {
        console.log('服务器接收到客户端的消息',msg);
        var result=random(msg);
        if(result!=='ok'){
            socket.emit('message',[groupA,groupB,result]);
        }else{
            socket.emit('message',[groupA,groupB]);
            socket.broadcast.emit('message',[groupA,groupB])
        }
    });
    socket.on('disconnect', function(){});
});

const main = async ctx => {
    ctx.response.body =await  ctx.render('index');
};

app.use(route.get('/', main));





