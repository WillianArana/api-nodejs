"use strict";
const gulp = require("gulp");
const minify = require("gulp-babel-minify");

var src = "./dist/bin/**/*.js";

var bin = "./dist/bin";

gulp.task("minify", function() {
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

gulp.task("watch", function() {
  gulp.watch([src], ["minify"]);
});
