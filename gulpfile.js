'use strict';

var gulp = require('gulp'),
  connect = require('gulp-connect'),
  stylus = require('gulp-stylus'),
  nib = require('nib'),
  jshint = require('gulp-jshint'),
  stylish = require('jshint-stylish');

gulp.task('server', function() {
  connect.server({
    root: 'app',
    hostname: 'localhost',
    port: 8000,
    livereload: true
  });
});

gulp.task('jshint', function() {
  gulp.src('./app/scripts/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('css', function() {
  gulp.src('./app/stylesheets/main.styl')
    .pipe(stylus({
      use: nib()
    }))
    .pipe(gulp.dest('./app/stylesheets'))
    .pipe(connect.reload());
});

gulp.task('html', function() {
  gulp.src('./app/**/*.html')
    .pipe(connect.reload());
});

gulp.task('watch', function() {
  gulp.watch(['./app/**/*.html'], ['html']);
  gulp.watch(['./app/stylesheets/**/*.styl'], ['css']);
  gulp.watch(['./app/**/*.js'], ['jshint']);
});

gulp.task('default', ['server', 'watch']);
