'use strict';

var del = require('del');
var GlobalsFormatter = require('es6-module-transpiler-globals-formatter');
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var path = require('path');
var runSequence = require('run-sequence');
var renamer = require('gulp-es6-imports-renamer');
var transpile = require('gulp-es6-module-transpiler');

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

gulp.task('build-globals', ['build'], function() {
  return gulp.src('dist/*.js')
    .pipe(renamer({basePath: __dirname, configPath: path.join(__dirname, 'config.js')}))
    .pipe(transpile({
      basePath: __dirname,
      bundleFileName: 'modal_bundle.js',
      formatter: new GlobalsFormatter({globalName: 'alloyui'})
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', ['build'], function(done) {
	gulp.watch('src/**/*.*', ['build']);
});