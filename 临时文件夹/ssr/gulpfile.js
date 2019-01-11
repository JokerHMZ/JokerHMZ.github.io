const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const prepack = require('gulp-prepack');
// const rollup = require('gulp-rollup');
// const phantomcss = require('gulp-phantomcss');
gulp.task('builddev', () => {
    //开发环境
    return watch('./src/nodeuii/**/*.js', {
        ignoreInitial: false
    }, () => {
        gulp.src('./src/nodeuii/**/*.js')
            .pipe(babel({
                // presets: ['env'],
                babelrc: false,
                "plugins": [
                    "transform-es2015-modules-commonjs"
                ]
            }))
            .pipe(gulp.dest('./build/'))
    })
});
gulp.task('buildprod', () => {
    //生产环境
    gulp.src('./src/nodeuii/**/*.js')
        .pipe(babel({
            // presets: ['env'],
            babelrc: false,
            "plugins": [
                "transform-es2015-modules-commonjs"
            ]
        }))
        .pipe(gulp.dest('./build/'))
    // return gulp.src('./test/*.js')
    //     .pipe(babel({
    //         // presets: ['env'],
    //         babelrc: false,
    //         "plugins": [
    //             "transform-es2015-modules-commonjs"
    //         ]
    //     }))
    //     .pipe(prepack({
    //         // entry: './test/test.js'
    //     }))
    //     .pipe(gulp.dest('./build/'))
});
gulp.task('test', function() {
    // console.log('css基准测试');
    // gulp.src('./testsuite.js')
    //     .pipe(phantomcss({
    //         options: {
    //             mismatchTolerance: 0.05,
    //             screenshots: './test/csssuite/baseline',
    //             results: './reports/csssuite',
    //         }
    //     }));
});
// console.log(process.env.NODE_ENV);
gulp.task('default', [process.env.NODE_ENV === 'production' ? 'buildprod' : 'builddev']);