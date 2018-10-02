const gulp = require('gulp');
const inlineCss = require('gulp-inline-css');
const sass = require('gulp-sass');

gulp.task('templates', function() {
    return gulp.src('./templates/src/*.html')
        .pipe(inlineCss())
        .pipe(gulp.dest('./templates/mailTemplates/'));
});

gulp.task('styles', () => {
    gulp.src('./templates/src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./templates/src/css'));
});

gulp.task('watch', () => {
    gulp.watch(['templates/src/scss/**/*.scss', 'templates/src/**/*.html']).on('change', function(){
        gulp.start(['styles', 'templates']);
    });
});

gulp.task("build", ["styles", "templates"]);
