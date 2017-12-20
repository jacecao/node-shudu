const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
// 将es6模块转换为commonJS模块
const babel = require('gulp-babel');
const concat = require('gulp-concat');

const browserSync = require('./browsersync');
const src = require('./files');
// Compile sass into CSS
gulp.task('script_basic', function() {
    return gulp.src(src.es6)
        // 初始化map插件
        .pipe(sourcemaps.init())
        // 转译
        .pipe(babel())
        // 合并文件为一个文件
        // 这类合并的文件应该是没有相互依赖关系的
        // 其实在es6实际开发中是不常用这个插件
        .pipe(concat('main.js'))
        // 指定map文件存放地址,这里是指当前目录下
        // 也就是编译后的地址
        .pipe(sourcemaps.write('.'))
        // 指定转译后文件存放地址
        .pipe(gulp.dest(src.js))
        // 刷新浏览器
        .pipe(browserSync.reload({ stream: true }));
});