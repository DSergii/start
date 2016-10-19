var gulp = require('gulp'),
	wiredep = require('wiredep').stream,
	useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-minify-css'),
    webserver = require('gulp-webserver'),
    clean = require('gulp-clean');

// clean
gulp.task('clean', function () {
    return gulp.src('dist')
        .pipe(clean({force: true}));
});

//bower
gulp.task('bower', function () {
  gulp.src('./src/app/index.html')
    .pipe(wiredep({
      directory: "bower_components"
    }))
    .pipe(gulp.dest('./src/app'));
});

//build
gulp.task('html', function () {
    return gulp.src('./src/app/*.html')
        .pipe(useref())
        .pipe(gulpif('js/*.js', uglify()))
        .pipe(gulpif('css/*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});


//server
gulp.task('webserver', function() {
		gulp.src('dist/')
			.pipe(webserver({
			livereload: true,
			open: true
		}));
	});

gulp.task('build', [
	//'clean',
	'bower',
	'html',
	'webserver'
]);