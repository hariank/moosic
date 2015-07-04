var gulp = require('gulp');
var browserify = require('gulp-browserify');

gulp.task('scripts', function() {
	gulp.src(['app/main.js'])
		.pipe(browserify({
			debug: true,
			transform: ['reactify']
		}))
		.pipe(gulp.dest('./public/js/'));
});

gulp.task('watch', function() {
    gulp.watch('app/*.jsx', ['scripts']);
});

gulp.task('default', ['scripts']);