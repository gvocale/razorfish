var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};

// var consolidate = require('gulp-consolidate');
// var rename = require('gulp-rename');
// var iconfont = require('gulp-iconfont');

// var fontName = 'iconfont'; // name of font


var iconfont = require('gulp-iconfont');
var runTimestamp = Math.round(Date.now() / 1000);

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

// gulp.task('generateIconfont', function(){
//   gulp.src(['src/icons/*.svg']) // the location of all the svg files to be created into the font
//     .pipe(iconfont({
//       normalize: true,
//       fontName: fontName,
//       appendCodepoints: true
//     }))
//     // automatically assign a unicode value to the icon
//     .on('codepoints', function(codepoints, options) {
//       codepoints.forEach(function(glyph, idx, arr) {
//         arr[idx].codepoint = glyph.codepoint.toString(16)
//       });
//       // -------------------------------
//       // START additional stuff to generate an scss file with all the font characters inside it
//       // -------------------------------
//       gulp.src('src/sass/_modules/_font-template.scss') // a template scss file, used to generate the scss code for all the icons
//       .pipe(consolidate('lodash', {
//         // see the font-template.scss file to see how the following 'fontName' and 'fontPath' values are used
//         glyphs: codepoints,
//         fontName: options.fontName,
//         fontPath: 'src/fonts/',
//         className: 'icon'
//       }))
//       .pipe(rename('_iconfont.scss')) // rename the scss file (otherwise it takes the same file name as "font-template.scss")
//       .pipe(gulp.dest('src/sass/_modules/')); // where to save "_iconfont.scss"
//       // -------------------------------
//       // END additional stuff to generate an scss file with all the font characters inside it
//       // -------------------------------
//     })
//     .pipe(gulp.dest('dist/fonts')); // where to save the generated font files
// });


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
