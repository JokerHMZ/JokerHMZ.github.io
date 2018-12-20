const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const os=require('os');
const fs = require('fs');
const path = require('path');
const config = require('./index');
const packageConfig = require('../package.json');

exports.cssLoaders = function (options) {
  options = options || {};

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap,
        plugins: [
            require('autoprefixer')({
                "browsers": [
                    "> 1%",
                    "last 2 versions",
                    "not ie <= 8"
                ]
            })
        ]
    }
  }

  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    if (options.extract) {
        return [
            {
                loader:MiniCssExtractPlugin.loader,
                options:{
                    publicPath: config.build.cssImgPublicPath
                }
            },
            ...loaders
        ]
    } else {
        return [
           MiniCssExtractPlugin.loader,
            ...loaders
        ]
    }

  }

  return {
    css:generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use:loader
    })
  }

  return output
}

exports.getLocalIp= function () {
    let ifaces=os.networkInterfaces();
    let ip='127.0.0.1';
    for (var dev in ifaces) {
        if(ip!='127.0.0.1'){break}
        ifaces[dev].forEach(function(details){
            if (details.family=='IPv4') {
                if(dev.indexOf('本地连接')>-1){
                    ip=details.address;
                }
            }
        });
    }
    return ip
}

exports.makeLoadFile=async function () {
    let imgs=[];
    let commonPath = config.build.loadImgPublicPath=='../'?"require('..":`('${config.build.loadImgPublicPath}`;
     async function makeImgArr(imgPath) {
        let names = fs.readdirSync(path.join(__dirname,`../src/static/${imgPath}`))
         for(var i=0,len=names.length;i<len;i++){
            if(names[i].match(/\.(png|jpe?g|gif|svg)(\?.*)?$/ig)!=null){
                imgs.push(`${commonPath}/${imgPath}/${names[i]}')`)
            }else{
                let state = await new Promise((resolve,reject)=>{
                    fs.stat(path.join(__dirname,`../src/static/${imgPath}/${names[i]}`),(err,stats)=>{
                        if(err){
                            throw err
                        }else{
                            resolve(stats.isDirectory())
                        }
                    })
                });
                if(state===true){
                    makeImgArr(`${imgPath}/${names[i]}`)
                }else{
                    throw new Error(`${names[i]} is not a Directory or a image`);
                }
            }
         }
    }
    await makeImgArr(config.build.imgFolder);

    fs.writeFileSync(path.join(__dirname,'../src/static/js/img.js'),`module.exports=[${imgs}];`);
    console.log('img.js is finished')
}

exports.createNotifierCallback = () => {
    const notifier = require('node-notifier')

    return (severity, errors) => {
        if (severity !== 'error') return;

        const error = errors[0]
        const filename = error.file && error.file.split('!').pop()

        notifier.notify({
            title: packageConfig.name,
            message: severity + ': ' + error.name,
            subtitle: filename || ''
        })
    }
}