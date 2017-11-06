/**
 * Created by Donny on 17/3/23.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('js', function () {
  return gulp.src(['./js/**/*.js', './js/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/'));
});

// 静态服务器
gulp.task('serve', ['js'], function () {
    browserSync.init({
      server: {
        baseDir: "./"
      },
      port: '3000'
    });

    gulp.watch([
      "*.html",
      "js/**/*.html",
      "js/**/**/*.html"
    ], ['reload']);
    gulp.watch([
      "js/**/*.js",
      "js/**/**/*.js"
    ], ['js', 'reload']);
    gulp.watch("css/*.css", ['reload']);
  }
);

gulp.task('reload', function () {
  browserSync.reload();
});

gulp.task('default', ['serve']);
