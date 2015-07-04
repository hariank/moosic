var gulp = require('gulp');

var browserify = require('gulp-browserify');
var concat = require('gulp-concat');

gulp.tasks('scripts', function() {
	gulp.src(['app/main.js'])
		.pipe(browserify({
			debug: true,
			transform: ['reactify']
		}))
		.pipe(concat('build.js'))		
		.pipe(gulp.dest('./public/'));
});

gulp.task('watch', function() {
    gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['scripts']);