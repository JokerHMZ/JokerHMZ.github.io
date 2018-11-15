function htmlAfterWebpackPlugin(options) {
    // Configure your plugin with options...
}

function assetsHelper(assets) {
    let reuslt = {
      js:[],
      css:[]
    };
    const dir = {
        js(item){
            return `<script src="${item}"></script>`
        },
        css(item){
            return `<link href="${item}" rel="stylesheet">`
        }
    };



    assets.js.map((item)=>{
        reuslt.js.push(dir.js(item))
    })
    assets.css.map((item)=>{
        reuslt.css.push(dir.css(item))
    })

    return reuslt
}

htmlAfterWebpackPlugin.prototype.apply = function (compiler) {
    compiler.plugin('compilation', (compilation) => {
        compilation.plugin('html-webpack-plugin-before-html-processing', (data, cb) => {
            let _html = data.html;
            let result = assetsHelper(data.assets);

            let isBase = data.outputName.includes('/layout.html');

            console.log(result.css)

            if(!isBase){
                _html=_html.replace('{% block styles %}',function () {
                    return `{% block styles %}${result.css.join('')}`
                });

                _html=_html.replace('{% block scripts %}',function () {
                    return `{% block scripts %}${result.js.join('')}`
                });
            }

            data.html = _html;
            cb(null, data)
        })
    })
}

module.exports = htmlAfterWebpackPlugin