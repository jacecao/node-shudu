const gulp = require('gulp');
// 文件流处理
const gulpwebpack = require('webpack-stream');
const named = require('vinyl-named');
const sourcemaps = require('gulp-sourcemaps');
// rename
const rename = require('gulp-rename');
// 对编译中出现的错误进行，这里为什么需要处理
// 如果不处理抛出的编译错误（或语法错误）便会堵塞文件流
// 也就会出现进程终端的情况
// 解决这个问题我们使用gulp-plumber插进来解决
const plumber = require('gulp-plumber');

const browserSync = require('./browsersync');
const src = require('./files');

gulp.task('script_core', function () {
  return gulp.src('src/es6/app.js')
    .pipe(plumber())
    .pipe(named())
    // 编译js
    .pipe(gulpwebpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
        }]
      },
      devtool: 'souce-map'
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    // 对文件重命名(其实就是复制一份文件并重命名)
    .pipe(rename({
      basename: 'main',
      extname: '.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src.js))
    // 刷新浏览器
    .pipe(browserSync.reload({ stream: true }));

});


// 测试任务
gulp.task('test', function () {
  return gulp.src('src/es6/test.js')
    .pipe(plumber())
    .pipe(named())
    // 编译js
    .pipe(gulpwebpack({
      module: {
        loaders: [{
          test: /\.js$/,
          loader: 'babel-loader',
        }]
      },
      devtool: 'souce-map'
    }))
    .pipe(sourcemaps.init({loadMaps: true}))
    // 对文件重命名(其实就是复制一份文件并重命名)
    .pipe(rename({
      basename: 'test',
      extname: '.js'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(src.test))
    // 刷新浏览器
    .pipe(browserSync.reload({ stream: true }));

});
