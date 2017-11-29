const gulp = require('gulp');
// 文件流处理
const gulpwebpack = require('webpack-stream');
// rename
const rename = require('gulp-rename');
// 对编译中出现的错误进行，这里为什么需要处理
// 如果不处理抛出的编译错误（或语法错误）便会堵塞文件流
// 也就会出现进程终端的情况
// 解决这个问题我们使用gulp-plumber插进来解决
const plumber = require('gulp-plumber');

const browserSync = require('./browsersync');
const src = require('./files');

gulp.task('source_map', function () {
  return gulp.src('src/es6/app.js')
    .pipe(plumber())
    // 编译js
    .pipe(gulpwebpack({
      devtool: 'source-map'
    }))
    // 对文件重命名(其实就是复制一份文件并重命名)
    .pipe(rename({
      basename: 'main',
      extname: '.map.js'
    }))
    .pipe(gulp.dest(src.js));

});
