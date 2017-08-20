let gulp = require('gulp');
let connect = require('gulp-connect');
let sourcemaps = require('gulp-sourcemaps');
let source = require('vinyl-source-stream');
let buffer = require('vinyl-buffer');
let browserify = require('browserify');
let babel = require('babelify');
let uglify = require('gulp-uglify');
let svgstore = require('gulp-svgstore');
let svgmin = require('gulp-svgmin');
let path = require('path');
let $ = require('gulp-load-plugins')();

// Resources
let resources = {
    scss: {
        extra: [
            'node_modules/foundation-sites/scss',
            'node_modules/wowjs/css/libs'
        ],
        main: 'resources/scss/main.scss'
    },
    js: {
        main: 'resources/js/main.js'
    },
    svg: 'resources/svg'
};

// Destinations
let destinations = {
    public: 'public',
    scss: {
        folder: 'public/css'
    },
    js: {
        file: 'main.min.js',
        folder: 'public/js'
    },
    svg: {
        folder: 'public/svg'
    }
};

// Task: server
gulp.task('connect', function() {
    return connect.server({
        root: destinations.public,
        livereload: true
    });
});

// Task: scss
gulp.task('scss', function() {
    return gulp.src(resources.scss.main)
        .pipe($.sass({
            includePaths: resources.scss.extra,
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
    let bundler = browserify(resources.js.main, {debug: true})
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

// Task: html
gulp.task('html', function() {
    gulp.src(destinations.public + '/*.html')
        .pipe(connect.reload());
});

// Task: svgstore
gulp.task('svgstore', function() {
    return gulp
        .src(resources.svg + '/*.svg')
        .pipe(svgmin(function(file) {
            let prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            };
        }))
        .pipe(svgstore())
        .pipe(gulp.dest(destinations.svg.folder));
});

// Task: watch
gulp.task('watch', function() {
    gulp.watch(destinations.public + '/*.html', ['html']);
    gulp.watch('resources/scss/**/*.scss', ['scss']);
    gulp.watch('resources/js/**/*.js', ['js']);
});

// Default
gulp.task('default', ['connect', 'watch']);
