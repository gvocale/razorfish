var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');


// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("src/sass/**/*.scss")
        .pipe(sass()).on('error', sass.logError).pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('serve', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        },
        browser: "google chrome"
    });

    gulp.watch("src/sass/**/*.scss", ['sass']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
});

// Static Server + watching scss/html files
gulp.task('icimsTask', ['sass'], function() {

    browserSync.init({
        server: {
            baseDir: "dist",
            index: "index.html"
        },
        browser: "google chrome"
    });

    gulp.watch("src/sass/_modules/icims.scss", ['sass']);
    gulp.watch("dist/icims.html").on('change', browserSync.reload);
    gulp.watch("dist/js/icims.js").on('change', browserSync.reload);
});

gulp.task('default', ['serve']);

gulp.task('icims', ['icimsTask']);
