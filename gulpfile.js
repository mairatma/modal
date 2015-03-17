'use strict';

var del = require('del');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var registerTasks = require('alloyui-tasks');
var runSequence = require('run-sequence');

registerTasks({
  bundleFileName: 'modal.js'
});

gulp.task('build', function(done) {
  runSequence('clean', ['css', 'build:globals', 'build:min'], done);
});

gulp.task('build:min', ['build:globals'], function() {
  return gulp.src('build/modal.js')
    .pipe(plugins.rename('modal-min.js'))
    .pipe(plugins.uglify())
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function(done) {
  del(['build'], done);
});

gulp.task('css', function() {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'));
});

gulp.task('lint', function() {
  return gulp.src(['src/**/*.js', 'test/**/*.js'])
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter(require('jshint-stylish')));
});
