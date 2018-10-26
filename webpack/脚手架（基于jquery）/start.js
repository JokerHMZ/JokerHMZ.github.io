const readline = require('readline');
const fs = require('fs');
const cp=require('child_process');
const path = require('path');
let config={};
let checkArr=[];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function input(question) {
    return new Promise((resolve,reject)=>{
        rl.question(question, (answer) => {
            resolve(answer)
        });
    })
}

function checkName(name) {
    let result=checkArr.some((item)=>{
        return item==name
    });
    console.log(!result);
    return !result
}

async function getNeed(question,defaultName) {
    let attr=await input(question);
    if(attr!=' '&&attr!=''&&checkName(attr)==true){
        return new Promise((resolve,reject)=>{
            checkArr.push(attr);
            resolve(attr);
            attr=null;
        });
    }else{
        return new Promise((resolve,reject)=>{
            // console.warn('文件夹名字与之前的重复，请重新输入');
            // resolve(getNeed(question))
            resolve(defaultName);
            defaultName=null
        })
    }
}


function cpRun(command,args,options) {
    return new Promise((resolve,reject)=>{
        let ls=cp.spawn(command,args,options);

        ls.stdout.on('data', (data) => {
            console.log(data.toString());
        });

        ls.stderr.on('data', (data) => {
            console.log(data.toString());
        });

        ls.on('close', (code) => {
            console.log(`子进程退出码：${code}`);
            resolve();
        });
    })
}

async function main () {
    // let needIndex=fs.existsSync(path.join(__dirname,'./config/index.js'));

    //提出需求
    config.entry=await getNeed('入口js名称','app');
    config.imgFolder=await getNeed('图片文件夹名称','image');
    config.mediaFolder=await getNeed('媒体文件夹名称','media');
    config.fontFolder=await getNeed('字体文件夹名称','font');
    config.loadImgJsName=await getNeed('图片加载数组js的名称','img');
    config.spriteFolder=await getNeed('精灵图文件夹名称','sprites');
    config.spriteResultFolder=await getNeed('精灵图结果文件夹名称','result');
    config.port=await getNeed('热更新端口号（请输出4位数字）',3000);
    (!(!isNaN(+config.port)&&config.port.length==4))&&(config.port=3000);
    config.autoOpenBrowser=await getNeed('是否自动打开浏览器(请输入Y或N)','N');
    if(config.autoOpenBrowser=='Y'||config.autoOpenBrowser=='y'){
        config.autoOpenBrowser=true
    }else{
        config.autoOpenBrowser=false
    }
    console.log(config);

    //修改index.js
    let configInner=fs.readFileSync('./config/config.js','utf8');
    configInner=configInner.replace(/{{port}}/,config.port)
    configInner=configInner.replace(/{{imgFolder}}/,config.imgFolder)
    configInner=configInner.replace(/{{entry}}/,config.entry)
    configInner=configInner.replace(/{{mediaFolder}}/,config.mediaFolder)
    configInner=configInner.replace(/{{fontFolder}}/,config.fontFolder)
    configInner=configInner.replace(/{{loadImgJsName}}/,config.loadImgJsName)
    configInner=configInner.replace(/{{folder}}/,config.spriteFolder)
    configInner=configInner.replace(/{{resultFolder}}/,config.spriteResultFolder)
    configInner=configInner.replace(/{{autoOpenBrowser}}/,config.autoOpenBrowser)
    console.log(configInner)
    fs.writeFileSync('./config/index.js',configInner);

    //创建文件夹
    let hasSrc=fs.existsSync(path.join(__dirname,'./src'));
    if(hasSrc){
        console.log('src目录已经存在')
    }else{
        fs.mkdirSync('./src')
        fs.mkdirSync(`./src/${config.spriteFolder}`)
        fs.mkdirSync(`./src/${config.spriteFolder}/${config.spriteResultFolder}`)
        fs.mkdirSync('./src/static')
        fs.mkdirSync('./src/static/css')
        fs.mkdirSync('./src/static/js')
        fs.mkdirSync(`./src/static/${config.fontFolder}`)
        fs.mkdirSync(`./src/static/${config.imgFolder}`)
        fs.mkdirSync(`./src/static/${config.mediaFolder}`)

        fs.writeFileSync(`./src/static/js/${config.entry}.js`,'');
        fs.writeFileSync(`./src/static/js/${config.loadImgJsName}.js`,'');
        fs.writeFileSync('./src/index.html',`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>

</body>
</html>`);
    }


    //安装依赖
    console.log('安装依赖.......')
    await cpRun('npm',['install'],{
        stdio:'pipe',
        shell:true
    })


    process.exit();

}

main();