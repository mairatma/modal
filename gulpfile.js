'use strict';

var del = require('del');
var GlobalsFormatter = require('es6-module-transpiler-globals-formatter');
var gulp = require('gulp');
var gutil = require('gulp-util');
var jspm = require('jspm');
var jspmCore = require('jspm/lib/core');
var plugins = require('gulp-load-plugins')();
var path = require('path');
var runSequence = require('run-sequence');
var renamer = require('gulp-es6-imports-renamer');
var transpile = require('gulp-es6-module-transpiler');

gulp.task('clean', function(done) {
  del(['build'], done);
});

gulp.task('copy', function() {
  return gulp.src('src/**/*.css')
    .pipe(gulp.dest('build'));
});

gulp.task('soy', function() {
  return gulp.src('src/*.soy')
    .pipe(plugins.soynode())
    .pipe(plugins.wrapper({
      footer: 'export default templates;'
    }))
    .pipe(plugins.ignore.exclude('*.soy'))
    .pipe(gulp.dest('src'));
});

gulp.task('build:globals', ['jspm'], function() {
  return gulp.src('src/*.js')
    .pipe(renamer({
      basePath: __dirname,
      configPath: path.join(__dirname, 'config.js')
    }))
    .pipe(transpile({
      basePath: __dirname,
      bundleFileName: 'modal.js',
      formatter: new GlobalsFormatter({
        globalName: 'aui'
      })
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build', function(done) {
  runSequence('clean', 'soy', 'copy', 'build:globals', done);
});

gulp.task('jspm', function(done) {
  jspm.promptDefaults(true);
  jspm.install(true, {
    lock: true
  }).then(function() {
    return jspmCore.checkDlLoader();
  }).then(function() {
    return jspmCore.setMode('local');
  }).then(function() {
    gutil.log(gutil.colors.cyan('Install complete'));
    done();
  }, function(err) {
    gutil.log(gutil.colors.red('err', err.stack || err))
    gutil.log(gutil.colors.red('Installation changes not saved.'));
    done();
  });
});

gulp.task('watch', ['build'], function(done) {
  gulp.watch('src/**/*.*', ['build']);
});