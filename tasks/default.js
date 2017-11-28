const gulp = require('gulp');
const src = require('./files');
gulp.task('default', ['server'], function() {
    gulp.watch(src.scss, ['sass']);
});