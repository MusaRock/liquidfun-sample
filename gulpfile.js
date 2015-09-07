var gulp = require('gulp');
var babel = require('gulp-babel');
var browserify = require('gulp-browserify');
var ext_replace = require('gulp-ext-replace');
var runSequence = require('run-sequence');

gulp.task('babel', function() {
  return gulp.src('./*.es6.js')
    .pipe(babel())
    .pipe(ext_replace('js', '.es6.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify', function() {
  return gulp.src('./dist/*.js')
    .pipe(browserify({
      insertGlobals : true
    }))
    .pipe(gulp.dest('./dist/js'));
});

gulp.task('build', function() {
  runSequence('babel', 'browserify');
});
