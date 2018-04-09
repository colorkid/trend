var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
const babel = require('gulp-babel');
var concat = require('gulp-concat');

 
gulp.task('scripts', function() {
  return gulp.src('./src/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
            presets: ['env']
        }))
    .pipe(gulp.dest('./'));
});

// Static server
gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false,
        files: ["./src/*.js"]
    });
});

gulp.task('watch', ['scripts', 'serve'], function() {
	gulp.watch(['./src/*.js'], ['scripts']);
});