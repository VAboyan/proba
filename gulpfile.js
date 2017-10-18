"use strict";

const gulp = require('gulp'),
  prefix = require('gulp-autoprefixer'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  pug = require('gulp-pug');

gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  })
});

gulp.task('scss', function() {
  gulp.src(`src/main.scss`)
    .pipe(sass())
    .pipe(prefix({
      browsers: ['last 2 versions'],
    }))
    .pipe(gulp.dest('build/'))
    .pipe(connect.reload())
});

gulp.task('pug', function() {
gulp.src('src/index.pug')
  .pipe(pug({
    pretty: true,
  }))
  .pipe(gulp.dest('build/'))
  .pipe(connect.reload())
});

gulp.task('images', function() {
  gulp.src('static/images/*.+(png|jpg|gif|jpeg)')
    .pipe(gulp.dest('build/static/images'))
});

gulp.task('watch', function () {
  gulp.watch('src/main.scss', ['scss']);
  gulp.watch('src/index.pug', ['pug']);
  gulp.watch('build/static/images/*')
});

gulp.task('default', ['connect', 'pug', 'scss', 'images', 'watch']);