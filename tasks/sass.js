const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('./browsersync');
const src = require('./files');
// Compile sass into CSS
gulp.task('sass', function() {
    return gulp
        .src(src.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(src.css))
        .pipe(browserSync.reload({ stream: true }));
});