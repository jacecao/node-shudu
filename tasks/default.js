const gulp = require('gulp');
const src = require('./files');
gulp.task('default', ['server'], function() {
    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.es6, ['script_core']);
});