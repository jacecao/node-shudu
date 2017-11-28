const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const browserSync = require('./browsersync');
const src = require('./files');

gulp.task('server', ['sass'], function () {
    let started = false;
    return nodemon({
        script: src.server,
        ignore: ['gulpfile.js', 'node_modules/', 'tasks/']
    }).on('start', function () {
        if (!started) {
            browserSync.init({
                proxy: 'http://localhost:3000',
                browser: 'google chrome',
                port: 4000,
                files: [src.html]
            }); 
            started = true;
        } 
    });
});