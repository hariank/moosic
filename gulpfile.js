var gulp = require('gulp'),
	gulp_concat = require('gulp-concat'),
	gulp_uglify = require('gulp-uglify');

gulp.task('scripts', function() {
	gulp.src(['public/js/*.js'])
		.pipe(gulp_concat('bundle.js'))
		.pipe(gulp.dest('./public/build'))
		.pipe(gulp_uglify())
		.pipe(gulp.dest('./public/build'));
});

gulp.task('watch', function() {
    gulp.watch(['public/js/*.js'], ['scripts']);
});

gulp.task('default', ['scripts']);