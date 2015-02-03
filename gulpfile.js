'use strict';

var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');

gulp.task('copy', function() {
  return gulp.src('src/**/*.*')
    .pipe(gulp.dest('dist'));
});

gulp.task('soy', function() {
  return gulp.src('src/*.soy')
    .pipe(plugins.soynode())
    .pipe(plugins.wrapper({
      footer: 'export default templates;'
    }))
    .pipe(plugins.ignore.exclude('*.soy'))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', function(done) {
  runSequence(['copy', 'soy'], done);
});

gulp.task('watch', ['build'], function(done) {
	gulp.watch('src/**/*.*', ['build']);
});