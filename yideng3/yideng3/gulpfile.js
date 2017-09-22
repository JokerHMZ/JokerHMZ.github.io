/**
 * Created by he.mingze on 2017/9/19.
 */
var gulp = require('gulp');
var babel = require('gulp-babel');
gulp.task('default', function (){
    gulp.src('src/server.js').
        pipe(babel()).
        pipe(gulp.dest('build'));
});
var watcher = gulp.watch('src/server.js', ['default']);
watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});