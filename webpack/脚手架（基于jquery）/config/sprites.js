const webpack=require('webpack');
const rm = require('rimraf')
const SpritesmithPlugin  = require('webpack-spritesmith');
const fs = require('fs');
const path = require('path');
const config = require('./index');
rm(path.join(__dirname, `../src/${config.sprite.folder}/${config.sprite.resultFolder}`), err => {
    if (err) throw err
    const spritesDirs = fs.readdirSync(path.join(__dirname,`../src/${config.sprite.folder}`))
    const spritesPlugins=spritesDirs.map((dir)=>{
        return new SpritesmithPlugin({
            src: {
                cwd: path.resolve(__dirname, `../src/${config.sprite.folder}/${dir}`),
                glob: '*.png'
            },
            target: {
                image: path.resolve(__dirname, `../src/sprites/${config.sprite.resultFolder}/${config.build.imgFolder}/${dir}.png`),
                css: path.resolve(__dirname, `../src/sprites/${config.sprite.resultFolder}/css/${dir}.css`)
            },
            apiOptions: {
                cssImageRef: `../${config.build.imgFolder}/${dir}.png`
            },
            spritesmithOptions:{
                padding:2,
                algorithm:'binary-tree'
            }
        })
    })
    webpack({
        mode:'production',
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
            child_process: 'empty'
        },
        plugins:spritesPlugins
    },()=>{})
})