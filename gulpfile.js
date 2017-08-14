var gulp = require('gulp');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babel = require('babelify');
var uglify = require('gulp-uglify');
var $ = require('gulp-load-plugins')();

// Resources
var resources = {
    scss: {
        foundation: [
            'bower_components/normalize.scss/sass',
            'bower_components/foundation-sites/scss',
            'bower_components/motion-ui/src'
        ],
        main: 'resources/scss/main.scss'
    },
    js: {
        main: 'resources/js/main.js'
    },
    bower: [
        'bower_components/what-input/dist/what-input.js',
        'bower_components/foundation-sites/dist/js/foundation.js'
    ]
};

// Destinations
var destinations = {
    public: 'public',
    scss: {
        folder: 'public/css'
    },
    js: {
        file: 'main.min.js',
        folder: 'public/js'
    },
    bower: 'public/js/foundation'
};

// Task: server
gulp.task('connect', function() {
    return connect.server({
        root: destinations.public,
        livereload: true
    });
});

// Task: bower:move
gulp.task('bower:move', function() {
    return gulp.src(resources.bower)
        .pipe(gulp.dest(destinations.bower));
});

// Task: scss
gulp.task('scss', function() {
    return gulp.src(resources.scss.main)
        .pipe($.sass({
            includePaths: resources.scss.foundation,
            outputStyle: 'compressed'
        })
            .on('error', $.sass.logError))
        .pipe($.autoprefixer({
            browsers: ['last 2 versions', 'ie >= 9']
        }))
        .pipe(gulp.dest(destinations.scss.folder))
        .pipe(connect.reload());
});

// Task: js
gulp.task('js', function() {
    var bundler = browserify(resources.js.main, {debug: true})
        .transform(babel.configure({
            presets: ['es2015']
        }));

    bundler.bundle()
        .on('error', function(err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source(destinations.js.file))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(destinations.js.folder))
        .pipe(connect.reload());
});

gulp.task('html', function() {
    gulp.src(destinations.public + '/*.html')
        .pipe(connect.reload());
});

// Task: watch
gulp.task('watch', function() {
    gulp.watch(destinations.public + '/*.html', ['html']);
    gulp.watch('resources/scss/**/*.scss', ['scss']);
    gulp.watch('resources/js/**/*.js', ['js']);
});

// Default
gulp.task('default', ['connect', 'watch']);
