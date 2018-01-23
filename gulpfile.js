const gulp = require('gulp')
const bs = require('browser-sync').create()
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const clean = require('gulp-clean')

gulp.task('js', function () {
  return gulp
    .src([
      'src/frontend/directives/*.js',
      'src/frontend/components/**/*.js',
      'src/frontend/config/*.js',
      'src/frontend/routers/*.js',
      'src/frontend/services/*.js',
      'src/frontend/app.js'
    ])
    .pipe(concat('bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest('src/frontend/bundle'))
})

// 静态服务器
gulp.task('serve', ['js'], function () {
  bs.init({
    server: {
      baseDir: './src/frontend'
    },
    port: '3000'
  })

  gulp.watch(['*.html', 'src/frontend/**.html'], ['reload'])
  gulp.watch(['src/frontend/*.js', 'src/frontend/**/*.js'], ['js', 'reload'])
  gulp.watch(['src/frontend/**/*.css'], ['reload'])
})

gulp.task('reload', function () {
  bs.reload()
})

gulp.task('clean', function () {
  gulp.src(['./dist', 'src/frontend/bundle']).pipe(clean({ force: true }))
})

gulp.task('build', ['clean', 'js'], function () {
  gulp.src([
    'src/frontend/bower_components/**/*.min.js',
    'src/frontend/bower_components/**/*.min.css'
  ]).pipe(gulp.dest('dist/bower_components'))
  gulp.src('src/frontend/common/**').pipe(gulp.dest('dist/common'))
  gulp.src('src/frontend/components/**/*.html').pipe(gulp.dest('dist/components'))
  gulp.src('src/frontend/bundle/**').pipe(gulp.dest('dist/bundle'))
  gulp.src('src/frontend/vendor/**').pipe(gulp.dest('dist/vendor'))
  gulp.src('src/frontend/index.html').pipe(gulp.dest('dist'))
})

gulp.task('default', ['serve'])
