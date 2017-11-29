const gulp = require('gulp');
// 服务启动插件
const nodemon = require('gulp-nodemon');
// 浏览器刷新插件
const browserSync = require('./browsersync');
const src = require('./files');

gulp.task('server', ['sass'], function () {
    let started = false;
    return nodemon({
        // 指定服务启动文件
        script: src.server,
        // 指定不需要监听的文件
        // 这些文件发生变动不需要重启服务
        ignore: ['gulpfile.js', 'node_modules/', 'tasks/', src.html, src.css]
    }).on('start', function () {
        if (!started) {
            // 初始化浏览器自动刷新
            browserSync.init({
                // 指定需要监听的服务端口
                proxy: 'http://localhost:3000',
                // 指定启动浏览器
                browser: 'google chrome',
                // 指定刷新视图端口（开发中使用的视图窗口）
                port: 4000,
                // 指定需要监听的文件
                // 这些文件发生变化就会刷新
                // 这里为什么不对css,js文件监听呢
                // 因为这些监听都写在各自的任务里了，不需要在单独添加
                files: src.html,
                logLevel: 'info',
                reloadDelay: 500
            }); 
            started = true;
        } else {
            // 每次服务端重启时，我们就需要重新注入html文件
            // 实现即时刷新
            browserSync.reload(src.html);
        }
    });
});