var jshint = require('gulp-jshint');
var ngmin = require('gulp-ngmin');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var gulp = require('gulp');

gulp.task('lint', function() {
  return gulp.src('./*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('gulp-jshint-html-reporter', {
    filename: __dirname + 'jshint-output.html',
    createMissingFolders: false
  }));
});

gulp.task('ngmin', function() {
  return gulp.src('angularapp.js')
  .pipe(jshint())
  .pipe(ngmin({dynamic:true}))
  .pipe(gulp.dest('dist'));
});

gulp.task('uglify', function() {
  return gulp.src('./*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('compile', function() {
  return gulp.src('angularapp.js')
  .pipe(jshint())
  .pipe(concat('minapp.js'))
  .pipe(ngAnnotate())
  .pipe(uglify())
  .pipe(gulp.dest('dist'))
});
