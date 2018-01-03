var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var concat = require('gulp-concat')
var uglify = require('gulp-uglify')
var clean = require('gulp-clean')

gulp.task('js', () => {
  return gulp
    .src(['./js/**/*.js', './js/*.js'])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build'))
})

// 静态服务器
gulp.task('serve', ['js'], () => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: '3000'
  })

  gulp.watch(['*.html', 'js/**/*.html', 'js/components/**/*.html'], ['reload'])
  gulp.watch(['*.js', 'js/**/*.js', 'js/components/**/*.js'], ['js', 'reload'])
  gulp.watch('css/*.css', ['reload'])
})

gulp.task('reload', () => {
  browserSync.reload()
})

gulp.task('clean', () => {
  gulp.src('./static').pipe(clean({ force: true }))
})

gulp.task('build', ['clean', 'js'], () => {
  gulp.src('./bower_components/**').pipe(gulp.dest('./static/bower_components'))
  gulp.src('./build/**').pipe(gulp.dest('./static/build'))
  gulp.src('./css/**').pipe(gulp.dest('./static/css'))
  gulp.src('./images/**').pipe(gulp.dest('./static/images'))
  gulp.src('./js/components/**').pipe(gulp.dest('./static/js/components'))
  gulp.src('./json/**').pipe(gulp.dest('./static/json'))
  gulp.src('./lib/**').pipe(gulp.dest('./static/lib'))
  gulp.src('./index.html').pipe(gulp.dest('./static'))
})

gulp.task('default', ['serve'])
