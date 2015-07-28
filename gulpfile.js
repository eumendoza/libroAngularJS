var gulp = require('gulp'),
connect = require('gulp-connect');

gulp.task('server', function() {
  connect.server({
    root: 'app',
    hostname: 'localhost',
    port: 8000,
    livereload: true
  });
});

var stylus = require('gulp-stylus'),
nib = require('nib');

gulp.task('css', function() {
gulp.src('./app/stylesheets/main.styl')
.pipe(stylus({ use: nib() }))
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
});

gulp.task('default', ['server', 'watch']);
