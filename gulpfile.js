'use strict';
const gulp = require('gulp');
const minify = require('gulp-babel-minify');

const src = './dist/bin/**/*.js';
const bin = './dist/bin';

gulp.task('minify', function() {
  return gulp
    .src(src)
    .pipe(
      minify({
        mangle: {
          keepFnName: false,
          keepClassName: false
        }
      })
    )
    .pipe(gulp.dest(bin));
});
