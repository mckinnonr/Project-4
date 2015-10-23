'use strict';

var gulp = require('gulp'); // Load Gulp!
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var historyApiFallback = require('connect-history-api-fallback');

gulp.task('scss', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(gulp.dest('./css'));
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            browser: ["google chrome", "firefox"],
            middleware: [ historyApiFallback() ]
        }
    });
    gulp.watch('./scss/**/*.scss', ['scss']);
    gulp.watch(["*.html", "js/*.js", "css/*.css"]).on('change', browserSync.reload);
});
