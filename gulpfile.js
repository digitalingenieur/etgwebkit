var gulp          = require('gulp');
var plumber       = require('gulp-plumber');
var sass          = require('gulp-sass');
var uglify        = require('gulp-uglify');
var imagemin      = require('gulp-imagemin');
var pngcrush      = require('imagemin-pngcrush');
var include       = require('gulp-include');
var autoprefixer  = require('gulp-autoprefixer');
var pixrem        = require('gulp-pixrem');
var notify        = require('gulp-notify');
var cleanCSS      = require('gulp-clean-css');
var sourcemaps    = require('gulp-sourcemaps');
var browserSync   = require("browser-sync").create();
var concat        = require('gulp-concat');

// browser sync proxy url: e.g. a vhost-based url,
// see also: https://www.browsersync.io/docs/options#option-proxy
var bsProxy       = "http://etgwebkit.dev";

var paths = {
    src: {
        styles:     'src/Resources/scss/etgwebkit.scss',
        scripts:    [
                    'node_modules/smoothscroll-polyfill/dist/smoothscroll.js',
                    'node_modules/object-fit-images/dist/ofi.browser.js',
                    'src/Resources/js/**/*.js'
                    ],
        //images:     'src/img/**/*',
        //fonts:      'src/fonts/**/*'
    },
    dist: { 
        styles:     'dist/TL_ROOT/files/etgwebkit/theme/css',
        scripts:    'dist/TL_ROOT/files/etgwebkit/theme/js',
        //images:     'dist/static/img',
        //fonts:      'dist/static/fonts'
    },
    watch: {
        styles:     'src/Resources/scss/**/*.scss',
        scripts:    'src/Resources/js/**/*.js',
        //images:     'src/img/**/*'
    }
};

// reading your sass files, add autoprefixer options, create sourcemaps, generate css file, inject css via browser-sync
gulp.task('styles', function() {
    gulp.src(paths.src.styles)
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
    			browsers: ['last 3 versions'],
    			cascade: false
    		}))
        .pipe(sourcemaps.write('../maps'))
        .pipe(gulp.dest(paths.dist.styles))
        .pipe(browserSync.stream({match: '**/*.css'}));
});

// nearly the same that ['styles'] does, but adding pixrem fallback and minify css via cleanCSS
gulp.task('minify_css', function() {
    gulp.src(paths.src.styles)
        .pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer({
    			browsers: ['last 3 versions'],
    			cascade: false
    		}))
        .pipe(cleanCSS())
        .pipe(pixrem({ rootValue: '16px' }))
        .pipe(gulp.dest(paths.dist.styles))
});

// read, combine and uglyify js
gulp.task('scripts', function() {
    gulp.src(paths.src.scripts)
    	.pipe(include())
        .pipe(uglify())
        .pipe(concat('etgwebkit.js'))
        .pipe(gulp.dest(paths.dist.scripts))
});

// read and optimize images
/*gulp.task('images', function () {
    return gulp.src(paths.src.images)
        .pipe(imagemin({
          progressive: true
        }))
        .pipe(gulp.dest(paths.dist.images));
});*/

// copy static files from src to dist
gulp.task('copy', function() {
   gulp.src(paths.src.fonts)
   .pipe(gulp.dest(paths.dist.fonts));
});

// watcher task
gulp.task('serve', ['styles'], function() {
    // https://www.browsersync.io/docs/gulp#gulp-sass-maps
    browserSync.init({
        proxy: bsProxy,
        open: false
    });

    gulp.watch(paths.watch.styles,  ['styles']);
    gulp.watch(paths.watch.scripts, ['scripts']).on('change', browserSync.reload);
});

gulp.task('default', ['serve']);
gulp.task('deploy', ['minify_css', 'scripts']);