var gulp = require('gulp');
var imagemin = require ('gulp-imagemin');
var sass = require('gulp-sass');
var htmlmin = require('gulp-minify-html');
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var browserSync = require('browser-sync').create();
var del = require('del');
var cache = require('gulp-cache');
var runSequence = require('run-sequence');
var rev = require('gulp-rev');
var revdel = require('gulp-rev-delete-original');
var collect = require('gulp-rev-collector');
// var replace = require('gulp-string-replace');
var combineMq = require('gulp-combine-mq');
var autoprefixer = require('gulp-autoprefixer');

// compress images
gulp.task('images', function() {
  gulp.src("src/img/**/*")
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
});

// compile sass
gulp.task('sass', function(){
  return gulp.src('src/scss/*.scss')
    .pipe(sass()) // Using gulp-sass
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(combineMq())
    .pipe(gulp.dest('src/css'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

// init browser sync
gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: 'src'
    }
  })
});

// clear cache
gulp.task('cache:clear', function (callback) {
  return cache.clearAll(callback)
});

// minify files and copy into one file
gulp.task('useref', function(){
  return gulp.src('src/*.php')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulpIf('*.php', htmlmin()))
    .pipe(gulp.dest('dist'))
});

// copy favicon folder to dist
gulp.task('favicon', function(){
  return gulp.src('src/favicon/*')
    .pipe(gulp.dest('dist/favicon'))
});
// copy files file to dist
gulp.task('copyfiles', function(){
  return gulp.src('src/robots.txt')
    .pipe(gulp.dest('dist'))
});

// create manifest.json with renamed files
gulp.task('rev:rename', function () {
  return gulp.src([
    // "dist/**/*.html",
    "dist/**/*.css",
    "dist/**/*.js",
    "dist/**/*.{jpg,png,jpeg,gif,svg}"])
    .pipe(rev())
    .pipe(revdel({
      exclude: /\.php/
    })) // delete not hashed files from dist without deleting index.html
    .pipe(gulp.dest('dist'))
    .pipe(rev.manifest({ path: 'manifest.json' }))
    .pipe(gulp.dest('dist'))
});

// rename files like manifest.json
gulp.task('rev:collect', function () {
    gulp.src(['dist/manifest.json','dist/**/*.{php,json,css,js}'])
    .pipe(collect())
    .pipe(gulp.dest('dist'))
});

// delete dist folder
gulp.task('clean:dist', function() {
  return del.sync('dist');
});

// watch tasks
gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('src/scss/**/*.scss', ['sass']);
  gulp.watch('src/*.php', browserSync.reload);
  gulp.watch('src/js/**/*.js', browserSync.reload);
});

// default task
gulp.task('default', function (callback) {
  runSequence(
    'clean:dist',
    'sass',
    ['useref', 'images', 'favicon', 'copyfiles'],
    'rev:rename',
    'rev:collect',
    callback
  )
});
