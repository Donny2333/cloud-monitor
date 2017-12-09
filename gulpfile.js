let gulp = require('gulp')
let browserSync = require('browser-sync').create()
let concat = require('gulp-concat')
let uglify = require('gulp-uglify')

gulp.task('js', function() {
  return (gulp
      .src([
        'src/config/*.js',
        'src/routers/*.js',
        'src/directives/*.js',
        'src/services/*.js',
        'src/components/*/*.js',
        'src/modules/*/*.js',
        'src/*.js'
      ])
      .pipe(concat('bundle.js'))
      // .pipe(uglify())
      .pipe(gulp.dest('src/build/')) )
})

// 静态服务器
gulp.task('serve', ['js'], function() {
  browserSync.init({
    server: {
      baseDir: './'
    },
    port: '3000'
  })

  gulp.watch(
    ['*.html', 'src/js/**/*.html', 'src/js/components/**/*.html'],
    ['reload']
  )
  gulp.watch(['src/*.js', 'src/**/*.js', 'src/**/**/*.js'], ['js', 'reload'])
  gulp.watch('src/css/*.css', ['reload'])
})

gulp.task('reload', function() {
  browserSync.reload()
})

gulp.task('default', ['serve'])
