var gulp = require("gulp"),
  path = require("path"),
  browserify = require("browserify"),
  brfs = require("brfs"),
  ejsify = require("ejsify"),
  packageify = require("packageify"),
  source = require("vinyl-source-stream"),
  vbuffer = require("vinyl-buffer"),
  uglify = require("gulp-uglify");

var paths = {
  src: {
    javascript: path.join("javascript", "src")
  },
  dest: {
    javascript: path.join("javascript", "dest")
  }
};

var gulpfileSrc = "gulpfile.js"
var jsSrcFiles = path.join(paths.src.javascript, "*.js")
var jsAllFiles = [jsSrcFiles, gulpfileSrc]


gulp.task("build", function() {
  return browserify({
    entries: path.join("javascript", "src", "login.js"),
    transform: [
      brfs,
      ejsify,
      packageify
    ]
  }).bundle()
    .pipe(source("login.min.js"))
    .pipe(vbuffer())
    .pipe(uglify())
    .pipe(gulp.dest(paths.dest.javascript))
});

gulp.task("copy-confvars", function() {
  return gulp.src(path.join(paths.src.javascript, "config.js"))
    .pipe(gulp.dest(paths.dest.javascript));
});

gulp.task("default", ["build", "copy-confvars"]);
