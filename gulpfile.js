var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var plumber = require('gulp-plumber');  // 错误自启动
var browserify = require('browserify');
var del = require('del');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
// var stylish = require('jshint-stylish');
var buffer = require('vinyl-buffer');
var _ = require('lodash');
var TARGET = process.env.npm_lifecycle_event;

var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var api = require('./api/api');
var srcRoot = './src';
var dist = './dist';

gulp.task('clean', function(cb) {
  return del([
    'app/tmp'
  ], cb);
});

gulp.task('fonts', function () {
  return gulp.src(['node_modules/bootstrap/fonts/*', srcRoot+'/*.woff'])
    .pipe(gulp.dest(dist + '/fonts'));
});

gulp.task('images', function () {
  return gulp.src(srcRoot+'/**/**/imgs/*')
    .pipe($.imagemin({
      progressive: true,
      interlaced: true
    }))
    .pipe(gulp.dest(dist + '/imgs/'));
});

gulp.task('html', function() {
  return gulp.src(srcRoot+'/index.html')
    .pipe(plumber())
    .pipe(gulp.dest(dist));
});

gulp.task('styles', function() {
  return gulp.src(srcRoot+'/main.less')
    .pipe($.less())
    .pipe($.autoprefixer())
    .pipe($.rename('bundle.css'))
    .pipe(gulp.dest(dist))
    .pipe(reload({ stream: true }));
});

var bundler = _.memoize(function(watch) {
  var options = {debug: true};

  if (watch) {
    _.extend(options, watchify.args);
  }

  var b = browserify(srcRoot+'/main.js', options);

  if (watch) {
    b = watchify(b);
  }

  return b;
});

var handleErrors = function() {
  var args = Array.prototype.slice.call(arguments);
  delete args[0].stream;
  $.util.log.apply(null, args);
  this.emit('end');
};

function bundle(cb, watch) {
  return bundler(watch)
    .bundle()
    .on('error', handleErrors)
    .pipe(source('bundle.js'))
    .pipe(buffer())
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.sourcemaps.write('./maps'))
    .pipe(gulp.dest(dist))
    .on('end', cb)
    .pipe(reload({ stream: true }));
}

gulp.task('scripts', function(cb) {
  bundle(cb, true);
});

var reporter = 'spec';

gulp.task('build', [
  'clean',
  'fonts',
  'images',
  'html',
  'styles',
  'scripts'
  //'test'
]);

gulp.task('watch', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: dist,
      middleware: function(req, res, next) {
        api(req, res, next);
      }
    }
  });

  reporter = 'dot';
  bundler(true).on('update', function() {
    gulp.start('scripts');
    //gulp.start('test');
  });
  //gulp.watch('./test/!**!/!*.js', ['test']);
  gulp.watch([srcRoot+'/main.less', srcRoot+'/**/*.less'], ['styles']);
  gulp.watch([srcRoot+'/!*.html'], ['html']);
});

gulp.task('default', ['watch']);
