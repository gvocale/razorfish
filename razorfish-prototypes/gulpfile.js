// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var iconfont = require('gulp-iconfont');

var runTimestamp = Math.round(Date.now() / 1000);

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

// IconFont Task
gulp.task('iconfont', function() {
    return gulp.src(['src/icons/*.svg'])
        .pipe(iconfont({
            normalize: true,
            fontName: 'razorfish-icons', // required 
            prependUnicode: true, // recommended option 
            formats: ['ttf', 'eot', 'woff', 'svg'], // default, 'woff2' and 'svg' are available 
            timestamp: runTimestamp, // recommended to get consistent builds when watching files 
        }))
        .on('glyphs', function(glyphs, options) {
            // CSS templating, e.g. 
            console.log(glyphs, options);
        })
        .pipe(gulp.dest('dist/fonts/'));
});


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
    gulp.watch("src/icons/*.svg", ['iconfont']);
    gulp.watch("dist/*.html").on('change', browserSync.reload);
    gulp.watch("dist/js/*.js").on('change', browserSync.reload);
});



// Compile sass into CSS & auto-inject into browsers
gulp.task('icimsSass', function() {
    return gulp.src("src/sass/icims.scss")
        .pipe(sass({ outputStyle: 'compressed' })).on('error', sass.logError).pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

// Static Server + watching scss/html files
gulp.task('icimsTask', ['icimsSass'], function() {
    gulp.watch("src/sass/_modules/icims.scss", ['sass']);
});

gulp.task('default', ['serve']);

gulp.task('icims', ['icimsTask']);
