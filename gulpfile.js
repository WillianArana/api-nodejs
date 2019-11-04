const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

// Dev Paths
var src = "./dist/bin/src/**/*.js";

// Dist Paths
var bin = "./dist/bin/src";

// Scripts Task
gulp.task("scripts", function() {
  return gulp
    .src(src)
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest(bin));
});

gulp.task("watch", function() {
  gulp.watch([src], ["scripts"]);
});
