var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var del =require('del')

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./vs-admin/"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
  gulp.src('src/images/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images/'));
});

gulp.task('styles', function(){
  gulp.src(['vs-admin/assets/social-analytics/styles/scss/**/*.scss'])
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(sass())
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('vs-admin/assets/social-analytics/styles/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('deleteJs', function() {
  return del.sync(['vs-admin/assets/social-analytics/backbone/main.js'])
})

gulp.task('scripts', ['deleteJs'], function(){
  return gulp.src('vs-admin/assets/social-analytics/backbone/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('vs-admin/assets/social-analytics/backbone/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['browser-sync'], function(){
  gulp.watch("vs-admin/assets/social-analytics/styles/scss/**/*.scss", ['styles']);
  gulp.watch("vs-admin/assets/social-analytics/backbone/**/*.js", ['scripts']);
  gulp.watch("*.html", ['bs-reload']);
});
