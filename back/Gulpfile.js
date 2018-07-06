var gulp = require('gulp');

var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minify = require('gulp-minify');
var uglify = require('gulp-uglify');
var uglifyJS = require('gulp-uglify-es').default;

var jsFiles = ['./config/*.js', /**'./models/*.js'*/ , './*.js', './routes/*.js'];
var jsDest = './gulpfile/'

gulp.task('concatenate', function () {
    return gulp.src(['./config/*.js', './models/*.js', './*.js', './routes/*.js'])
        .pipe(minify())
        .pipe(concat('back.js'))
        .pipe(gulp.dest('./gulpfile/'));
});

gulp.task('uglifying', function () {
    return gulp.src('./gulpfile/back.js')
        .pipe(uglifyJS())
        .pipe(gulp.dest('./gulpfile/'))
})