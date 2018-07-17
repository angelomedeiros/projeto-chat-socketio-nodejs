import gulp from 'gulp'
import notify from 'gulp-notify'
import livereload from 'gulp-livereload'
import changed from 'gulp-changed'
import concat from 'gulp-concat'
import plumber from 'gulp-plumber'
import imagemin from 'gulp-imagemin'
import minifyCss from 'gulp-minify-css'
import minifyHtml from 'gulp-minify-html'
import rev from 'gulp-rev'
import revCollector from 'gulp-rev-collector'
import del from 'del'
import uglify from 'gulp-uglify'
import connect from 'gulp-connect'
import sass from 'gulp-sass'

const paths = {
  fontSrc : 'src/fonts/',
  htmlSrc : 'src/',
  sassSrc : 'src/scss/',
  jsSrc   : 'src/js/',
  imgSrc  : 'src/images',

  buildDir: 'build/',
  distDir : 'dist/',
  revDir  : 'build/rev/'
}

let onError = (err) => {
  gutil.beep()
  gutil.log(gutil.colors.red(err))
}

gulp.task('build-html', () => {
  return gulp
        .src(paths.htmlSrc.concat('**/*.html'))
        .pipe(gulp.dest(paths.buildDir.concat('/')))
        .pipe(livereload())
})

gulp.task('build-css', () => {
  return gulp
        .src(paths.sassSrc.concat('**/*.scss'))
        .pipe(sass({
          includePaths: require('node-neat').includePaths,
          style: 'nested',
          onError: function () {
            console.log('Sass error')
          }
        }))
        .pipe(plumber({ errorHandler: onError }))
        .pipe(gulp.dest(paths.buildDir.concat('/css')))
        .pipe(livereload())
})

gulp.task('build-js', () => {
  return gulp
      .src(paths.jsSrc.concat('*.js'))
      .pipe(plumber({ errorHandler: onError }))
      .pipe(changed(paths.buildDir.concat('/js')))
      .pipe(gulp.dest(paths.buildDir.concat('/js')))
      .pipe(livereload())
})

gulp.task('build-fonts', () => {
  return gulp
      .src(paths.fontsSrc.concat('**/**'))
      .pipe(gulp.dest(paths.buildDir.concat('/fonts')))
      .pipe(livereload())
})

gulp.task('build-images', () => {
  return gulp
      .src(paths.imgSrc.concat('**/*.+(png|jpg|jpeg|gif|svg)'))
      .pipe(changed(paths.buildDir.concat('/images')))
      .pipe(gulp.dest(paths.buildDir.concat('/images')))
      .pipe(livereload())
})

gulp.task('build', ['build-html', 'build-css', 'build-js', 'build-images', 'build-fonts'], () => {
  return connect.server({
    root: 'src',
    livereload: true
  })
})

gulp.task('watch', () => {
  gulp.watch('src/*.html', ['build-html'])
  gulp.watch('src/scss/**', ['build-css'])
  gulp.watch(paths.jsSrc.concat('**/*.js'), ['build-js'])
  gulp.watch(paths.imgSrc.concat('**/*.+(png|jpg|jpeg|gif|svg)'), ['build-images'])
})

const env = process.env.NODE_ENV || 'development'

if (env === 'development') {
    return gulp.task('default', ['build', 'watch'])
}