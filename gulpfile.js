var gulp = require('gulp');

var browserify = require("browserify");
var source = require("vinyl-source-stream");
var buffer = require("vinyl-buffer");

var sourcemaps = require('gulp-sourcemaps');

var uglify = require('gulp-uglify');
var rename = require('gulp-rename');



gulp.task('react', () => {
  return browserify({
    entries: './index.js',
    debug: true,
  })
  .transform('babelify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({
    loadMaps: true
  }))
  .pipe(gulp.dest('./dist/bundle'))
  .pipe(uglify())
  .pipe(rename('bundle.min.js'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/bundle'));
});
